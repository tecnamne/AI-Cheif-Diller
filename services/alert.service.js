/**
 * Alert Service - Single Broker Instance
 * Manages alert delivery to chat sessions
 * 
 * Architecture: 1 instance = 1 broker (no multi-tenancy needed)
 * Broker is identified by BROKER_NAME from environment
 * 
 * Flow:
 * 1. Scheduler runs arbitrage scan at 09:00 and 21:00
 * 2. Scanner generates alerts
 * 3. Scheduler calls alertService.queueAlerts(alerts)
 * 4. Alerts are PERSISTED to file (survives server restart)
 * 5. Frontend polls /api/chat/alerts/:sessionId
 * 6. Alerts are marked as delivered per session
 */

const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');

// Broker identifier from environment
const BROKER_NAME = process.env.BROKER_NAME || 'default';
const DEMO_MODE = process.env.DEMO_MODE === 'true';

class AlertService {
    constructor() {
        this.pendingAlerts = [];
        this.deliveredAlerts = new Map(); // sessionId -> [alertIds]
        this.alertsFilePath = path.join(__dirname, '../../data/pending-alerts.json');
        
        // In public demo mode alerts are synthetic and memory-only.
        if (!DEMO_MODE) {
            this.loadAlerts();
        }
        
        // Cleanup old alerts every hour
        setInterval(() => this.cleanupOldAlerts(), 60 * 60 * 1000);
        
        // Save alerts to file every 5 minutes outside demo mode.
        if (!DEMO_MODE) {
            setInterval(() => this.saveAlerts(), 5 * 60 * 1000);
        }
        
        logger.info(`AlertService initialized for broker: ${BROKER_NAME}`);
    }

    /**
     * Load alerts from file (survives server restart)
     */
    loadAlerts() {
        try {
            const dataDir = path.dirname(this.alertsFilePath);
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }
            
            if (fs.existsSync(this.alertsFilePath)) {
                const data = JSON.parse(fs.readFileSync(this.alertsFilePath, 'utf8'));
                
                // Handle legacy multi-tenant format
                if (data.tenants) {
                    // Migrate from multi-tenant: take all alerts
                    for (const tenantData of Object.values(data.tenants)) {
                        if (tenantData.pendingAlerts) {
                            this.pendingAlerts.push(...tenantData.pendingAlerts);
                        }
                    }
                    logger.info(`AlertService: Migrated ${this.pendingAlerts.length} alerts from multi-tenant format`);
                } else if (data.pendingAlerts) {
                    // Simple format
                    this.pendingAlerts = data.pendingAlerts || [];
                    if (data.deliveredAlerts) {
                        this.deliveredAlerts = new Map(Object.entries(data.deliveredAlerts));
                    }
                }
                
                logger.info(`AlertService: Loaded ${this.pendingAlerts.length} pending alerts`);
            }
        } catch (error) {
            logger.error('AlertService: Failed to load alerts from file', { error: error.message });
        }
    }

    /**
     * Save alerts to file (persist across restarts)
     */
    saveAlerts() {
        if (DEMO_MODE) {
            return;
        }

        try {
            const dataDir = path.dirname(this.alertsFilePath);
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }
            
            const data = {
                version: 3, // Single-broker format
                broker: BROKER_NAME,
                pendingAlerts: this.pendingAlerts,
                deliveredAlerts: Object.fromEntries(this.deliveredAlerts),
                savedAt: new Date().toISOString()
            };
            
            fs.writeFileSync(this.alertsFilePath, JSON.stringify(data, null, 2));
            logger.debug(`AlertService: Saved ${this.pendingAlerts.length} alerts`);
        } catch (error) {
            logger.error('AlertService: Failed to save alerts to file', { error: error.message });
        }
    }

    /**
     * Queue alerts from scanner
     * @param {Array} alerts - Alerts to queue
     */
    queueAlerts(alerts) {
        for (const alert of alerts) {
            this.pendingAlerts.push({
                ...alert,
                broker: BROKER_NAME,
                queuedAt: new Date().toISOString()
            });
        }
        
        logger.info(`AlertService: ${alerts.length} alerts queued`);
        
        // Save immediately after queueing new alerts
        this.saveAlerts();
    }

    /**
     * Get ALL pending alerts (not filtered by session)
     * Used by Alerts view to show all alerts
     */
    getAllPendingAlerts() {
        return this.pendingAlerts;
    }

    /**
     * Get pending alert by id.
     */
    getPendingAlertById(alertId) {
        if (!alertId) {
            return null;
        }

        return this.pendingAlerts.find((alert) => String(alert.id) === String(alertId)) || null;
    }

    /**
     * Get pending alerts for a session
     * @param {string} sessionId - Session ID
     */
    getPendingAlertsForSession(sessionId) {
        const deliveredToSession = this.deliveredAlerts.get(sessionId) || [];
        
        // Return alerts not yet delivered to this session
        return this.pendingAlerts.filter(alert => 
            !deliveredToSession.includes(alert.id)
        );
    }

    /**
     * Check if there are any undelivered alerts (for UI badge)
     * If no sessionId provided, check if there are any alerts at all
     */
    hasUndeliveredAlerts(sessionId) {
        if (!sessionId) {
            return this.pendingAlerts.length > 0;
        }
        return this.getPendingAlertsForSession(sessionId).length > 0;
    }

    /**
     * Mark alerts as delivered to a session
     */
    markDelivered(sessionId, alertIds) {
        const delivered = this.deliveredAlerts.get(sessionId) || [];
        delivered.push(...alertIds);
        this.deliveredAlerts.set(sessionId, delivered);
        
        logger.info(`AlertService: ${alertIds.length} alerts marked as delivered`, { sessionId });
        
        // Save after marking delivered
        this.saveAlerts();
    }

    /**
     * Get formatted alert message for chat
     * Returns ChatAlertMessage format expected by frontend
     */
    formatAlertForChat(alert) {
        const timestamp = alert.timestamp || alert.createdAt || alert.queuedAt || new Date().toISOString();

        return {
            id: alert.id,
            type: alert.type || 'scanner_alert',
            message: alert.message,
            content: alert.data?.content || alert.message,
            timestamp,
            isRead: false,
            feedback: null,
            copied: false,
            metadata: {
                alertType: alert.type,
                broker: BROKER_NAME,
                severity: alert.data?.severity || 'medium',
                timestamp,
                data: alert.data
            }
        };
    }

    /**
     * Clean up old alerts (older than 48 hours)
     */
    cleanupOldAlerts() {
        const cutoff = Date.now() - (48 * 60 * 60 * 1000); // 48 hours
        const before = this.pendingAlerts.length;
        
        this.pendingAlerts = this.pendingAlerts.filter(alert => 
            new Date(alert.queuedAt).getTime() > cutoff
        );
        
        const removed = before - this.pendingAlerts.length;
        if (removed > 0) {
            logger.info(`AlertService: Cleaned up ${removed} old alerts`);
            this.saveAlerts();
        }
    }

    /**
     * Get statistics
     */
    getStats() {
        return {
            broker: BROKER_NAME,
            pendingAlertsCount: this.pendingAlerts.length,
            sessionsWithDeliveries: this.deliveredAlerts.size,
            oldestPendingAlert: this.pendingAlerts.length > 0 
                ? this.pendingAlerts[0].queuedAt 
                : null,
            newestPendingAlert: this.pendingAlerts.length > 0
                ? this.pendingAlerts[this.pendingAlerts.length - 1].queuedAt
                : null
        };
    }
}

// Export singleton
module.exports = new AlertService();
