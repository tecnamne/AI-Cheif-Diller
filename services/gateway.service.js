/**
 * Gateway Service - Direct WebSocket connection to Backend Master
 * No authentication required - connects directly to backend master like BFF does
 * 
 * Based on: apps/server/gateway/index.js and apps/server/network/network.ts
 */

const WebSocket = require('ws');
const { v4: uuid } = require('uuid');
const logger = require('../utils/logger');

// Default timeout for requests
const REQUEST_TIMEOUT = 60000; // 60 seconds
const RECONNECT_TIMEOUT = 10000; // 10 seconds
const HEARTBEAT_INTERVAL = 25000; // 25 seconds
const HEARTBEAT_TIMEOUT = 20000; // 20 seconds

class GatewayService {
    constructor() {
        // Backend Master URI from config
        this.masterUri = process.env.BACKEND_MASTER_URI || 'ws://localhost:11700';
        
        this.socket = null;
        this.clientId = null;
        this.status = 'disconnected';
        this.initialized = false;
        
        // Pending requests waiting for response
        this.pendingRequests = new Map();
        
        // Subscriptions
        this.subscriptions = new Map();
        
        // Heartbeat
        this.heartbeatTimer = null;
        this.heartbeatTimeout = null;
        
        // Reconnect
        this.reconnectTimer = null;
        this.shouldReconnect = true;
    }

    /**
     * Initialize connection to Backend Master
     */
    async initialize() {
        if (this.initialized && this.status === 'connected') {
            return;
        }
        
        return this.connect();
    }

