/**
 * Database Service - MongoDB для персистентного хранения сессий и сообщений
 * 
 * Коллекции:
 * - chat_sessions: информация о сессиях (с broker для идентификации)
 * - chat_messages: история сообщений
 * 
 * Architecture: 1 instance = 1 broker (no multi-tenancy needed)
 */

const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

// Broker identifier from environment
const BROKER_NAME = process.env.BROKER_NAME || 'default';

class DatabaseService {
  constructor() {
    this.client = null;
    this.db = null;
    this.sessions = null;
    this.messages = null;
    this.mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    this.dbName = process.env.MONGODB_DATABASE || 'platform_chatbot';
    this.messageRetentionDays = parseInt(process.env.MESSAGE_RETENTION_DAYS || '0', 10);
    this.sessionRetentionDays = parseInt(process.env.SESSION_RETENTION_DAYS || '0', 10);
    this.backfillDateFieldsEnabled = process.env.BACKFILL_DATE_FIELDS === 'true';
  }

  /**
   * Инициализация подключения к MongoDB и создание индексов
   */
  async initialize() {
    try {
      logger.info(`Connecting to MongoDB: ${this.mongoUri}...`);
      
      this.client = new MongoClient(this.mongoUri, {
        serverSelectionTimeoutMS: 10000,  // 10 seconds timeout
        connectTimeoutMS: 10000,
        socketTimeoutMS: 10000,
      });
      
      await this.client.connect();
      
      this.db = this.client.db(this.dbName);
      this.sessions = this.db.collection('chat_sessions');
      this.messages = this.db.collection('chat_messages');
      
      await this.createIndexes();

      if (this.backfillDateFieldsEnabled) {
        await this.backfillDateFields();
      }
      
      logger.info(`MongoDB connected: ${this.mongoUri}/${this.dbName}`);
      return true;
    } catch (error) {
      logger.error('Failed to initialize MongoDB:', error.message);
      logger.error('Check that MongoDB is running and MONGODB_URI is correct');
      throw error;
    }
  }

  /**
   * Создание индексов для оптимизации запросов
   */
  async createIndexes() {
    // Sessions indexes with broker for identification
    await this.sessions.createIndex({ id: 1 }, { unique: true });
    await this.sessions.createIndex({ broker: 1, id: 1 });
    await this.sessions.createIndex({ broker: 1, userId: 1 });
    await this.sessions.createIndex({ broker: 1, lastActivity: -1 });
    await this.sessions.createIndex({ broker: 1, createdAt: -1 });
    // Legacy: keep tenantId indexes for migration
    await this.sessions.createIndex({ tenantId: 1, id: 1 });
    await this.sessions.createIndex({ tenantId: 1, userId: 1 });
    await this.sessions.createIndex({ tenantId: 1, lastActivity: -1 });
    await this.sessions.createIndex({ tenantId: 1, createdAt: -1 });
    
    // Messages indexes
    await this.messages.createIndex({ sessionId: 1 });
    await this.messages.createIndex({ timestamp: 1 });
    await this.messages.createIndex({ sessionId: 1, timestamp: 1 });

    // TTL indexes (optional)
    if (this.messageRetentionDays > 0) {
      const expireAfterSeconds = this.messageRetentionDays * 24 * 60 * 60;
      await this.messages.createIndex(
        { timestampDate: 1 },
        { expireAfterSeconds, name: 'ttl_messages_timestampDate' }
      );
      logger.info('TTL enabled for chat_messages', { messageRetentionDays: this.messageRetentionDays });
    }

    if (this.sessionRetentionDays > 0) {
      const expireAfterSeconds = this.sessionRetentionDays * 24 * 60 * 60;
      await this.sessions.createIndex(
        { lastActivityDate: 1 },
        { expireAfterSeconds, name: 'ttl_sessions_lastActivityDate' }
      );
      logger.info('TTL enabled for chat_sessions', { sessionRetentionDays: this.sessionRetentionDays });
    }

    logger.info('MongoDB indexes created/verified');
  }

