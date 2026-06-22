require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./utils/logger');
const chatRoutes = require('./routes/chat.routes');
const scannerRoutes = require('./routes/scanner.routes');
const scannerAlertSettingsRoutes = require('./routes/scanner-alert-settings.routes');
const geminiService = require('./services/gemini.service');
const hybridRagService = require('./services/hybrid-rag.service');
const sessionService = require('./services/session.service');
const schedulerService = require('./services/scheduler.service');
const alertService = require('./services/alert.service');
const platformApi = require('./services/platform-api.service');
const internalAiWarnTagService = require('./services/internal-ai-warn-tag.service');

console.log('[SERVER] Starting AI Chatbot Server...');
console.log('[SERVER] Node ENV:', process.env.NODE_ENV);
console.log('[SERVER] Port:', process.env.PORT || 3001);

const app = express();
const PORT = process.env.PORT || 3001;

// Trust first proxy (nginx) - required for express-rate-limit behind reverse proxy
app.set('trust proxy', 1);

// Parse allowed origins from environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:3001', 'http://localhost:4173', 'http://127.0.0.1:4173'];

console.log('[CORS] Allowed origins:', allowedOrigins);

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// CORS configuration - Allow ALL origins for development
app.use(cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve frontend files
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
}));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.path} - ${req.ip}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log(`[REQUEST BODY]`, JSON.stringify(req.body));
    }
    logger.logRequest(req, `${req.method} ${req.path}`);
    next();
});

