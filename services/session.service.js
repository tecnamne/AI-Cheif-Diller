const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');
const databaseService = require('./database.service');

const BROKER_NAME = process.env.BROKER_NAME || 'default';
const DEMO_MODE = process.env.DEMO_MODE === 'true';

/**
 * Session Management Service
 * Supports Demo mode (in-memory) and production (MongoDB) modes.
 */
class SessionService {
    constructor() {
        this.sessionTimeout = parseInt(process.env.SESSION_TIMEOUT_MINUTES) || 30;
        this.maxHistoryMessages = parseInt(process.env.MAX_HISTORY_MESSAGES) || 10;
        this.initialized = false;

        this.demoSessions = new Map();
    }

    _now() {
        return new Date().toISOString();
    }

    async initialize() {
        if (this.initialized) return;

        if (DEMO_MODE) {
            this.initialized = true;
            logger.info(`SessionService initialized in DEMO mode for broker: ${BROKER_NAME}`);
            return;
        }

        try {
            await databaseService.initialize();
            this.initialized = true;
            logger.info(`SessionService initialized for broker: ${BROKER_NAME}`);
        } catch (error) {
            logger.error('Failed to initialize SessionService:', error);
            throw error;
        }
    }

    _cloneSession(session) {
        return {
            id: session.id,
            broker: session.broker,
            userId: session.userId,
            title: session.title,
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
            lastActivity: session.lastActivity,
            archived: session.archived,
            metadata: session.metadata || {},
            messages: Array.isArray(session.messages) ? [...session.messages] : [],
        };
    }

    async _touch(sessionId) {
        if (DEMO_MODE) {
            const session = this.demoSessions.get(sessionId);
            if (session) {
                session.lastActivity = this._now();
            }
            return;
        }
        await databaseService.updateLastActivity(sessionId);
    }

    async createSession(options = {}) {
        const {
            broker = BROKER_NAME,
            userId = 'anonymous',
            title = null,
            metadata = {},
        } = options;

        if (DEMO_MODE) {
            const sessionId = uuidv4();
            const now = this._now();
            const session = {
                id: sessionId,
                broker,
                userId,
                title: title || 'New chat',
                createdAt: now,
                updatedAt: now,
                lastActivity: now,
                archived: false,
                metadata: metadata && typeof metadata === 'object' ? metadata : {},
                messages: [],
            };

            this.demoSessions.set(sessionId, session);
            return sessionId;
        }

        const session = await databaseService.createSession(userId, title, broker);
        if (metadata && Object.keys(metadata).length > 0) {
            await databaseService.updateSession(session.id, { metadata });
        }

        logger.info('Session created', { sessionId: session.id, userId, broker });
        return session.id;
    }

    async getSession(sessionId) {
        if (DEMO_MODE) {
            const session = this.demoSessions.get(sessionId);
            if (!session) {
                return null;
            }

            const now = Date.now();
            const last = Date.parse(session.lastActivity);
            const inactiveMinutes = Number.isFinite(last) ? (now - last) / 1000 / 60 : 0;
            if (inactiveMinutes > this.sessionTimeout) {
                logger.debug('Session timeout exceeded', { sessionId, inactiveMinutes });
            }

            return this._cloneSession(session);
        }

        const session = await databaseService.getSession(sessionId);
        if (!session) return null;

        const now = new Date();
        const lastActivity = new Date(session.lastActivity);
        const inactiveMinutes = (now - lastActivity) / 1000 / 60;

        if (inactiveMinutes > this.sessionTimeout) {
            logger.debug('Session timeout exceeded', { sessionId, inactiveMinutes });
        }

        return session;
    }

    async getUserSessions(userId, options = {}) {
        if (DEMO_MODE) {
            const {
                includeArchived = false,
                limit = 50,
                offset = 0,
            } = options;

            const sessions = Array.from(this.demoSessions.values())
                .filter((session) => session.userId === userId)
                .filter((session) => includeArchived || !session.archived)
                .sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity))
                .slice(offset, offset + limit)
                .map((session) => {
                    return {
                        id: session.id,
                        broker: session.broker,
                        userId: session.userId,
                        title: session.title,
                        createdAt: session.createdAt,
                        updatedAt: session.updatedAt,
                        lastActivity: session.lastActivity,
                        archived: session.archived,
                    };
                });

