const express = require('express');
const router = express.Router();
const sessionService = require('../services/session.service');
const geminiService = require('../services/gemini.service');
const arbitrageScannerService = require('../services/arbitrage-scanner.service');
const alertService = require('../services/alert.service');
const scannerAlertExportService = require('../services/scanner-alert-export.service');
const internalAiWarnTagService = require('../services/internal-ai-warn-tag.service');
const logger = require('../utils/logger');
const { chatRateLimiter, sessionRateLimiter } = require('../middleware/rate-limit.middleware');
const {
    validateChatMessage,
    validateSessionCreation,
    handleValidationErrors,
    sanitizeInput,
    contentModerationMiddleware,
} = require('../middleware/validation.middleware');
const freshchatJwt = require('../middleware/freshchat-jwt.middleware');

// Broker name from environment (single-broker architecture)
const BROKER_NAME = process.env.BROKER_NAME || 'default';

/**
 * Detect if response should include action buttons
 * DISABLED - buttons removed per user request
 */
function detectActionButtons(response, userMessage) {
    // Buttons disabled
    return [];
}

/**
 * Extract user-visible text from account-context payload.
 * Payload format starts with [ACCOUNT ALERT CONTEXT] and ends with `User question: ...`.
 */
function extractVisibleUserMessage(message) {
    if (typeof message !== 'string') {
        return '';
    }

    const trimmed = message.trim();
    if (!trimmed.startsWith('[ACCOUNT ALERT CONTEXT]')) {
        return trimmed;
    }

    const marker = 'User question:';
    const markerIndex = trimmed.lastIndexOf(marker);
    if (markerIndex === -1) {
        return trimmed;
    }

    const question = trimmed.slice(markerIndex + marker.length).trim();
    return question || trimmed;
}

function parseAccountLogin(rawLogin) {
    const login = Number(rawLogin);
    if (!Number.isSafeInteger(login) || login <= 0) {
        return null;
    }
    return login;
}

/**
 * POST /api/chat/session
 * Create a new chat session
 */
router.post(
    '/session',
    sessionRateLimiter,
    freshchatJwt.requireAuth,  // Require valid JWT token
    validateSessionCreation,
    handleValidationErrors,
    async (req, res) => {
        try {
            const { metadata, title } = req.body;
            
            // Get userId from JWT token (priority) or from body (fallback)
            const userId = freshchatJwt.getUserId(req) || 'anonymous';
            
            const sessionId = await sessionService.createSession({
                broker: BROKER_NAME,
                userId: userId,
                title: title || null,
                metadata: metadata || {},
            });

            logger.info('New session created', { sessionId, userId, broker: BROKER_NAME, ip: req.ip });

            res.status(201).json({
                sessionId,
                broker: BROKER_NAME,
                message: 'Session created successfully',
            });
        } catch (error) {
            logger.logError(error, { context: 'Create session', ip: req.ip });
            res.status(500).json({
                error: 'Failed to create session',
            });
        }
    }
);

/**
 * POST /api/chat/message
 * Send a message and get AI response
 */