// Lightweight liveness probe (no DB dependency)
app.get('/health/live', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Full health check endpoint
app.get('/health', async (req, res) => {
    console.log('[HEALTH] Health check requested');
    try {
        const geminiStatus = geminiService.getStatus();
        const sessionStats = await sessionService.getStats();
        const schedulerStatus = schedulerService.getStatus();
        const gatewayStatus = platformApi.getStatus();

        const response = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            services: {
                gemini: geminiStatus,
                gateway: gatewayStatus,
                rag: {
                    type: 'Hybrid (BM25 + Vector)',
                    initialized: hybridRagService.documentsLoaded,
                    documentsCount: hybridRagService.documents.length,
                    embeddingsCount: hybridRagService.embeddings.size,
                    categories: hybridRagService.getCategories(),
                },
                sessions: sessionStats,
                scheduler: schedulerStatus,
            },
        };

        console.log('[HEALTH] Health check response:', JSON.stringify(response, null, 2));
        res.json(response);
    } catch (error) {
        console.error('[HEALTH] Health check error:', error);
        res.status(500).json({
            status: 'error',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// API routes
app.use('/ai-chat-api', chatRoutes);
app.use('/api/scanner', scannerRoutes);
app.use('/api/scanner-alerts', scannerAlertSettingsRoutes);

// Root endpoint
app.get('/status', (req, res) => {
    res.json({
        name: 'Trading Platform Demo Chatbot API',
        version: '1.1.0',
        status: 'running',
        endpoints: {
            health: 'GET /health',
            // Session management
            createSession: 'POST /ai-chat-api/session',
            getSessions: 'GET /ai-chat-api/sessions?userId=...',
            getSession: 'GET /ai-chat-api/sessions/:sessionId',
            updateSession: 'PATCH /ai-chat-api/sessions/:sessionId',
            deleteSession: 'DELETE /ai-chat-api/session/:sessionId',
            // Chat
            sendMessage: 'POST /ai-chat-api/message',
            getHistory: 'GET /ai-chat-api/history/:sessionId',
            getAlerts: 'GET /ai-chat-api/alerts/:sessionId',
            // Analytics
            getStats: 'GET /ai-chat-api/stats',
            exportConversations: 'GET /ai-chat-api/export',
            // Scanner
            scannerStatus: 'GET /api/scanner/status',
            runScan: 'POST /api/scanner/run',
            scanHistory: 'GET /api/scanner/history',
            scannerAlertSettings: 'GET /api/scanner-alerts/settings',
        },
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        path: req.path,
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${req.method} ${req.path} - ${err.message}`);
    logger.logError(err, {
        context: 'Global error handler',
        path: req.path,
        method: req.method,
    });

    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
    });
});

// Initialize services and start server
async function startServer() {
    try {
        console.log('[STARTUP] Initializing AI Chatbot Server...');
        logger.info('Initializing AI Chatbot Server...');

        console.log('[STARTUP] Environment variables:');
        console.log('  PORT:', process.env.PORT);
        console.log('  NODE_ENV:', process.env.NODE_ENV);
        console.log('  GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'SET' : 'NOT SET');
        console.log('  MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
        console.log('  BACKEND_MASTER_URI:', process.env.BACKEND_MASTER_URI ? 'SET' : 'NOT SET');

        // Initialize Session service (MongoDB connection)
        console.log('[STARTUP] Initializing Session service...');
        await sessionService.initialize();
        console.log('[STARTUP] вњ“ Session service initialized with MongoDB');
        logger.info('вњ“ Session service initialized with MongoDB');

        // Initialize internal AI warn tags storage
        await internalAiWarnTagService.initialize();
        console.log('[STARTUP] вњ“ Internal AI warn tag storage initialized');
        logger.info('вњ“ Internal AI warn tag storage initialized');

        // Initialize backend integration (direct WebSocket to Gateway)
        // Use timeout to prevent blocking server startup if Backend Master is unavailable
        if (process.env.BACKEND_MASTER_URI) {
            console.log('[STARTUP] Initializing platform integration...');
            try {
                // Set timeout for initialization (15 seconds)
                const initTimeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Platform API initialization timeout (15s)')), 15000)
                );
                
                await Promise.race([
                    platformApi.initialize(),
                    initTimeout
                ]);
                
                console.log('[STARTUP] вњ“ Platform integration connected to gateway');
                console.log('[STARTUP] Gateway status:', platformApi.getStatus());
                logger.info('вњ“ Platform API connected to Backend Master (NO AUTH)');
                logger.info('  Gateway status:', platformApi.getStatus());
            } catch (apiError) {
                console.error('[STARTUP] вќЊ Platform API connection failed:', apiError.message);
                console.log('[STARTUP] вљ пёЏ Server will continue without platform integration. Function calling will be limited.');
                logger.warn('Platform integration connection failed - function calling will be limited', {
                    error: apiError.message
                });
                // Continue startup even if platform API fails
            }
        } else {
            console.log('[STARTUP] вљ пёЏ BACKEND_MASTER_URI not configured - Function calling disabled');
            logger.warn('BACKEND_MASTER_URI not configured - Function Calling disabled');
        }

        // Initialize Gemini service
        console.log('[STARTUP] Initializing Gemini service...');
        await geminiService.initialize();
        console.log('[STARTUP] вњ“ Gemini service initialized');
        logger.info('вњ“ Gemini service initialized');

        // Initialize Hybrid RAG service
        console.log('[STARTUP] Initializing Hybrid RAG service...');
        await hybridRagService.initialize();
        console.log('[STARTUP] вњ“ Hybrid RAG service initialized (BM25 + Vector)');
        logger.info('вњ“ Hybrid RAG service initialized (BM25 + Vector)');

        // Initialize Scheduler service (for arbitrage scanner)
        console.log('[STARTUP] Initializing Scheduler service...');
        await schedulerService.initialize();
        console.log('[STARTUP] вњ“ Scheduler service initialized');
        logger.info('вњ“ Scheduler service initialized');

        // Start Express server
        console.log(`[STARTUP] рџљЂ Starting Express server on port ${PORT}...`);
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`[STARTUP] рџљЂ AI Chatbot server running on port ${PORT}`);
            console.log(`[STARTUP] Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`[STARTUP] Allowed origins: ${allowedOrigins.join(', ')}`);
            console.log('[STARTUP] Server ready to accept requests');
            logger.info(`рџљЂ AI Chatbot server running on port ${PORT}`);
            logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
            logger.info(`Allowed origins: ${allowedOrigins.join(', ')}`);
            logger.info('Server ready to accept requests');
        });

    } catch (error) {
        console.error('[STARTUP] вќЊ Server startup failed:', error);
        logger.logError(error, { context: 'Server startup' });
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    schedulerService.stop();
    await sessionService.close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    logger.info('SIGINT signal received: closing HTTP server');
    schedulerService.stop();
    await sessionService.close();
    process.exit(0);
});

// Start the server
startServer();

module.exports = app;