            return sessions;
        }

        return await databaseService.getUserSessions(userId, options);
    }

    async updateSession(sessionId, updates) {
        if (DEMO_MODE) {
            const session = this.demoSessions.get(sessionId);
            if (!session) {
                return false;
            }

            if (updates.title !== undefined) session.title = updates.title;
            if (updates.isArchived !== undefined) session.archived = updates.isArchived;
            if (updates.metadata !== undefined && updates.metadata && typeof updates.metadata === 'object') {
                session.metadata = updates.metadata;
            }

            session.updatedAt = this._now();
            await this._touch(sessionId);
            return true;
        }

        return await databaseService.updateSession(sessionId, updates);
    }

    async updateActivity(sessionId) {
        await this._touch(sessionId);
    }

    async addMessage(sessionId, role, content, metadata = {}) {
        const session = await this.getSession(sessionId);
        if (!session) {
            throw new Error('Session not found');
        }

        if (DEMO_MODE) {
            const demoSession = this.demoSessions.get(sessionId);
            const message = {
                id: uuidv4(),
                sessionId,
                role,
                content,
                timestamp: this._now(),
                metadata: metadata || {},
            };

            demoSession.messages.push(message);
            if (role === 'user' && (demoSession.title === 'New chat' || !demoSession.title)) {
                demoSession.title = this.generateFallbackTitle(content);
            }

            await this._touch(sessionId);
            return message;
        }

        const message = await databaseService.addMessage(sessionId, role, content, metadata);
        if (role === 'user' && session.title === 'New chat') {
            // title generation happens inside db hook if needed
        }
        return message;
    }

    generateFallbackTitle(userMessage) {
        const cleaned = (userMessage || '').replace(/^\s+|\s+$/g, '');
        if (!cleaned) return 'New chat';
        if (cleaned.length <= 42) return cleaned;
        return `${cleaned.slice(0, 39)}...`;
    }

    async getHistory(sessionId) {
        const session = await this.getSession(sessionId);
        return session ? session.messages : [];
    }

    async getHistoryForGemini(sessionId) {
        if (DEMO_MODE) {
            const session = this.demoSessions.get(sessionId);
            if (!session) return [];

            return session.messages
                .filter((m) => m.role === 'user' || m.role === 'assistant')
                .slice(-this.maxHistoryMessages)
                .map((message) => ({
                    role: message.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: message.content }],
                }));
        }

        return await databaseService.getHistoryForGemini(sessionId, this.maxHistoryMessages);
    }

    async deleteSession(sessionId, permanent = false) {
        if (DEMO_MODE) {
            const exists = this.demoSessions.has(sessionId);
            if (!exists) return false;

            if (permanent) {
                this.demoSessions.delete(sessionId);
            } else {
                const session = this.demoSessions.get(sessionId);
                if (session) session.archived = true;
            }
            return true;
        }

        if (permanent) {
            const deleted = await databaseService.deleteSession(sessionId);
            if (deleted) {
                logger.info('Session permanently deleted', { sessionId });
            }
            return deleted;
        }

        const archived = await databaseService.updateSession(sessionId, { isArchived: true });
        if (archived) {
            logger.info('Session archived', { sessionId });
        }
        return archived;
    }

    async getStats(options = {}) {
        if (DEMO_MODE) {
            const sessions = Array.from(this.demoSessions.values());
            const userId = options?.userId;
            const filtered = userId ? sessions.filter((s) => s.userId === userId) : sessions;
            const totalSessions = filtered.length;
            const totalMessages = filtered.reduce((sum, session) => sum + (session.messages || []).length, 0);

            return {
                broker: BROKER_NAME,
                totalSessions,
                totalMessages,
                recentSessions: filtered.filter((session) => {
                    const last = Date.parse(session.lastActivity);
                    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
                    return Number.isFinite(last) && last >= oneDayAgo;
                }).length,
                averageMessagesPerSession: totalSessions > 0 ? Math.round((totalMessages / totalSessions) * 10) / 10 : 0,
            };
        }

        return await databaseService.getStats(options);
    }

    async exportConversations(options = {}) {
        const sessions = await this.getUserSessions(options.userId || null, { includeArchived: true, limit: 1000, offset: 0 });

        return sessions.map((session) => {
            const source = this.demoSessions.get(session.id);
            return {
                sessionId: session.id,
                broker: session.broker,
                title: session.title,
                createdAt: session.createdAt,
                updatedAt: session.updatedAt,
                userId: session.userId,
                messageCount: source ? (source.messages || []).length : 0,
                messages: source ? [...source.messages] : [],
            };
        });
    }

    async close() {
        if (!DEMO_MODE) {
            await databaseService.close();
        }
    }
}

module.exports = new SessionService();