router.post(
    '/message',
    (req, res, next) => {
        console.log('>>> /message endpoint hit');
        console.log('>>> Headers:', JSON.stringify(req.headers));
        console.log('>>> Body:', JSON.stringify(req.body));
        next();
    },
    chatRateLimiter,
    freshchatJwt.requireAuth,  // Require valid JWT token
    validateChatMessage,
    handleValidationErrors,
    sanitizeInput,
    contentModerationMiddleware,
    async (req, res) => {
        console.log('>>> Passed all middleware, processing message...');
        try {
            const { message, sessionId, screenContext } = req.body;
            const visibleUserMessage = extractVisibleUserMessage(message);

            // Create session if not provided
            let actualSessionId = sessionId;
            if (!actualSessionId) {
                actualSessionId = await sessionService.createSession({ broker: BROKER_NAME });
            }

            // Validate session exists
            const session = await sessionService.getSession(actualSessionId);
            if (!session) {
                return res.status(404).json({
                    error: 'Session not found or expired. Please create a new session.',
                });
            }

            // Enhance message with screen context if provided
            let enhancedMessage = message;
            if (screenContext && screenContext.accountId) {
                enhancedMessage = `
[📊 SCREEN CONTEXT - Account ${screenContext.accountId}]:
${screenContext.balance ? `- Balance: $${screenContext.balance.toLocaleString()}` : ''}
${screenContext.equity ? `- Equity: $${screenContext.equity.toLocaleString()}` : ''}
${screenContext.unrealizedPnL !== undefined ? `- Unrealized P&L: $${screenContext.unrealizedPnL.toLocaleString()}` : ''}
${screenContext.margin ? `- Margin: $${screenContext.margin.toLocaleString()}` : ''}
${screenContext.freeMargin ? `- Free Margin: $${screenContext.freeMargin.toLocaleString()}` : ''}
${screenContext.marginLevel ? `- Margin Level: ${screenContext.marginLevel}%` : ''}
${screenContext.group ? `- Group: ${screenContext.group}` : ''}
${screenContext.leverage ? `- Leverage: 1:${screenContext.leverage}` : ''}
${screenContext.currency ? `- Currency: ${screenContext.currency}` : ''}
${screenContext.openPositions !== undefined ? `- Open Positions: ${screenContext.openPositions}` : ''}
${screenContext.sessionPnL !== undefined ? `- Session P&L: $${screenContext.sessionPnL.toLocaleString()}` : ''}

🔍 User question about this account: ${message}
`;
                logger.info('Screen context provided', {
                    sessionId: actualSessionId,
                    accountId: screenContext.accountId,
                    hasBalance: !!screenContext.balance,
                });
            }

            // Add user message to history
            await sessionService.addMessage(actualSessionId, 'user', visibleUserMessage);

            logger.info('Processing message', {
                sessionId: actualSessionId,
                broker: BROKER_NAME,
                messageLength: visibleUserMessage.length,
                hasScreenContext: !!screenContext,
                ip: req.ip,
            });

            // Get conversation history
            const history = await sessionService.getHistory(actualSessionId);

            // Generate AI response with enhanced message
            const requestUserId = freshchatJwt.getUserId(req) || 'anonymous';
            const aiResponse = await geminiService.generateResponse(enhancedMessage, history, {
                tenantId: BROKER_NAME,
                broker: BROKER_NAME,
                requestId: actualSessionId,
                userId: requestUserId,
            });

            // Add AI response to history
            await sessionService.addMessage(actualSessionId, 'assistant', aiResponse);

            // Check if response needs action buttons
            const buttons = detectActionButtons(aiResponse, visibleUserMessage);

            // NOTE: Alerts are NOT included in message response anymore
            // They should only be shown in the dedicated Alerts tab via /alerts/all endpoint

            res.json({
                sessionId: actualSessionId,
                response: aiResponse,
                buttons: buttons,
                alerts: [],  // Always empty - alerts only shown in Alerts tab
                timestamp: new Date().toISOString(),
            });

        } catch (error) {
            console.error('[MESSAGE ERROR]', error.message, error.stack);
            logger.logError(error, {
                context: 'Process message',
                ip: req.ip,
                sessionId: req.body.sessionId,
            });

            if (error.message === 'AI service configuration error' || error.code === 'AI_CONFIG_ERROR') {
                return res.status(503).json({
                    error: 'AI service is not properly configured',
                });
            } else if (error.message === 'AI service temporarily unavailable' || error.code === 'AI_TEMP_UNAVAILABLE') {
                const retryAfterMs = Number.isFinite(error.retryAfterMs) ? error.retryAfterMs : 0;
                const retryAfterSeconds = retryAfterMs > 0 ? Math.max(1, Math.ceil(retryAfterMs / 1000)) : null;

                logger.warn('AI temporarily unavailable during message processing', {
                    broker: BROKER_NAME,
                    sessionId: req.body.sessionId,
                    retryAfterMs,
                    retryAfterSeconds,
                    causeStatus: error.causeStatus || null,
                });

                if (retryAfterSeconds) {
                    res.set('Retry-After', String(retryAfterSeconds));
                }

                return res.status(503).json({
                    error: 'AI service is temporarily unavailable. Please try again later.',
                    retryAfterSeconds: retryAfterSeconds || undefined,
                });
            }

            res.status(500).json({
                error: 'Failed to process message',
                detail: process.env.NODE_ENV !== 'production' ? error.message : undefined,
            });
        }
    }
);

