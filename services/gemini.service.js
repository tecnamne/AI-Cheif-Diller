const fetch = require('node-fetch');
const logger = require('../utils/logger');
const { SYSTEM_PROMPT, OFF_TOPIC_RESPONSE } = require('../prompts/system.prompt');
const hybridRagService = require('./hybrid-rag.service');
const platformApi = require('./platform-api.service');
const fieldFilter = require('./field-filter.service');
const { functionDeclarations: localFunctionDeclarations } = require('../config/functions');

// Default tenant for backwards compatibility
const DEFAULT_TENANT = 'default';
const DEMO_MODE = process.env.DEMO_MODE === 'true';
const DEMO_KEYWORDS = [
    'watchlist',
    'alert',
    'scanner',
    'status',
    'scan',
    'run',
];

/**
 * Gemini AI Service
 * Handles interaction with Google Gemini API
 * 
 * Multi-tenant demo-friendly layer that works with or without external API.
 */
class GeminiService {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        this.model = process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp';
        this.initialized = false;
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
        this.requestTimeoutMs = parseInt(process.env.GEMINI_REQUEST_TIMEOUT_MS, 10) || 60000;
        
        // Default platform service URL for tool execution (legacy + compatibility)
        this.defaultPlatformUrl = process.env.PLATFORM_SERVICE_URL
            || process.env.Platform_SERVICE_URL
            || 'http://localhost:3003';
        
        // Tenant-specific platform URL mapping
        // Preferred: TENANT_<TENANTID>_PLATFORM_SERVICE_URL=http://broker-specific-api:3003
        // Backward compatible: TENANT_<TENANTID>_Platform_URL=http://legacy-api:3003
        // Can be overridden via environment variables or loaded from config
        this.tenantUrls = this._loadTenantUrls();
        