  /**
   * Backfill Date fields for TTL (optional, controlled by BACKFILL_DATE_FIELDS)
   */
  async backfillDateFields() {
    try {
      logger.info('Backfilling date fields for TTL indexes...');

      await this.messages.updateMany(
        { timestampDate: { $exists: false }, timestamp: { $exists: true } },
        [{ $set: { timestampDate: { $toDate: '$timestamp' } } }]
      );

      await this.sessions.updateMany(
        { createdAtDate: { $exists: false }, createdAt: { $exists: true } },
        [{ $set: { createdAtDate: { $toDate: '$createdAt' } } }]
      );

      await this.sessions.updateMany(
        { lastActivityDate: { $exists: false }, lastActivity: { $exists: true } },
        [{ $set: { lastActivityDate: { $toDate: '$lastActivity' } } }]
      );

      await this.sessions.updateMany(
        { updatedAtDate: { $exists: false }, updatedAt: { $exists: true } },
        [{ $set: { updatedAtDate: { $toDate: '$updatedAt' } } }]
      );

      logger.info('Backfill completed for date fields');
    } catch (error) {
      logger.error('Failed to backfill date fields', { error: error.message });
    }
  }

  // ==================== SESSION OPERATIONS ====================

  async createSession(userId, title = null, broker = BROKER_NAME) {
    const sessionId = uuidv4();
    const nowDate = new Date();
    const now = nowDate.toISOString();
    
    const session = {
      id: sessionId,
      broker,
      userId,
      title: title || 'Новый чат',
      createdAt: now,
      createdAtDate: nowDate,
      updatedAt: now,
      updatedAtDate: nowDate,
      lastActivity: now,
      lastActivityDate: nowDate,
      isArchived: false,
      metadata: {}
    };
    
    await this.sessions.insertOne(session);
    
    logger.info(`Created new session: ${sessionId} for user: ${userId} broker: ${broker}`);
    
    return {
      ...session,
      messages: []
    };
  }

  async getSession(sessionId) {
    const session = await this.sessions.findOne({ id: sessionId });
    
    if (!session) {
      return null;
    }

    const messages = await this.getMessages(sessionId);
    
    return {
      id: session.id,
      broker: session.broker || session.tenantId, // fallback for legacy data
      userId: session.userId,
      title: session.title,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      lastActivity: session.lastActivity,
      archived: session.isArchived || false,  // Frontend expects "archived"
      metadata: session.metadata || {},
      messages
    };
  }

  async getUserSessions(userId, options = {}) {
    const {
      includeArchived = false,
      includeEmpty = false,  // By default, don't show empty sessions
      limit = 50,
      offset = 0,
      orderBy = 'lastActivity',
      order = 'DESC'
    } = options;

    const filter = { userId };
    
    if (!includeArchived) {
      filter.isArchived = false;
    }

    const sortDirection = order.toUpperCase() === 'DESC' ? -1 : 1;
    const sortField = orderBy === 'last_activity' ? 'lastActivity' : orderBy;

    let sessions = await this.sessions
      .find(filter)
      .sort({ [sortField]: sortDirection })
      .skip(offset)
      .limit(limit * 2)  // Fetch extra to account for filtered empty sessions
      .toArray();

    // Filter out empty sessions (sessions without any messages)
    if (!includeEmpty) {
      const sessionsWithMessages = await Promise.all(
        sessions.map(async (session) => {
          const messageCount = await this.messages.countDocuments({ sessionId: session.id });
          return messageCount > 0 ? session : null;
        })
      );
      sessions = sessionsWithMessages.filter(s => s !== null).slice(0, limit);
    } else {
      sessions = sessions.slice(0, limit);
    }

    return sessions.map(s => ({
      id: s.id,
      broker: s.broker || s.tenantId, // fallback for legacy data
      userId: s.userId,
      title: s.title,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
      lastActivity: s.lastActivity,
      archived: s.isArchived || false  // Frontend expects "archived"
    }));
  }

  async updateSession(sessionId, updates) {
    const updateFields = {};

    if (updates.title !== undefined) {
      updateFields.title = updates.title;
    }
    
    if (updates.isArchived !== undefined) {
      updateFields.isArchived = updates.isArchived;
    }
    
    if (updates.metadata !== undefined) {
      updateFields.metadata = updates.metadata;
    }

    if (Object.keys(updateFields).length === 0) {
      return false;
    }

    const nowDate = new Date();
    updateFields.updatedAt = nowDate.toISOString();
    updateFields.updatedAtDate = nowDate;

    const result = await this.sessions.updateOne(
      { id: sessionId },
      { $set: updateFields }
    );

    return result.modifiedCount > 0;
  }

  async updateLastActivity(sessionId) {
    const nowDate = new Date();
    await this.sessions.updateOne(
      { id: sessionId },
      { $set: { lastActivity: nowDate.toISOString(), lastActivityDate: nowDate } }
    );
  }

  async deleteSession(sessionId) {
    await this.messages.deleteMany({ sessionId });
    const result = await this.sessions.deleteOne({ id: sessionId });
    
    if (result.deletedCount > 0) {
      logger.info(`Deleted session: ${sessionId}`);
      return true;
    }
    return false;
  }