/**
 * GET /api/chat/alerts/count
 * Quick check for alert count (global, no session required)
 * Used by FAB badge to show unread alerts count
 */
router.get('/alerts/count', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const count = alertService.getAllPendingAlerts().length;
        
        res.json({
            hasAlerts: count > 0,
            alertCount: count,
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        logger.logError(error, { context: 'Get alerts count' });
        res.status(500).json({
            error: 'Failed to get alerts count',
        });
    }
});

/**
 * GET /api/chat/ai-warn-tags/:login
 * Check whether internal AI warn tag is assigned for account login.
 */
router.get('/ai-warn-tags/:login', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const login = parseAccountLogin(req.params.login);
        if (login === null) {
            return res.status(400).json({ error: 'Invalid login' });
        }

        const assigned = await internalAiWarnTagService.isAssigned(login);
        return res.json({ login, assigned });
    } catch (error) {
        logger.logError(error, { context: 'Get internal AI warn tag', login: req.params.login });
        return res.status(500).json({ error: 'Failed to get internal AI warn tag state' });
    }
});

/**
 * POST /api/chat/ai-warn-tags/:login/assign
 * Manual force-assign internal AI warn tag for account login (for tests/ops).
 */
router.post('/ai-warn-tags/:login/assign', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const login = parseAccountLogin(req.params.login);
        if (login === null) {
            return res.status(400).json({ error: 'Invalid login' });
        }

        const result = await internalAiWarnTagService.markAssigned(login, {
            source: 'manual',
            reason: 'api_force_assign',
            detectedAt: new Date(),
        });

        return res.json(result);
    } catch (error) {
        logger.logError(error, { context: 'Assign internal AI warn tag', login: req.params.login });
        return res.status(500).json({ error: 'Failed to assign internal AI warn tag' });
    }
});

/**
 * DELETE /api/chat/ai-warn-tags/:login
 * Manual unlink internal AI warn tag for account login.
 */
router.delete('/ai-warn-tags/:login', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const login = parseAccountLogin(req.params.login);
        if (login === null) {
            return res.status(400).json({ error: 'Invalid login' });
        }

        const result = await internalAiWarnTagService.unassign(login, {
            source: 'manual',
            reason: 'api_unassign',
        });

        return res.json(result);
    } catch (error) {
        logger.logError(error, { context: 'Unassign internal AI warn tag', login: req.params.login });
        return res.status(500).json({ error: 'Failed to unassign internal AI warn tag' });
    }
});

/**
 * GET /api/chat/alerts/all
 * Get ALL pending scanner alerts (global, not session-specific)
 * Used by Alerts view to show all alerts regardless of session
 */
router.get('/alerts/all', freshchatJwt.requireAuth, async (req, res) => {
    try {
        // Get all pending alerts (not filtered by session)
        const allAlerts = alertService.getAllPendingAlerts();
        
        // Format alerts for chat
        const alertMessages = allAlerts.map(alert => alertService.formatAlertForChat(alert));
        
        logger.info('Get all alerts', { alertCount: allAlerts.length });
        
        res.json({
            hasAlerts: allAlerts.length > 0,
            alerts: alertMessages,
            totalCount: allAlerts.length,
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        logger.logError(error, { context: 'Get all alerts' });
        res.status(500).json({
            error: 'Failed to retrieve alerts',
        });
    }
});

/**
 * GET /api/chat/alerts/export/:alertId
 * Export one general scanner alert to xlsx.
 */
router.get('/alerts/export/:alertId', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const { alertId } = req.params;
        const alert = alertService.getPendingAlertById(alertId);

        if (!alert) {
            return res.status(404).json({ error: 'Alert not found' });
        }

        if (!scannerAlertExportService.isGeneralScannerAlert(alert)) {
            return res.status(400).json({
                error: 'Export is available only for general scanner alerts in Alerts channel',
            });
        }

        const fileBuffer = await scannerAlertExportService.exportGeneralAlertToXlsxBuffer(alert);
        const fileName = scannerAlertExportService.buildFileName(alert);

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.send(Buffer.from(fileBuffer));
    } catch (error) {
        logger.logError(error, {
            context: 'Export scanner alert xlsx',
            alertId: req.params.alertId,
        });

        res.status(500).json({
            error: 'Failed to export scanner alert to excel',
        });
    }
});