        this.functionDeclarations = null;
    }

    /**
 * Load tenant URL mappings from environment variables
 * Environment format: TENANT_BROKER1_PLATFORM_SERVICE_URL=http://api:3003
 * Backward compatible: TENANT_BROKER1_Platform_URL=http://legacy-api:3003
 */
    _loadTenantUrls() {
        const mapping = {};
        
        // Parse TENANT_<id>_PLATFORM_SERVICE_URL and legacy names
        for (const [key, value] of Object.entries(process.env)) {
            const platformMatch = key.match(/^TENANT_(.+)_PLATFORM_SERVICE_URL$/);
            const legacyMatch = key.match(/^TENANT_(.+)_Platform_URL$/);
            if ((platformMatch || legacyMatch) && value) {
                const match = platformMatch || legacyMatch;
                const tenantId = match[1].toLowerCase();
                mapping[tenantId] = value;
                logger.info('Loaded tenant platform URL', { tenantId, url: value, legacy: !platformMatch });
            }
        }
        
        // Also support JSON config in TENANT_PLATFORM_SERVICE_URLS\n        // and legacy TENANT_Platform_URLS
        const jsonConfig = process.env.TENANT_PLATFORM_SERVICE_URLS || process.env.TENANT_Platform_URLS;
        if (jsonConfig) {
            try {
                const parsed = JSON.parse(jsonConfig);
                Object.assign(mapping, parsed);
                logger.info('Loaded tenant URLs from JSON config', { count: Object.keys(parsed).length });
            } catch (e) {
                logger.warn('Failed to parse tenant URL JSON config', { error: e.message });
            }
        }
        
        return mapping;
    }

    /**
     * Get platform service URL for a specific tenant
     */
    getPlatformUrl(tenantId = DEFAULT_TENANT) {
        const normalizedTenant = (tenantId || DEFAULT_TENANT).toLowerCase();
        const url = this.tenantUrls[normalizedTenant] || this.defaultPlatformUrl;
        logger.debug('Resolved platform URL for tenant', { tenantId: normalizedTenant, url });
        return url;
    }

    _getRetryConfig() {
        const parsedMaxRetries = parseInt(
            process.env.GEMINI_MAX_RETRIES || process.env.GEMINI_RETRY_MAX_ATTEMPTS,
            10
        );

        return {
            maxRetries: Number.isFinite(parsedMaxRetries) && parsedMaxRetries >= 0 ? parsedMaxRetries : 2,
            baseDelayMs: parseInt(process.env.GEMINI_RETRY_BASE_DELAY_MS, 10) || 1000,
            maxDelayMs: parseInt(process.env.GEMINI_RETRY_MAX_DELAY_MS, 10) || 15000,
        };
    }

    _parseRetryAfterMs(retryAfterHeader) {
        if (!retryAfterHeader) {
            return 0;
        }

        const asSeconds = Number(retryAfterHeader);
        if (Number.isFinite(asSeconds) && asSeconds >= 0) {
            return Math.floor(asSeconds * 1000);
        }

        const asDateMs = Date.parse(retryAfterHeader);
        if (Number.isFinite(asDateMs)) {
            return Math.max(0, asDateMs - Date.now());
        }

        return 0;
    }

    _isRetryableGeminiError(status, apiStatus) {
        return status === 429 || status >= 500 || apiStatus === 'RESOURCE_EXHAUSTED';
    }

    _calculateRetryDelayMs(attempt, retryAfterMs, retryConfig) {
        if (retryAfterMs > 0) {
            return Math.min(retryAfterMs, retryConfig.maxDelayMs);
        }

        const expDelay = retryConfig.baseDelayMs * Math.pow(2, Math.max(0, attempt - 1));
        return Math.min(expDelay, retryConfig.maxDelayMs);
    }

    _trimErrorText(errorText = '') {
        const text = String(errorText || '');
        return text.length > 1000 ? `${text.slice(0, 1000)}...[truncated]` : text;
    }

    _createGeminiApiError({
        status,
        apiStatus,
        apiCode,
        apiMessage,
        retryAfterMs,
        requestType,
        tenantId,
        attempt,
        maxAttempts,
        rawError,
    }) {
        const error = new Error(
            `Gemini API error: ${status}${apiStatus ? ` (${apiStatus})` : ''}${apiMessage ? ` - ${apiMessage}` : ''}`
        );

        error.code = 'GEMINI_API_ERROR';
        error.httpStatus = status;
        error.apiStatus = apiStatus;
        error.apiCode = apiCode;
        error.apiMessage = apiMessage;
        error.retryAfterMs = retryAfterMs || 0;
        error.requestType = requestType;
        error.tenantId = tenantId;
        error.attempt = attempt;
        error.maxAttempts = maxAttempts;
        error.rawError = this._trimErrorText(rawError);
        error.isRateLimit = status === 429 || apiStatus === 'RESOURCE_EXHAUSTED';
        error.isConfigError = status === 401 || status === 403;

        return error;
    }

    _sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async _callGeminiApi(requestBody, context = {}) {
        const {
            requestType = 'generateResponse',
            tenantId = DEFAULT_TENANT,
            requestId = null,
            userId = null,
        } = context;

        const retryConfig = this._getRetryConfig();
        const maxAttempts = retryConfig.maxRetries + 1;
        const url = `${this.apiUrl}/${this.model}:generateContent?key=${this.apiKey}`;

        for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
            const startedAt = Date.now();
            let response;

            try {
                response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody),
                    timeout: this.requestTimeoutMs,
                });
            } catch (networkError) {
                const isLastAttempt = attempt >= maxAttempts;
                const delayMs = this._calculateRetryDelayMs(attempt, 0, retryConfig);

                logger.warn('Gemini API network error', {
                    requestType,
                    tenantId,
                    requestId,
                    userId,
                    model: this.model,
                    attempt,
                    maxAttempts,
                    retryScheduled: !isLastAttempt,
                    nextDelayMs: !isLastAttempt ? delayMs : 0,
                    error: networkError.message,
                });

                if (isLastAttempt) {
                    const finalError = new Error(`Gemini network error: ${networkError.message}`);
                    finalError.code = 'GEMINI_NETWORK_ERROR';
                    finalError.requestType = requestType;
                    finalError.tenantId = tenantId;
                    finalError.requestId = requestId;
                    finalError.userId = userId;
                    finalError.attempt = attempt;
                    finalError.maxAttempts = maxAttempts;
                    throw finalError;
                }

                await this._sleep(delayMs);
                continue;
            }

            if (response.ok) {
                const durationMs = Date.now() - startedAt;
                if (attempt > 1) {
                    logger.info('Gemini API recovered after retry', {
                        requestType,
                        tenantId,
                        requestId,
                        userId,
                        model: this.model,
                        attempt,
                        maxAttempts,
                        durationMs,
                    });
                }

                return await response.json();
            }

            const errorText = await response.text();
            let errorPayload = null;

            try {
                errorPayload = JSON.parse(errorText);
            } catch (parseError) {
                errorPayload = null;
            }

            const apiError = errorPayload?.error || {};
            const apiStatus = apiError.status;
            const apiCode = apiError.code;
            const apiMessage = apiError.message;
            const retryAfterMs = this._parseRetryAfterMs(response.headers?.get('retry-after'));
            const retryable = this._isRetryableGeminiError(response.status, apiStatus);
            const isLastAttempt = attempt >= maxAttempts;
            const delayMs = this._calculateRetryDelayMs(attempt, retryAfterMs, retryConfig);

            logger[retryable ? 'warn' : 'error']('Gemini API returned non-OK response', {
                requestType,
                tenantId,
                requestId,
                userId,
                model: this.model,
                status: response.status,
                apiStatus,
                apiCode,
                apiMessage,
                attempt,
                maxAttempts,
                retryable,
                retryAfterMs,
                retryScheduled: retryable && !isLastAttempt,
                nextDelayMs: retryable && !isLastAttempt ? delayMs : 0,
                errorPreview: this._trimErrorText(errorText),
            });

            if (retryable && !isLastAttempt) {
                await this._sleep(delayMs);
                continue;
            }

            throw this._createGeminiApiError({
                status: response.status,
                apiStatus,
                apiCode,
                apiMessage,
                retryAfterMs,
                requestType,
                tenantId,
                attempt,
                maxAttempts,
                rawError: errorText,
            });
        }

        throw new Error('Unexpected Gemini call state');
    }

    /**
     * Initialize Gemini API
     */
    async initialize() {
        try {
            if (DEMO_MODE) {
                if (!this.initialized) {
                    await this.loadFunctionDeclarations();
                    this.initialized = true;
                    logger.info('Gemini service initialized in DEMO mode (mock responses enabled)');
                }
                return;
            }

            if (!this.apiKey) {
                throw new Error('GEMINI_API_KEY is not set in environment variables');
            }

            // Load function declarations from local config
            await this.loadFunctionDeclarations();

            this.initialized = true;
            logger.info('Gemini service initialized successfully', { 
                model: this.model,
                functionsLoaded: this.functionDeclarations?.length || 0
            });
        } catch (error) {
            logger.logError(error, { context: 'Gemini initialization' });
            throw error;
        }
    }

    /**
 * Load function declarations from local config
 * Uses local definitions - functions are same across tenants
     */
    async loadFunctionDeclarations() {
        try {
            // Use local function declarations
            this.functionDeclarations = localFunctionDeclarations;
            logger.info('Loaded function declarations from local config', { count: this.functionDeclarations.length });
        } catch (error) {
            logger.warn('Failed to load function declarations', { error: error.message });
            this.functionDeclarations = [];
        }
    }

    /**
     * Check if question is on-topic (related to platform operations)
     */
    isOnTopic(message) {
        // First check: is it explicitly about platform features/data?
        // These should ALWAYS be on-topic regardless of wording
        const onTopicPatterns = [
            /\b(account|СЃС‡РµС‚|Р°РєРєР°СѓРЅС‚|login|Р»РѕРіРёРЅ)\b/i,
            /\b(trigger|С‚СЂРёРіРіРµСЂ|alert|Р°Р»РµСЂС‚)\b/i,
            /\b(position|РїРѕР·РёС†|trade|СЃРґРµР»Рє|РѕСЂРґРµСЂ)\b/i,
            /\b(balance|Р±Р°Р»Р°РЅСЃ|equity|СЌРєРІРёС‚Рё|profit|РїСЂРѕС„РёС‚|p&l|pnl)\b/i,
            /\b(margin|РјР°СЂР¶Р°|РјР°СЂР¶РёРЅ|leverage|РїР»РµС‡Рѕ)\b/i,
            /\b(a-book|b-book|abook|bbook|routing|СЂРѕСѓС‚РёРЅРі)\b/i,
            /\b(node|РЅРѕРґР°|СЃРµСЂРІРµСЂ|server|mt4|mt5|ctrader)\b/i,
            /\b(scanner|platform|alerts?|alerting)\b/i,
            /\b(РїРѕРґРєР»СЋС‡|connect|plugin|РїР»Р°РіРёРЅ|РёРЅС‚РµРіСЂР°С†|integration)\b/i,
            /\b(С‚СЂРµР±РѕРІР°РЅ|requirement|РЅР°СЃС‚СЂРѕР№|setting|config)\b/i,
        ];
        
        for (const pattern of onTopicPatterns) {
            if (pattern.test(message)) {
                return true;
            }
        }

        const offTopicPatterns = [
            /what (ai model|model|llm|language model)/i,
            /who (created|made|built) you/i,
            /what('s| is) your (revenue|income|profit|financials)/i,
            /company (revenue|income|financials|earnings)/i,
            /write (code|program|script)/i,
            /how (much|many) (money|dollars|revenue)/i,
            /what('s| is) the weather/i,
            /tell me a joke/i,
            /recommend (a movie|a book|restaurants)/i,
            /СЂР°СЃСЃРєР°Р¶Рё Р°РЅРµРєРґРѕС‚/i,
            /РєР°РєР°СЏ РїРѕРіРѕРґР°/i,
            /РЅР°РїРёС€Рё (РєРѕРґ|РїСЂРѕРіСЂР°РјРј|СЃРєСЂРёРїС‚)/i,
        ];

        const messageLower = message.toLowerCase();
        
        for (const pattern of offTopicPatterns) {
            if (pattern.test(messageLower)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Expand query with context from conversation history
     */
    expandQueryWithContext(userMessage, conversationHistory = []) {
        const ambiguousPatterns = [
            /^РєР°Рє (РѕРЅ|РѕРЅР°|РѕРЅРѕ|СЌС‚Рѕ|СЌС‚РѕС‚ С‚СЂРёРіРіРµСЂ|СЌС‚Р° С„СѓРЅРєС†РёСЏ)/i,
            /^С‡С‚Рѕ (РѕРЅ|РѕРЅР°|РѕРЅРѕ|СЌС‚Рѕ) РґРµР»Р°РµС‚/i,
            /^(РѕРЅ|РѕРЅР°|РѕРЅРѕ|СЌС‚Рѕ) СѓС‡РёС‚С‹РІР°РµС‚/i,
            /^(РѕРЅ|РѕРЅР°|РѕРЅРѕ|СЌС‚Рѕ|this|it) (СЂР°Р±РѕС‚Р°РµС‚|СЃСЂР°Р±Р°С‚С‹РІР°РµС‚|РЅР°СЃС‚СЂР°РёРІР°РµС‚СЃСЏ|triggers|works)/i,
            /^how (does )?(it|this)/i,
            /^what (does )?(it|this)/i,
            /^(explain|describe|tell me about) (it|this)/i,
        ];
        
        const needsContext = ambiguousPatterns.some(p => p.test(userMessage.toLowerCase()));
        
        if (!needsContext || conversationHistory.length === 0) {
            return userMessage;
        }
        
        const recentMessages = conversationHistory.slice(-4);
        let topic = null;
        
        const knownEntities = [
            'achieved profit', 'latency arbitrage', 'cid control', 'ip control',
            'bad rates', 'churning', 'overdue credits', 'insiders', 'stop out',
            'large volume', 'unusual pnl', 'margin level', 'trader activity',
            'affiliate cheating', 'spread by period', 'toxic flow', 'quote delay',
            'a-book', 'b-book', 'hedging', 'routing', 'net summary', 'exposure'
        ];
        
        for (const msg of recentMessages.reverse()) {
            const content = (msg.content || '').toLowerCase();
            for (const entity of knownEntities) {
                if (content.includes(entity)) {
                    topic = entity;
                    break;
                }
            }
            if (topic) break;
        }
        
        if (topic) {
            const expandedQuery = `${topic} ${userMessage}`;
            logger.info('Query expanded with context', { original: userMessage, topic, expanded: expandedQuery });
            return expandedQuery;
        }
        
        return userMessage;
    }

    _buildDemoResponse(userMessage, userLanguage) {
        const normalized = String(userMessage || '').toLowerCase();
        const isRussian = userLanguage === 'Russian';

        if (DEMO_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
            return isRussian
                ? 'Р”РµРјРѕ-СЂРµР¶РёРј: РјРѕРіСѓ РїРѕРєР°Р·Р°С‚СЊ СЃС‚Р°С‚СѓСЃ СЃРєР°РЅРµСЂР°, Р·Р°РїСѓСЃС‚РёС‚СЊ РїСЂРѕРІРµСЂРєСѓ Рё РїРѕРєР°Р·Р°С‚СЊ С‚РµРєСѓС‰РёРµ Р°Р»РµСЂС‚С‹.'
                : 'Demo mode: I can show scanner status, trigger a scan, and load pending alerts.';
        }

        if (isRussian) {
            return 'Я в демо-режиме. Задайте вопрос по сканеру, алертам, аккаунтам или общему состоянию платформы.';
        }

        return 'Demo mode is active. Ask about scanner status, run actions, or alerts.';
    }

    /**
     * Detect language of user message
     */
    detectLanguage(message) {
        const cyrillicPattern = /[\u0400-\u04FF]/;
        if (cyrillicPattern.test(message)) {
            return 'Russian';
        }
        return 'English';
    }

    /**
     * Detect intent: ranking countries by trading volume.
     * This is handled deterministically to avoid model drifting.
     */
    _isCountryVolumeRankingQuery(message) {
        const text = String(message || '').toLowerCase();
        const hasCountry = /(СЃС‚СЂР°РЅ|country|countries)/i.test(text);
        const hasVolume = /(РѕР±СЉ[РµС‘]Рј|volume|Р»РѕС‚|lots?)/i.test(text);
        return hasCountry && hasVolume;
    }

    _extractTopFromMessage(message, defaultTop = 20, maxTop = 100) {
        const text = String(message || '').toLowerCase();
        const match = text.match(/(?:top|С‚РѕРї)\s*(\d{1,3})/i);
        if (!match) {
            return defaultTop;
        }

        const parsed = parseInt(match[1], 10);
        if (!Number.isFinite(parsed) || parsed <= 0) {
            return defaultTop;
        }

        return Math.min(parsed, maxTop);
    }

    _formatLots(value, userLanguage) {
        const num = Number(value);
        if (!Number.isFinite(num)) {
            return '0';
        }

        return num.toLocaleString(userLanguage === 'Russian' ? 'ru-RU' : 'en-US', {
            maximumFractionDigits: 2
        });
    }

    async _handleCountryVolumeRanking(userMessage, tenantId, userLanguage) {
        const top = this._extractTopFromMessage(userMessage);
        const functionResult = await this.executePlatformFunction(
            'getWinnersLosers',
            { top },
            tenantId
        );

        const payload = functionResult.result || functionResult;
        if (!payload || payload.error) {
            return userLanguage === 'Russian'
                ? 'РќРµ СѓРґР°Р»РѕСЃСЊ РїРѕР»СѓС‡РёС‚СЊ РґР°РЅРЅС‹Рµ РїРѕ РѕР±СЉС‘РјР°Рј РєР»РёРµРЅС‚РѕРІ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕРІС‚РѕСЂРёС‚СЊ Р·Р°РїСЂРѕСЃ С‡СѓС‚СЊ РїРѕР·Р¶Рµ.'
                : 'Failed to fetch client volume data. Please try again in a moment.';
        }

        const countryStatus = payload.countryDataStatus;
        const byCountry = Array.isArray(payload.byCountry) ? payload.byCountry : [];

        if (countryStatus === 'disabled_by_config') {
            return userLanguage === 'Russian'
                ? 'РџРµСЂСЃРѕРЅР°Р»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ РєР»РёРµРЅС‚Р° (Р¤РРћ, email, СЃС‚СЂР°РЅР° Рё С‚.Рґ.) РЅРµ РЅР°СЃС‚СЂРѕРµРЅС‹ РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ РІ AI-Р°СЃСЃРёСЃС‚РµРЅС‚Рµ РґР»СЏ РІР°С€РµРіРѕ СЃРµСЂРІРµСЂР°. РћР±СЂР°С‚РёС‚РµСЃСЊ Рє Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂСѓ РґР»СЏ РЅР°СЃС‚СЂРѕР№РєРё РІРёРґРёРјРѕСЃС‚Рё РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… РїРѕР»РµР№.'
                : 'Client personal data (name, email, country, etc.) is not configured for display in the AI assistant for your server. Please contact your administrator to configure personal field visibility.';
        }

        if (countryStatus === 'missing_in_source') {
            return userLanguage === 'Russian'
                ? 'РџРѕР»Рµ СЃС‚СЂР°РЅС‹ СЂР°Р·СЂРµС€РµРЅРѕ РІ РЅР°СЃС‚СЂРѕР№РєР°С…, РЅРѕ РІ С‚РµРєСѓС‰РµР№ РІС‹Р±РѕСЂРєРµ Winners/Losers РёСЃС‚РѕС‡РЅРёРє РґР°РЅРЅС‹С… РЅРµ РІРµСЂРЅСѓР» Р·РЅР°С‡РµРЅРёСЏ country. РџРѕСЌС‚РѕРјСѓ СЂР°РЅР¶РёСЂРѕРІР°РЅРёРµ РїРѕ СЃС‚СЂР°РЅР°Рј СЃРµР№С‡Р°СЃ РїРѕСЃС‚СЂРѕРёС‚СЊ РЅРµР»СЊР·СЏ.'
                : 'Country field is enabled in configuration, but the current Winners/Losers dataset does not include country values from the data source. Country ranking cannot be built right now.';
        }

        if (countryStatus === 'no_accounts') {
            return userLanguage === 'Russian'
                ? 'РЎРµР№С‡Р°СЃ РЅРµС‚ РґР°РЅРЅС‹С… РїРѕ РєР»РёРµРЅС‚Р°Рј РІ РѕС‚С‡С‘С‚Рµ Winners/Losers, РїРѕСЌС‚РѕРјСѓ СЂР°РЅР¶РёСЂРѕРІР°РЅРёРµ СЃС‚СЂР°РЅ РїРѕСЃС‚СЂРѕРёС‚СЊ РЅРµР»СЊР·СЏ.'
                : 'There are currently no client records in Winners/Losers, so country ranking cannot be built.';
        }

        if (countryStatus === 'available' && byCountry.length > 0) {
            const maxRows = 20;
            const rows = byCountry.slice(0, maxRows);

            if (userLanguage === 'Russian') {
                const lines = ['РЎС‚СЂР°РЅС‹ СЃ РЅР°РёР±РѕР»СЊС€РёРјРё С‚РѕСЂРіРѕРІС‹РјРё РѕР±СЉС‘РјР°РјРё (РїРѕ СѓР±С‹РІР°РЅРёСЋ):'];
                for (let i = 0; i < rows.length; i += 1) {
                    const row = rows[i];
                    lines.push(`вЂў **${i + 1}. ${row.country}**: ${this._formatLots(row.totalLots, userLanguage)} Р»РѕС‚РѕРІ, РєР»РёРµРЅС‚РѕРІ: ${row.accounts}`);
                }
                if (byCountry.length > maxRows) {
                    lines.push(`РџРѕРєР°Р·Р°РЅРѕ ${maxRows} РёР· ${byCountry.length} СЃС‚СЂР°РЅ.`);
                }
                return lines.join('\n');
            }

            const lines = ['Countries with the largest trading volumes (descending):'];
            for (let i = 0; i < rows.length; i += 1) {
                const row = rows[i];
                lines.push(`вЂў **${i + 1}. ${row.country}**: ${this._formatLots(row.totalLots, userLanguage)} lots, clients: ${row.accounts}`);
            }
            if (byCountry.length > maxRows) {
                lines.push(`Showing ${maxRows} of ${byCountry.length} countries.`);
            }
            return lines.join('\n');
        }

        return userLanguage === 'Russian'
            ? 'РЎРµР№С‡Р°СЃ РЅРµ СѓРґР°Р»РѕСЃСЊ РїРѕСЃС‚СЂРѕРёС‚СЊ СЂР°РЅР¶РёСЂРѕРІР°РЅРёРµ СЃС‚СЂР°РЅ РїРѕ РѕР±СЉС‘РјР°Рј РЅР° РѕСЃРЅРѕРІРµ РґРѕСЃС‚СѓРїРЅС‹С… РґР°РЅРЅС‹С….'
            : 'Could not build country-by-volume ranking from the currently available data.';
    }

    /**
     * Find a function call in any candidate part.
     * Gemini can return text first and functionCall in a later part.
     */
    _findFunctionCallInParts(parts = []) {
        for (const part of parts) {
            if (part && part.functionCall && part.functionCall.name) {
                return part.functionCall;
            }
        }
        return null;
    }

    /**
     * Build readable text from all text parts.
     */
    _collectTextFromParts(parts = []) {
        return parts
            .map((part) => (part && typeof part.text === 'string' ? part.text : ''))
            .filter(Boolean)
            .join('\n')
            .trim();
    }

    /**
     * Fallback when model says it will call a function, but does not emit tool call.
     * Keep this narrow to avoid executing wrong functions without arguments.
     */
    _extractFallbackFunctionCallFromText(text = '') {
        const normalized = String(text || '').toLowerCase();
        const mentionsAction = /(РІС‹Р·РѕРІ|РІС‹Р·РѕРІСѓ|call|invoke|run)/i.test(normalized);

        if (!mentionsAction) {
            return null;
        }

        if (/getwinnerslosers\s*\(/i.test(text)) {
            return { name: 'getWinnersLosers', args: {} };
        }

        return null;
    }

    /**
     * Generate response using Gemini with RAG context
     * @param {string} userMessage - User message
     * @param {Array} conversationHistory - Previous messages
     * @param {Object} options - Options including tenantId for multi-tenant routing
     */
    async generateResponse(userMessage, conversationHistory = [], options = {}) {
        const {
            tenantId = options.broker || DEFAULT_TENANT,
            requestId = null,
            userId = null,
        } = options;
        
        if (!this.initialized) {
            await this.initialize();
        }

        if (DEMO_MODE) {
            const userLanguage = this.detectLanguage(userMessage);
            return this._buildDemoResponse(userMessage, userLanguage);
        }

        try {
            if (!this.isOnTopic(userMessage)) {
                logger.info('Off-topic question detected', { message: userMessage.substring(0, 100), tenantId });
                return OFF_TOPIC_RESPONSE;
            }

            const userLanguage = this.detectLanguage(userMessage);
            logger.info('Detected user language', { language: userLanguage, tenantId });

            if (this._isCountryVolumeRankingQuery(userMessage)) {
                logger.info('Applying deterministic country volume handler', { tenantId });
                return await this._handleCountryVolumeRanking(userMessage, tenantId, userLanguage);
            }

            const expandedQuery = this.expandQueryWithContext(userMessage, conversationHistory);
            const { context: relevantContext, sources } = await hybridRagService.search(expandedQuery);

            if (relevantContext && sources.length > 0) {
                logger.info('Hybrid RAG found context', { 
                    contextLength: relevantContext.length,
                    sourcesCount: sources.length,
                    topSource: sources[0]?.filename,
                    topScore: sources[0]?.score?.toFixed(3),
                    tenantId
                });
            }

            const allowedPersonalFields = fieldFilter.getAllowedFields();
            const personalFieldsInstruction = allowedPersonalFields.length > 0
                ? `Allowed personal fields for this broker: ${allowedPersonalFields.join(', ')}.\nIf user asks for these fields and function response contains values, show them.\nIf values are missing in response, explicitly say data is not provided by source for current records.`
                : 'Allowed personal fields for this broker: none. If user asks for personal data, explain that personal fields are disabled for this broker.';

            let fullPrompt = `**вљ пёЏ MANDATORY: Respond ONLY in ${userLanguage}. This is non-negotiable.**\n\n`;
            fullPrompt += SYSTEM_PROMPT + '\n\n';
            fullPrompt += `RUNTIME CONFIG:\n${personalFieldsInstruction}\n\n`;
            
            if (relevantContext) {
                fullPrompt += relevantContext + '\n\n';
                fullPrompt += '**Instructions:** The documentation above comes from MULTIPLE sources. Analyze ALL sections and synthesize a comprehensive answer.\n\n';
            }

            if (conversationHistory.length > 0) {
                fullPrompt += 'CONVERSATION HISTORY:\n';
                for (const msg of conversationHistory.slice(-4)) {
                    fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
                }
                fullPrompt += '\n';
            }

            fullPrompt += `**REMINDER: Your response MUST be in ${userLanguage}.**\n`;
            fullPrompt += `User: ${userMessage}\nAssistant:`;

            logger.info('Generating response', {
                messageLength: userMessage.length,
                hasContext: !!relevantContext,
                historyLength: conversationHistory.length
            });

            const requestBody = {
                contents: [{
                    parts: [{ text: fullPrompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                    candidateCount: 1,
                }
            };

            if (this.functionDeclarations && this.functionDeclarations.length > 0) {
                requestBody.tools = [{
                    function_declarations: this.functionDeclarations
                }];
                logger.info('Function Calling enabled', { functions: this.functionDeclarations.length });
            }

            const data = await this._callGeminiApi(requestBody, {
                requestType: 'generateResponse',
                tenantId,
                requestId,
                userId,
            });
            
            if (!data.candidates || !data.candidates[0]) {
                throw new Error('No response candidates from Gemini');
            }

            const candidate = data.candidates[0];
            
            if (candidate.finishReason === 'SAFETY') {
                logger.warn('Response blocked by safety filters');
                return OFF_TOPIC_RESPONSE;
            }

            if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
                throw new Error('Invalid response structure from Gemini');
            }

            const parts = candidate.content.parts;
            const functionCall = this._findFunctionCallInParts(parts);

            if (functionCall) {
                logger.info('Function call requested', { 
                    function: functionCall.name,
                    args: functionCall.args,
                    tenantId
                });

                // Pass tenantId to route function execution to correct platform API binding
                const functionResult = await this.executePlatformFunction(
                    functionCall.name,
                    functionCall.args,
                    tenantId
                );

                const followUpResponse = await this.generateResponseWithFunctionResult(
                    userMessage,
                    functionCall,
                    functionResult
                );

                return followUpResponse;
            }

            const text = this._collectTextFromParts(parts);

            const fallbackFunctionCall = this._extractFallbackFunctionCallFromText(text);
            if (fallbackFunctionCall) {
                logger.warn('Model mentioned function in text without tool call; executing fallback', {
                    function: fallbackFunctionCall.name,
                    tenantId
                });

                const functionResult = await this.executePlatformFunction(
                    fallbackFunctionCall.name,
                    fallbackFunctionCall.args,
                    tenantId
                );

                return await this.generateResponseWithFunctionResult(
                    userMessage,
                    fallbackFunctionCall,
                    functionResult
                );
            }

            if (!text) {
                throw new Error('Model response has no text and no function call');
            }

            logger.info('Response generated successfully', { responseLength: text.length });
            return text;

        } catch (error) {
            console.error('[GEMINI ERROR]', error.message, error.stack);
            logger.logError(error, { context: 'Generating response', message: userMessage.substring(0, 100) });

            if (error.code && error.code.startsWith('AI_')) {
                throw error;
            }

            if (error.code === 'GEMINI_API_ERROR' || error.code === 'GEMINI_NETWORK_ERROR') {
                if (error.isConfigError || error.message?.includes('API key') || error.message?.includes('403')) {
                    const mappedError = new Error('AI service configuration error');
                    mappedError.code = 'AI_CONFIG_ERROR';
                    throw mappedError;
                }

                if (error.isRateLimit || error.message?.includes('quota') || error.message?.includes('429')) {
                    const mappedError = new Error('AI service temporarily unavailable');
                    mappedError.code = 'AI_TEMP_UNAVAILABLE';
                    mappedError.retryAfterMs = error.retryAfterMs || 0;
                    mappedError.causeStatus = error.httpStatus || null;
                    throw mappedError;
                }
            }

            if (error.message?.includes('API key') || error.message?.includes('403')) {
                const mappedError = new Error('AI service configuration error');
                mappedError.code = 'AI_CONFIG_ERROR';
                throw mappedError;
            } else if (error.message?.includes('quota') || error.message?.includes('429')) {
                const mappedError = new Error('AI service temporarily unavailable');
                mappedError.code = 'AI_TEMP_UNAVAILABLE';
                throw mappedError;
            }

            const mappedError = new Error('Failed to generate response');
            mappedError.code = 'AI_GENERATION_FAILED';
            throw mappedError;
        }
    }

    /**
     * Execute platform function via authenticated WebSocket connection
     * @param {string} functionName - Function to execute
     * @param {Object} args - Function arguments
     * @param {string} tenantId - Tenant ID (for logging)
     */
    async executePlatformFunction(functionName, args, tenantId = DEFAULT_TENANT) {
        const scannerFunctions = [
            'runArbitrageScan', 'checkWatchlist', 'getWatchlist',
            'getScannerStatus', 'analyzeAccountForArbitrage',
            'addToWatchlist', 'removeFromWatchlist'
        ];

        if (scannerFunctions.includes(functionName)) {
            return await this.executeLocalScannerFunction(functionName, args);
        }

        if (DEMO_MODE) {
            return {
                result: {
                    demo: true,
                    function: functionName,
                    message: 'Demo mode: platform integrations are mocked. Re-run with real credentials for live data.',
                    args,
                },
            };
        }

        try {
            logger.info('Executing platform function via WebSocket', { 
                functionName, 
                tenantId,
                args 
            });
            
            let result;
            
            switch (functionName) {
                case 'getAccountCurrentProfit':
                    result = await platformApi.getAccountCurrentProfit(args.login);
                    break;
                case 'getAccountProfitHistory':
                    result = await platformApi.getAccountProfitHistory(args.login, args.startDate, args.endDate);
                    break;
                case 'getAccountDetails':
                    result = await platformApi.getAccountDetails(args.login);
                    break;
                case 'getAccountTrades':
                    result = await platformApi.getAccountTrades(args.login, args.startDate, args.endDate);
                    break;
                case 'getAccountPositions':
                    result = await platformApi.getAccountPositions(args.login);
                    break;
                case 'analyzeAccount':
                    result = await platformApi.analyzeAccount(args.login);
                    break;
                case 'getAccountConnections':
                    result = await platformApi.getAccountConnections(args.login);
                    break;
                case 'getAccountIssues':
                    result = await platformApi.getAccountIssues(args.login);
                    break;
                case 'getAccountTriggers':
                    result = await platformApi.getAccountTriggers(args.login);
                    break;
                case 'getAccountTriggerStats':
                    result = await platformApi.getAccountTriggerStats(args.login, args.days || 30);
                    break;
                case 'getAverageTradeTime':
                    result = await platformApi.getAverageTradeTime(args.login, args.days || 30);
                    break;
                case 'getTriggersSettings':
                    result = await platformApi.getTriggersSettings();
                    break;
                case 'getTriggersActivity':
                    result = await platformApi.getTriggersActivity();
                    break;
                case 'getABookSettings':
                    result = await platformApi.getABookSettings(args.login);
                    break;
                case 'getAccountJournal':
                    result = await platformApi.getAccountJournal(args.login);
                    break;
                case 'getAccountExposure':
                    result = await platformApi.getAccountExposure(args.login);
                    break;
                case 'getNetSummary':
                    result = await platformApi.getNetSummary();
                    break;
                case 'getAllOpenPositions':
                    result = await platformApi.getAllOpenPositions(args.pageSize || 100, args.pageNum || 1);
                    break;
                case 'getOpenPositionsSummary':
                    result = await platformApi.getOpenPositionsSummary();
                    break;
                case 'getTradeSessionSummary':
                    result = await platformApi.getTradeSessionSummary();
                    break;
                case 'getSessionPnLBySymbols':
                    result = await platformApi.getSessionPnLBySymbols(args.topN || 20);
                    break;
                case 'getWinnersLosers':
                    result = await platformApi.getWinnersLosers(args.top || 10, args.node || null);
                    break;
                case 'getActiveIssues':
                    result = await platformApi.getActiveIssues();
                    break;
                case 'getTriggerEventsHistory':
                    result = await platformApi.getTriggerEventsHistory(args.days || 7, args.triggerTypes || null);
                    break;
                case 'getNodesInfo':
                    result = await platformApi.getNodesInfo();
                    break;
                default:
                    logger.warn('Unknown function', { functionName });
                    return { error: `Unknown function: ${functionName}` };
            }
            
            return { result };
        } catch (error) {
            logger.logError(error, { context: 'Executing platform function', functionName, tenantId });
            return { error: error.message };
        }
    }

    /**
     * Execute scanner functions locally
     */
    async executeLocalScannerFunction(functionName, args) {
        const arbitrageScannerService = require('./arbitrage-scanner.service');
        const schedulerService = require('./scheduler.service');

        try {
            let result;

            switch (functionName) {
                case 'runArbitrageScan':
                    result = await schedulerService.triggerScan();
                    if (result.alert) {
                        return { result: { message: result.alert.message, data: result.alert.data } };
                    }
                    return { result };

                case 'checkWatchlist':
                    result = await arbitrageScannerService.checkWatchlist();
                    if (result.alert) {
                        return { result: { message: result.alert.message, data: result } };
                    }
                    return { result };

                case 'getWatchlist':
                    const watchlist = arbitrageScannerService.getWatchlist();
                    let summary = `рџ“‹ **Watchlist (${watchlist.length} СЃС‡РµС‚РѕРІ)**\n\n`;
                    if (watchlist.length === 0) {
                        summary += 'РЎРїРёСЃРѕРє РїСѓСЃС‚. РџРѕРґРѕР·СЂРёС‚РµР»СЊРЅС‹Рµ СЃС‡РµС‚Р° Р±СѓРґСѓС‚ РґРѕР±Р°РІР»РµРЅС‹ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё РїСЂРё СЃРєР°РЅРёСЂРѕРІР°РЅРёРё.';
                    } else {
                        for (const acc of watchlist) {
                            summary += `вЂў **${acc.login}** вЂ” Risk: ${acc.riskScore}/10 (РґРѕР±Р°РІР»РµРЅ: ${acc.reason})\n`;
                        }
                    }
                    return { result: { watchlist, summary } };

                case 'getScannerStatus':
                    result = schedulerService.getStatus();
                    let statusSummary = `рџ”Ќ **РЎС‚Р°С‚СѓСЃ СЃРєР°РЅРµСЂР°**\n\n`;
                    statusSummary += `вЂў Р’РєР»СЋС‡РµРЅ: ${result.enabled ? 'Р”Р°' : 'РќРµС‚'}\n`;
                    statusSummary += `вЂў РРЅРёС†РёР°Р»РёР·РёСЂРѕРІР°РЅ: ${result.initialized ? 'Р”Р°' : 'РќРµС‚'}\n`;
                    if (result.tasks) {
                        for (const [name, task] of Object.entries(result.tasks)) {
                            statusSummary += `вЂў ${name}: СЃР»РµРґСѓСЋС‰РёР№ Р·Р°РїСѓСЃРє ${new Date(task.nextRun).toLocaleString('ru-RU')}\n`;
                        }
                    }
                    statusSummary += `вЂў Watchlist: ${result.scannerStatus?.getWatchlistCount || arbitrageScannerService.getWatchlistCount()} СЃС‡РµС‚РѕРІ`;
                    return { result: { ...result, summary: statusSummary } };

                case 'analyzeAccountForArbitrage':
                    result = await arbitrageScannerService.analyzeSpecificAccount(args.login);
                    return { result };

                case 'addToWatchlist':
                    arbitrageScannerService.addToWatchlist(args.login, 0, 'manual');
                    return { result: { success: true, summary: `вњ… РЎС‡РµС‚ ${args.login} РґРѕР±Р°РІР»РµРЅ РІ Watchlist` } };

                case 'removeFromWatchlist':
                    const removed = arbitrageScannerService.removeFromWatchlist(args.login);
                    return { 
                        result: { 
                            success: removed, 
                            summary: removed ? `вњ… РЎС‡РµС‚ ${args.login} СѓРґР°Р»РµРЅ РёР· Watchlist` : `вќЊ РЎС‡РµС‚ ${args.login} РЅРµ РЅР°Р№РґРµРЅ РІ Watchlist`
                        } 
                    };

                default:
                    return { error: `Unknown scanner function: ${functionName}` };
            }
        } catch (error) {
            logger.error('Scanner function execution failed', { function: functionName, error: error.message });
            return { error: error.message };
        }
    }

    /**
     * Generate response after function execution
     */
    async generateResponseWithFunctionResult(userMessage, functionCall, functionResult) {
        const actualResult = functionResult.result || functionResult;
        const optimizedResult = this._optimizeResultForAI(actualResult);
        try {
            const userLanguage = this.detectLanguage(userMessage);
            const allowedPersonalFields = fieldFilter.getAllowedFields();
            const personalFieldsInstruction = allowedPersonalFields.length > 0
                ? `Allowed personal fields for this broker: ${allowedPersonalFields.join(', ')}.\nIf these fields exist in function response, include them in the answer.\nIf allowed fields are enabled but values are missing in returned records, explain that source data for current selection does not include those values.\nDo NOT claim that personal fields are disabled in this case.`
                : 'Allowed personal fields for this broker: none. Only in this case you may say personal fields are disabled for this broker.';
            
            const languageInstruction = `**вљ пёЏ MANDATORY: You MUST respond ONLY in ${userLanguage}. Translate all field names and descriptions.**\n\n`;
            
            let formatInstruction = languageInstruction;
            formatInstruction += `${personalFieldsInstruction}\n\n`;
            if (functionCall.name === 'analyzeAccount') {
                formatInstruction += `CRITICAL for analyzeAccount:
You received account data. DO NOT just list the data! You MUST ANALYZE:

1. TRADER'S STRATEGY:
   - What trading style? (scalping/intraday/swing/position)
   - Which instruments does the trader prefer?
   - Is there a directional bias (long/short)?

2. RISK ASSESSMENT:
   - How aggressive is the trading?
   - What is the margin level?
   - Are there signs of dangerous behavior?

3. PLATFORM RECOMMENDATIONS (REQUIRED!):
   - A-Book or B-Book - what's better for this account and WHY
   - Which triggers to configure for monitoring
   - Is special control needed

DO NOT just copy summary - give ANALYTICAL answer with conclusions!
Respond in ${userLanguage}.`;
            } else {
                formatInstruction += `IMPORTANT:
1. If function result has "summary" field, show its content to user FULLY.
2. NEVER say "information not provided" if there's summary - just show the summary!
3. If asked about balance/leverage/equity - this info IS ALREADY IN SUMMARY.
4. Don't abbreviate to "there are N accounts: 1, 2, 3" - show ALL information.
5. Respond in ${userLanguage}. Do not use emoji.
6. в›” NEVER USE MARKDOWN TABLES! No | or |---| syntax! Use bullet points instead:
   вЂў **Label:** value
   вЂў **Item** (details): value
7. For lists of data (IP addresses, CID connections, exposure), format as:
   **IP Connections:**
   вЂў **ServerName** (Platform): demo-mt5-node
    вЂў **ServerName** (Platform): demo-ctrader-node
8. For country questions, if function result contains countryDataStatus:
    - countryDataStatus = "disabled_by_config" в†’ say personal fields are not configured.
    - countryDataStatus = "missing_in_source" в†’ say country is enabled but missing in source data for current records.
    - countryDataStatus = "available" and byCountry has items в†’ provide ranking in descending order.
9. NEVER invent explanations about permissions, extra integrations, or external mapping dictionaries unless function result explicitly states that.`;
            }
            
            const requestBody = {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: formatInstruction + '\n\nUser question: ' + userMessage }]
                    },
                    {
                        role: 'model',
                        parts: [{ functionCall: functionCall }]
                    },
                    {
                        role: 'function',
                        parts: [{
                            functionResponse: {
                                name: functionCall.name,
                                response: { name: functionCall.name, content: optimizedResult }
                            }
                        }]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                    candidateCount: 1,
                }
            };

            if (this.functionDeclarations && this.functionDeclarations.length > 0) {
                requestBody.tools = [{ function_declarations: this.functionDeclarations }];
            }

            const data = await this._callGeminiApi(requestBody, {
                requestType: 'generateResponseWithFunctionResult',
                tenantId: DEFAULT_TENANT,
            });
            
            if (!data.candidates || !data.candidates[0]) {
                return JSON.stringify(optimizedResult, null, 2);
            }

            const text = data.candidates[0].content?.parts?.[0]?.text;
            if (!text) {
                return JSON.stringify(optimizedResult, null, 2);
            }

            return text;

        } catch (error) {
            logger.logError(error, { context: 'Generating response with function result' });
            const actualResult = functionResult.result || functionResult;
            if (actualResult.summary) {
                return actualResult.summary;
            }
            return JSON.stringify(this._optimizeResultForAI(actualResult), null, 2);
        }
    }

    /**
     * Optimize function result for AI processing
     */
    _optimizeResultForAI(result) {
        if (!result || typeof result !== 'object') {
            return result;
        }

        const maxPreservedArrayItems = parseInt(process.env.AI_OPTIMIZE_MAX_ITEMS, 10) || 50;
        const preserveLargeArrays = new Set([
            'positions', 'winners', 'losers', 'symbols', 'records',
            'orders', 'trades', 'events', 'entries', 'journal', 'exposure',
            'accounts', 'rates'
        ]);

        const optimized = {};

        if (result.summary) optimized.summary = result.summary;
        if (result.count !== undefined) optimized.count = result.count;
        if (result.total !== undefined) optimized.total = result.total;
        if (result.totalCount !== undefined) optimized.totalCount = result.totalCount;
        if (result.positionsCount !== undefined) optimized.positionsCount = result.positionsCount;
        if (result.message) optimized.message = result.message;
        if (result.error) optimized.error = result.error;
        
        if (result.byNode) optimized.byNode = result.byNode;
        if (result.byAccount) optimized.byAccount = result.byAccount;
        if (result.byTriggerType) optimized.byTriggerType = result.byTriggerType;
        if (result.byCountry) optimized.byCountry = result.byCountry;
        if (result.byPlatform) optimized.byPlatform = result.byPlatform;

        for (const [key, value] of Object.entries(result)) {
            if (['summary', 'count', 'total', 'totalCount', 'positionsCount', 'message', 'error',
                 'byNode', 'byAccount', 'byTriggerType', 'byCountry', 'byPlatform'].includes(key)) {
                continue;
            }

            if (Array.isArray(value) && preserveLargeArrays.has(key)) {
                optimized[key] = value.slice(0, maxPreservedArrayItems);
                if (value.length > maxPreservedArrayItems) {
                    optimized[`${key}Count`] = value.length;
                    optimized[`${key}Truncated`] = true;
                }
                continue;
            }
            
            if (Array.isArray(value) && value.length > 10) {
                optimized[`${key}Count`] = value.length;
                continue;
            }
            
            if (key === 'account' && typeof value === 'object') {
                optimized.account = value;
                continue;
            }
            
            if (['raw', 'accounts', 'orders', 'events', 'profiles',
                 'commissions', 'operations', 'sentiments'].includes(key)) {
                if (Array.isArray(value)) {
                    if (value.length <= 10) {
                        optimized[key] = value;
                    } else {
                        optimized[`${key}Count`] = value.length;
                    }
                }
                continue;
            }

            if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
                optimized[key] = value;
            } else if (Array.isArray(value) && value.length <= 10) {
                optimized[key] = value;
            } else if (typeof value === 'object' && value !== null) {
                const keys = Object.keys(value);
                if (keys.length <= 20) {
                    optimized[key] = value;
                }
            }
        }

        if (Object.keys(optimized).length === 0) {
            return result;
        }

        return optimized;
    }

    /**
     * Get service status
     */
    getStatus() {
        const retryConfig = this._getRetryConfig();
        return {
            initialized: this.initialized,
            hasApiKey: !!this.apiKey,
            model: this.model,
            maxRetries: retryConfig.maxRetries,
            requestTimeoutMs: this.requestTimeoutMs,
        };
    }

    /**
     * Generate a short, descriptive chat title from user's first message
     * Uses Gemini to extract key entities and create a concise title
     */
    async generateChatTitle(userMessage) {
        if (!this.initialized) {
            logger.warn('Gemini not initialized, using fallback title generation');
            return this.generateFallbackTitle(userMessage);
        }

        try {
            const titlePrompt = `Analyze this user message and generate a short, concise chat title (3-7 words max).

RULES:
1. Extract key entities: product name, feature name, account number, action
2. Use the same language as the user's message (Russian or English)
3. Prioritize important words from the beginning of the message
4. The title should help the user quickly find this chat later
5. DO NOT include generic words like "question", "help", "issue"
6. Return ONLY the title, nothing else

EXAMPLES:
- "Р Р°СЃСЃРєР°Р¶Рё РїСЂРѕ С‚СЂРёРіРіРµСЂ achieved profit" в†’ "РўСЂРёРіРіРµСЂ Achieved Profit"
- "What is A-Book routing?" в†’ "A-Book Routing"
- "РџРѕРєР°Р¶Рё РґРµС‚Р°Р»Рё СЃС‡С‘С‚Р° 12345" в†’ "РЎС‡С‘С‚ 12345"
- "How to configure latency arbitrage trigger?" в†’ "Latency Arbitrage Setup"
- "Р§С‚Рѕ С‚Р°РєРѕРµ Net Summary?" в†’ "Net Summary"
- "Hello, I need help with Platform" в†’ "Platform Help"
- "РљР°Рє РЅР°СЃС‚СЂРѕРёС‚СЊ СЌРєСЃРїРѕР·РёС†РёСЋ?" в†’ "РќР°СЃС‚СЂРѕР№РєР° СЌРєСЃРїРѕР·РёС†РёРё"

User message: ${userMessage}

Title:`;

            const data = await this._callGeminiApi(
                {
                    contents: [{ role: 'user', parts: [{ text: titlePrompt }] }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 50,
                        topP: 0.8,
                    },
                },
                {
                    requestType: 'generateChatTitle',
                    tenantId: DEFAULT_TENANT,
                }
            );
            let title = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

            if (!title || title.length > 60 || title.length < 2) {
                return this.generateFallbackTitle(userMessage);
            }

            // Clean up title - remove quotes, extra punctuation
            title = title.replace(/^["'"]|["'"]$/g, '').trim();
            
            logger.info('Generated chat title', { originalLength: userMessage.length, title });
            return title;

        } catch (error) {
            logger.warn('Error generating chat title', { error: error.message });
            return this.generateFallbackTitle(userMessage);
        }
    }

    /**
     * Fallback title generation without AI
     */
    generateFallbackTitle(userMessage) {
        // Remove common greetings
        let cleaned = userMessage
            .replace(/^(РїСЂРёРІРµС‚|Р·РґСЂР°РІСЃС‚РІСѓР№(С‚Рµ)?|РґРѕР±СЂС‹Р№ (РґРµРЅСЊ|РІРµС‡РµСЂ|СѓС‚СЂРѕ)|hello|hi|hey|good (morning|afternoon|evening))[,!.\s]*/i, '')
            .trim();
        
        if (!cleaned) {
            cleaned = userMessage;
        }

        // Truncate to ~50 chars at word boundary
        if (cleaned.length > 50) {
            const truncated = cleaned.substring(0, 47);
            const lastSpace = truncated.lastIndexOf(' ');
            cleaned = lastSpace > 20 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
        }

        return cleaned || 'РќРѕРІС‹Р№ С‡Р°С‚';
    }
}

module.exports = new GeminiService();