  // ==================== MESSAGE OPERATIONS ====================

  async addMessage(sessionId, role, content, metadata = {}) {
    const timestampDate = new Date();
    const timestamp = timestampDate.toISOString();
    
    const message = {
      sessionId,
      role,
      content,
      timestamp,
      timestampDate,
      metadata
    };
    
    const result = await this.messages.insertOne(message);
    
    await this.updateLastActivity(sessionId);
    
    if (role === 'user') {
      await this.autoGenerateTitle(sessionId, content);
    }
    
    return {
      id: result.insertedId.toString(),
      sessionId,
      role,
      content,
      timestamp,
      metadata
    };
  }

  async autoGenerateTitle(sessionId, content) {
    const session = await this.sessions.findOne({ id: sessionId }, { projection: { title: 1 } });
    
    if (session && session.title === 'Новый чат') {
      try {
        // Use Gemini to generate a smart title
        const geminiService = require('./gemini.service');
        const title = await geminiService.generateChatTitle(content);
        await this.updateSession(sessionId, { title });
        logger.info('Auto-generated chat title', { sessionId, title });
      } catch (error) {
        // Fallback to simple truncation if AI fails
        logger.warn('Failed to generate AI title, using fallback', { error: error.message });
        const title = content.length > 50 ? content.substring(0, 47) + '...' : content;
        await this.updateSession(sessionId, { title });
      }
    }
  }

  async getMessages(sessionId, options = {}) {
    const { limit = 100, offset = 0 } = options;
    
    const messages = await this.messages
      .find({ sessionId })
      .sort({ timestamp: 1 })
      .skip(offset)
      .limit(limit)
      .toArray();
    
    return messages.map(m => ({
      id: m._id.toString(),
      sessionId: m.sessionId,
      role: m.role,
      content: m.content,
      timestamp: m.timestamp,
      metadata: m.metadata || {}
    }));
  }

  async getHistoryForGemini(sessionId, maxMessages = 10) {
    const messages = await this.messages
      .find({ 
        sessionId, 
        role: { $in: ['user', 'assistant'] } 
      })
      .sort({ timestamp: -1 })
      .limit(maxMessages)
      .toArray();
    
    return messages.reverse().map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
  }

  // ==================== ANALYTICS & STATS ====================

  async getStats(options = {}) {
    const { userId = null } = options;
    
    const sessionsFilter = {};
    if (userId) sessionsFilter.userId = userId;
    
    const totalSessions = await this.sessions.countDocuments(sessionsFilter);
    
    let totalMessages;
    const sessionQuery = { ...sessionsFilter };
    const sessionIds = await this.sessions.distinct('id', sessionQuery);
    totalMessages = sessionIds.length > 0 
      ? await this.messages.countDocuments({ sessionId: { $in: sessionIds } })
      : 0;
    
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const recentFilter = { ...sessionsFilter, createdAt: { $gt: oneDayAgo } };
    const recentSessions = await this.sessions.countDocuments(recentFilter);

    return {
      broker: BROKER_NAME,
      totalSessions,
      totalMessages,
      recentSessions,
      averageMessagesPerSession: totalSessions > 0 
        ? Math.round(totalMessages / totalSessions * 10) / 10 
        : 0
    };
  }

  async exportConversations(options = {}) {
    const { startDate, endDate, userId } = options;
    
    const sessionFilter = {};
    if (userId) sessionFilter.userId = userId;
    
    const messageFilter = {};
    if (startDate) {
      messageFilter.timestamp = { $gte: startDate };
    }
    if (endDate) {
      messageFilter.timestamp = { ...messageFilter.timestamp, $lte: endDate };
    }
    
    const sessions = await this.sessions.find(sessionFilter).toArray();
    
    const conversations = [];
    
    for (const session of sessions) {
      const msgFilter = { sessionId: session.id, ...messageFilter };
      const messages = await this.messages
        .find(msgFilter)
        .sort({ timestamp: 1 })
        .toArray();
      
      if (messages.length > 0 || !startDate && !endDate) {
        conversations.push({
          sessionId: session.id,
          userId: session.userId,
          title: session.title,
          createdAt: session.createdAt,
          messages: messages.map(m => ({
            role: m.role,
            content: m.content,
            timestamp: m.timestamp
          }))
        });
      }
    }
    
    return conversations;
  }

  async close() {
    if (this.client) {
      await this.client.close();
      logger.info('MongoDB connection closed');
    }
  }
}

const databaseService = new DatabaseService();
module.exports = databaseService;