/**
 * GET /api/chat/alerts/:sessionId
 * Get pending scanner alerts for a session
 * Polling endpoint for proactive notifications
 */
router.get('/alerts/:sessionId', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const { sessionId } = req.params;
        
        // Validate session exists
        const session = await sessionService.getSession(sessionId);
        if (!session) {
            return res.status(404).json({
                error: 'Session not found or expired',
            });
        }

        // Get pending alerts for this session
        const pendingAlerts = alertService.getPendingAlertsForSession(sessionId);
        
        if (pendingAlerts.length > 0) {
            // Format alerts for chat
            const alertMessages = pendingAlerts.map(alert => alertService.formatAlertForChat(alert));
            
            // Mark as delivered
            alertService.markDelivered(
                sessionId, 
                pendingAlerts.map(a => a.id)
            );
            
            logger.info('Polling: Delivered pending alerts', {
                sessionId,
                alertCount: pendingAlerts.length
            });
            
            res.json({
                sessionId,
                hasAlerts: true,
                alerts: alertMessages,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.json({
                sessionId,
                hasAlerts: false,
                alerts: [],
                timestamp: new Date().toISOString(),
            });
        }

    } catch (error) {
        logger.logError(error, {
            context: 'Get alerts',
            sessionId: req.params.sessionId,
        });
        res.status(500).json({
            error: 'Failed to retrieve alerts',
        });
    }
});

/**
 * GET /api/chat/alerts/check/:sessionId
 * Quick check if there are pending alerts (for UI badge)
 * Does NOT mark alerts as delivered (validates tenant ownership)
 */
router.get('/alerts/check/:sessionId', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const { sessionId } = req.params;
        
        // Validate session exists
        const session = await sessionService.getSession(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        
        // Get pending alerts count without marking as delivered
        const hasAlerts = alertService.hasUndeliveredAlerts(sessionId);
        const count = alertService.getPendingAlertsForSession(sessionId).length;
        
        res.json({
            sessionId,
            hasAlerts,
            alertCount: count,
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        res.status(500).json({
            error: 'Failed to check alerts',
        });
    }
});

/**
 * GET /api/chat/history/:sessionId
 * Get conversation history for a session
 */
router.get('/history/:sessionId', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const { sessionId } = req.params;

        // Validate session exists
        const session = await sessionService.getSession(sessionId);
        if (!session) {
            return res.status(404).json({
                error: 'Session not found or expired',
            });
        }

        const history = await sessionService.getHistory(sessionId);

        if (!history) {
            return res.status(404).json({
                error: 'Session not found or expired',
            });
        }

        res.json({
            broker: BROKER_NAME,
            sessionId,
            messages: history,
        });

    } catch (error) {
        logger.logError(error, {
            context: 'Get history',
            sessionId: req.params.sessionId,
        });
        res.status(500).json({
            error: 'Failed to retrieve history',
        });
    }
});

/**
 * DELETE /api/chat/session/:sessionId
 * Delete a chat session
 */
router.delete('/session/:sessionId', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { permanent } = req.query;

        // Validate session exists
        const existingSession = await sessionService.getSession(sessionId);
        if (!existingSession) {
            return res.status(404).json({
                error: 'Session not found',
            });
        }

        const deleted = await sessionService.deleteSession(sessionId, permanent === 'true');

        if (!deleted) {
            return res.status(404).json({
                error: 'Session not found',
            });
        }

        res.json({
            message: permanent === 'true' ? 'Session permanently deleted' : 'Session archived successfully',
        });

    } catch (error) {
        logger.logError(error, {
            context: 'Delete session',
            sessionId: req.params.sessionId,
        });
        res.status(500).json({
            error: 'Failed to delete session',
        });
    }
});