    /**
     * Connect to Backend Master via WebSocket
     */
    connect() {
        return new Promise((resolve, reject) => {
            this.cleanup();
            let settled = false;
            
            logger.info('Connecting to Backend Master...', { uri: this.masterUri });
            
            try {
                this.socket = new WebSocket(this.masterUri);
            } catch (error) {
                logger.error('Failed to create WebSocket', { error: error.message });
                reject(error);
                return;
            }
            
            const connectionTimeout = setTimeout(() => {
                logger.error('Connection timeout');
                if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
                    this.socket.terminate();
                }
                if (!settled) {
                    settled = true;
                    reject(new Error('Connection timeout'));
                }
            }, 30000);
            
            this.socket.on('open', async () => {
                clearTimeout(connectionTimeout);
                logger.info('WebSocket connected to Backend Master');
                this.status = 'connected';
                
                // Start heartbeat
                this.startHeartbeat();
                
                // Get ClientId
                try {
                    const response = await this.request({ RequestName: 'RequestConnect' });
                    this.clientId = response.Result?.ClientId;
                    logger.info('Got ClientId from Backend Master', { clientId: this.clientId });
                    this.initialized = true;
                    if (!settled) {
                        settled = true;
                        resolve();
                    }
                } catch (error) {
                    logger.error('Failed to get ClientId', { error: error.message });
                    if (!settled) {
                        settled = true;
                        reject(error);
                    }
                }
            });
            
            this.socket.on('message', (data) => {
                this.handleMessage(data);
            });
            
            this.socket.on('close', (code, reason) => {
                clearTimeout(connectionTimeout);
                logger.warn('WebSocket closed', { code, reason: reason?.toString() });
                this.status = 'disconnected';
                this.clientId = null;
                this.stopHeartbeat();

                if (!settled) {
                    settled = true;
                    reject(new Error(`Connection closed: ${code}`));
                }
                
                // Reject all pending requests
                this.rejectAllPending('Connection closed');
                
                // Reconnect
                if (this.shouldReconnect) {
                    this.scheduleReconnect();
                }
            });
            
            this.socket.on('error', (error) => {
                clearTimeout(connectionTimeout);
                logger.error('WebSocket error', { error: error.message });

                if (!settled && this.status !== 'connected') {
                    settled = true;
                    reject(error);
                }
            });
            
            this.socket.on('pong', () => {
                clearTimeout(this.heartbeatTimeout);
                logger.debug('Heartbeat pong received');
            });
        });
    }

    /**
     * Handle incoming WebSocket message
     */
    handleMessage(data) {
        try {
            const message = JSON.parse(data.toString());
            
            // Check if it's a response to a request
            if (message.RequestId && this.pendingRequests.has(message.RequestId)) {
                const { resolve, reject, timer } = this.pendingRequests.get(message.RequestId);
                clearTimeout(timer);
                this.pendingRequests.delete(message.RequestId);
                
                if (message.ResponseMaster === 'ResponseError' || message.Errors?.length > 0) {
                    reject(new Error(message.Errors?.join(', ') || 'Request failed'));
                } else if (message.ResponseMaster === 'ResponseUnauthorized') {
                    reject(new Error('Unauthorized'));
                } else if (message.ResponseMaster === 'ResponseTimeout') {
                    reject(new Error('Backend timeout'));
                } else {
                    resolve(message);
                }
                return;
            }
            
            // Check if it's a subscription update
            if (message.SubscribeId && this.subscriptions.has(message.SubscribeId)) {
                const callback = this.subscriptions.get(message.SubscribeId);
                callback(message);
                return;
            }
            
            // Check if it's a channel event
            if (message.Channel) {
                logger.debug('Channel event received', { channel: message.Channel });
                // Can emit events here if needed
                return;
            }
            
            logger.debug('Unhandled message', { message });
        } catch (error) {
            logger.error('Failed to parse message', { error: error.message, data: data.toString().slice(0, 200) });
        }
    }

    /**
     * Send request to Backend Master
     */
    async request(requestData) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            // Try to reconnect
            await this.connect();
        }
        
        const requestId = requestData.RequestId || uuid();
        const request = {
            ...requestData,
            RequestId: requestId,
        };
        
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                this.pendingRequests.delete(requestId);
                reject(new Error(`Request timeout: ${request.RequestName}`));
            }, REQUEST_TIMEOUT);
            
            this.pendingRequests.set(requestId, { resolve, reject, timer });
            
            const json = JSON.stringify(request);
            logger.debug('Sending request', { requestName: request.RequestName, requestId });
            
            try {
                this.socket.send(json);
            } catch (error) {
                clearTimeout(timer);
                this.pendingRequests.delete(requestId);
                reject(error);
            }
        });
    }

    /**
     * Subscribe to updates
     */
    async subscribe(requestData, callback) {
        const response = await this.request({
            RequestName: 'RequestSubscribe',
            Request: requestData,
            ClientId: this.clientId,
        });
        
        const subscribeId = response.Result?.SubscribeId;
        if (subscribeId) {
            this.subscriptions.set(subscribeId, callback);
            logger.info('Subscribed', { subscribeId, requestName: requestData.RequestName });
        }
        
        return {
            subscribeId,
            initialResponse: response,
            unsubscribe: () => this.unsubscribe(subscribeId),
        };
    }

    /**
     * Unsubscribe
     */
    async unsubscribe(subscribeId) {
        if (!subscribeId) return;
        
        this.subscriptions.delete(subscribeId);
        
        try {
            await this.request({
                RequestName: 'RequestUnsubscribe',
                ClientId: this.clientId,
                SubscribeId: subscribeId,
            });
            logger.info('Unsubscribed', { subscribeId });
        } catch (error) {
            logger.warn('Failed to unsubscribe', { subscribeId, error: error.message });
        }
    }

    /**
     * Start heartbeat ping
     */
    startHeartbeat() {
        this.stopHeartbeat();
        
        this.heartbeatTimer = setInterval(() => {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                logger.debug('Sending heartbeat ping');
                this.socket.ping();
                
                this.heartbeatTimeout = setTimeout(() => {
                    logger.error('Heartbeat timeout - closing connection');
                    this.socket.close(1012, 'Heartbeat timeout');
                }, HEARTBEAT_TIMEOUT);
            }
        }, HEARTBEAT_INTERVAL);
    }

    /**
     * Stop heartbeat
     */
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
        if (this.heartbeatTimeout) {
            clearTimeout(this.heartbeatTimeout);
            this.heartbeatTimeout = null;
        }
    }

    /**
     * Schedule reconnect
     */
    scheduleReconnect() {
        if (this.reconnectTimer) return;
        
        logger.info('Scheduling reconnect...', { timeout: RECONNECT_TIMEOUT });
        
        this.reconnectTimer = setTimeout(async () => {
            this.reconnectTimer = null;
            try {
                await this.connect();
            } catch (error) {
                logger.error('Reconnect failed', { error: error.message });
                this.scheduleReconnect();
            }
        }, RECONNECT_TIMEOUT);
    }

    /**
     * Reject all pending requests
     */
    rejectAllPending(reason) {
        for (const [requestId, { reject, timer }] of this.pendingRequests) {
            clearTimeout(timer);
            reject(new Error(reason));
        }
        this.pendingRequests.clear();
    }

    /**
     * Cleanup resources
     */
    cleanup() {
        this.stopHeartbeat();
        
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        
        if (this.socket) {
            const socket = this.socket;

            // Prevent process crash on late socket errors during teardown.
            socket.on('error', (error) => {
                logger.warn('Ignoring socket error during cleanup', { error: error.message });
            });

            socket.removeAllListeners('open');
            socket.removeAllListeners('message');
            socket.removeAllListeners('close');
            socket.removeAllListeners('pong');

            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                socket.terminate();
            }

            this.socket = null;
        }
        
        this.rejectAllPending('Cleanup');
        this.subscriptions.clear();
    }

    /**
     * Get connection status
     */
    getStatus() {
        return {
            status: this.status,
            clientId: this.clientId,
            masterUri: this.masterUri,
            pendingRequests: this.pendingRequests.size,
            subscriptions: this.subscriptions.size,
        };
    }

    /**
     * Check if connected
     */
    isConnected() {
        return this.status === 'connected' && this.socket?.readyState === WebSocket.OPEN;
    }

    /**
     * Disconnect and prevent reconnect
     */
    disconnect() {
        this.shouldReconnect = false;
        this.cleanup();
        this.status = 'disconnected';
        this.initialized = false;
        logger.info('Disconnected from Backend Master');
    }
}

module.exports = new GatewayService();