/**
 * GET /api/chat/sessions
 * Get all sessions for a user
 */
router.get('/sessions', freshchatJwt.requireAuth, async (req, res) => {
    try {
        // Get userId from JWT token (priority) or from query params (fallback)
        const userId = freshchatJwt.getUserId(req);
        const { includeArchived, limit, offset } = req.query;

        logger.info('[SESSIONS DEBUG] Incoming request', {
            path: req.originalUrl,
            query: req.query || {},
            body: req.body || {},
            hasReqUserId: !!req.userId,
            hasAuthorization: !!req.headers.authorization,
            hasAuthorizationJwt: !!req.headers['authorization-jwt'] || !!req.headers['Authorization-Jwt']
        });

        if (!userId) {
            logger.warn('[SESSIONS DEBUG] Missing userId in /sessions request', {
                path: req.originalUrl,
                query: req.query || {},
                body: req.body || {},
                user: req.user || null,
            });

            return res.status(400).json({
                error: 'userId is required (via JWT token or query parameter)',
            });
        }

        const sessions = await sessionService.getUserSessions(userId, {
            broker: BROKER_NAME,
            includeArchived: includeArchived === 'true',
            limit: parseInt(limit) || 50,
            offset: parseInt(offset) || 0,
        });

        res.json({
            sessions,
            count: sessions.length,
        });

    } catch (error) {
        logger.logError(error, { context: 'Get user sessions' });
        res.status(500).json({
            error: 'Failed to retrieve sessions',
        });
    }
});

/**
 * GET /api/chat/sessions/:sessionId
 * Get a specific session with messages
 */
router.get('/sessions/:sessionId', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await sessionService.getSession(sessionId);

        if (!session) {
            return res.status(404).json({
                error: 'Session not found',
            });
        }

        res.json(session);

    } catch (error) {
        logger.logError(error, {
            context: 'Get session',
            sessionId: req.params.sessionId,
        });
        res.status(500).json({
            error: 'Failed to retrieve session',
        });
    }
});

/**
 * PATCH /api/chat/sessions/:sessionId
 * Update session properties
 */
router.patch('/sessions/:sessionId', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { title, isArchived, metadata } = req.body;

        // Validate session exists
        const existingSession = await sessionService.getSession(sessionId);
        if (!existingSession) {
            return res.status(404).json({
                error: 'Session not found',
            });
        }

        const updated = await sessionService.updateSession(sessionId, {
            title,
            isArchived,
            metadata,
        });

        if (!updated) {
            return res.status(404).json({
                error: 'Session not found or no changes made',
            });
        }

        res.json({
            message: 'Session updated successfully',
        });

    } catch (error) {
        logger.logError(error, {
            context: 'Update session',
            sessionId: req.params.sessionId,
        });
        res.status(500).json({
            error: 'Failed to update session',
        });
    }
});

/**
 * GET /api/chat/stats
 * Get session statistics
 */
router.get('/stats', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const { userId } = req.query;
        
        const stats = await sessionService.getStats({ 
            userId: userId || null 
        });

        res.json({
            broker: BROKER_NAME,
            ...stats,
        });

    } catch (error) {
        logger.logError(error, { context: 'Get stats' });
        res.status(500).json({
            error: 'Failed to retrieve statistics',
        });
    }
});

/**
 * GET /api/chat/export
 * Export conversations for analytics
 */
router.get('/export', freshchatJwt.requireAuth, async (req, res) => {
    try {
        const { startDate, endDate, userId, format } = req.query;

        const conversations = await sessionService.exportConversations({
            startDate,
            endDate,
            userId,
            format: format || 'json',
        });

        res.json({
            broker: BROKER_NAME,
            exportedAt: new Date().toISOString(),
            conversationCount: conversations.length,
            conversations,
        });

    } catch (error) {
        logger.logError(error, { context: 'Export conversations' });
        res.status(500).json({
            error: 'Failed to export conversations',
        });
    }
});

module.exports = router;
