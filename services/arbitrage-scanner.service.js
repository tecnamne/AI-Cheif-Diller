/**
 * Arbitrage Scanner Service
 * Proactive detection of arbitrage/cheating patterns in trading
 * 
 * ARCHITECTURE:
 * - Uses platform API service for data access (via WebSocket Gateway)
 * - SchedulerService runs scans at configured times
 * - Results are queued as alerts via alert.service.js
 */

const logger = require('../utils/logger');
const platformApi = require('./platform-api.service');
const internalAiWarnTagService = require('./internal-ai-warn-tag.service');

// For backwards compatibility - single tenant
function getConfiguredTenants() {
    return ['default'];
}

function getPlatformUrl(tenantId = 'default') {
    return 'WebSocket Gateway';
}

class ArbitrageScannerService {
    /**
     * Create scanner for a specific tenant
     * @param {string} tenantId - Tenant identifier
     */
    constructor(tenantId = 'default') {
        this.tenantId = tenantId.toLowerCase();
        this.platformServiceUrl = getPlatformUrl(this.tenantId);
        this.isRunning = false;
        this.lastScanTime = null;
        this.lastScanResults = [];
        this.alerts = [];
        this.watchlist = new Map(); // login -> { addedAt, reason, lastCheck, riskScore }
        
        // Configuration
        this.config = {
            enabled: process.env.SCANNER_ENABLED !== 'false',
            intervalSeconds: Math.max(30, (parseInt(process.env.SCANNER_INTERVAL_MINUTES) || 5) * 60),
            // Scanning sources
            topWinnersCount: parseInt(process.env.SCANNER_TOP_WINNERS) || 100,
            topByTradesCount: parseInt(process.env.SCANNER_TOP_TRADES) || 50,
            newAccountsCount: parseInt(process.env.SCANNER_NEW_ACCOUNTS) || 100,
            newAccountDays: parseInt(process.env.SCANNER_NEW_ACCOUNT_DAYS) || 7,
            lookbackDays: parseInt(process.env.SCANNER_LOOKBACK_DAYS) || 7,
            sourceTopWinnersEnabled: process.env.SCANNER_ALERTS_TOP_WINNERS_ENABLED !== 'false',
            sourceTopByTradeCountEnabled: process.env.SCANNER_ALERTS_TOP_BY_TRADE_COUNT_ENABLED !== 'false',
            sourceNewAccountsEnabled: process.env.SCANNER_ALERTS_NEW_ACCOUNTS_ENABLED !== 'false',
            // Deep analysis
            concurrency: parseInt(process.env.SCANNER_CONCURRENCY) || 5,  // Parallel API requests
            // Risk thresholds
            confirmedArbitrageScore: 8,  // Score >= 8 = confirmed arbitrage
            suspiciousScore: 5,          // Score 5-7 = suspicious, add to watchlist
            // Node exclusion (comma-separated, case-insensitive)
            excludeNodes: (process.env.SCANNER_EXCLUDE_NODES || '').split(',').map(n => n.trim().toLowerCase()).filter(Boolean),
        };
        
        // Pattern thresholds (tuned based on real arbitrageur CSV analysis)
        this.thresholds = {
            highWinRate: {
                rate: 90,           // Win rate >= 90% is highly suspicious
                minTrades: 10,      // Need at least 10 trades
            },
            lockPattern: {
                timeWindowMs: 20000, // 20 seconds between buy and sell
            },
            shortTrades: {
                avgDurationMinutes: 120,
                minAvgProfit: 0.5,
                maxAvgProfit: 5,
            },
            tpClosure: {
                rate: 90,           // >= 90% closed by TP
            },
            singleSymbol: {
                concentration: 80,  // >= 80% trades on single symbol
            },
            smallProfits: {
                maxProfitPerTrade: 3,
                minConsistency: 80,
            },
            syntheticCrossSymbol: {
                timeWindowMs: 20000,
                minPairs: 4,
                minCombinedPositiveRate: 40,
                strongPairs: 10,
                strongCombinedPositiveRate: 55,
            }
        };
        
        logger.info('ArbitrageScannerService initialized', { 
            tenantId: this.tenantId,
            platformServiceUrl: this.platformServiceUrl
        });
    }

    /**
     * Update runtime scanner settings without process restart.
     */
    applyRuntimeSettings(settings = {}) {
        if (!settings || typeof settings !== 'object') {
            return;
        }

        const lists = settings.lists || {};

        if (typeof settings.scanner_enabled === 'boolean') {
            this.config.enabled = settings.scanner_enabled;
        }

        if (Number.isInteger(settings.interval_seconds)) {
            this.config.intervalSeconds = Math.max(30, Math.min(86400, settings.interval_seconds));
        }

        if (typeof lists.top_winners === 'boolean') {
            this.config.sourceTopWinnersEnabled = lists.top_winners;
        }

        if (typeof lists.top_by_trade_count === 'boolean') {
            this.config.sourceTopByTradeCountEnabled = lists.top_by_trade_count;
        }

        if (typeof lists.new_accounts === 'boolean') {
            this.config.sourceNewAccountsEnabled = lists.new_accounts;
        }
    }

    /**
     * Normalize node name for robust comparisons.
     * Example: "MT5-Demo", "Demo MT5", "demo_mt5" -> token-comparable values.
     */
    _normalizeNodeName(nodeName) {
        return String(nodeName || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();
    }

    /**
     * Check whether a node matches any excluded node pattern.
     * Matching is token-based and order-insensitive:
     * "MT5-Demo" should match "Demo MT5".
     */
    _isExcludedNode(nodeName) {
        if (!nodeName || this.config.excludeNodes.length === 0) {
            return false;
        }

        const normalizedNode = this._normalizeNodeName(nodeName);
        if (!normalizedNode) {
            return false;
        }

        const compactNode = normalizedNode.replace(/\s+/g, '');

        return this.config.excludeNodes.some((excluded) => {
            const normalizedExcluded = this._normalizeNodeName(excluded);
            if (!normalizedExcluded) {
                return false;
            }

            const compactExcluded = normalizedExcluded.replace(/\s+/g, '');
            if (compactNode.includes(compactExcluded)) {
                return true;
            }

            const tokens = normalizedExcluded.split(' ').filter(Boolean);
            return tokens.length > 0 && tokens.every((token) => compactNode.includes(token));
        });
    }

    /**
     * Get tenant information
     */
    getTenantInfo() {
        return {
            tenantId: this.tenantId,
            platformServiceUrl: this.platformServiceUrl
        };
    }

    /**
     * Execute a function via platform API service (WebSocket Gateway)
     */
    async executeFunction(functionName, parameters = {}) {
        try {
            logger.info(`Scanner: Calling ${functionName} via Gateway`, { parameters });
            
            // Map function names to platform API methods
            let result;
            switch (functionName) {
                case 'getWinnersLosers':
                    result = await platformApi.getWinnersLosers(parameters.top || 100);
                    // Extract Result from response
                    return result?.Result || result;
                    
                case 'getAccountTrades':
                    result = await platformApi.getAccountTrades(
                        parameters.login,
                        parameters.startDate,
                        parameters.endDate
                    );
                    return result?.Result || result;
                    
                case 'getAccountDetails':
                    result = await platformApi.getAccountDetails(parameters.login);
                    return result?.Result || result;
                    
                default:
                    logger.warn(`Scanner: Unknown function ${functionName}`);
                    return null;
            }
        } catch (error) {
            logger.error(`Scanner: Failed to execute ${functionName}`, { 
                error: error.message,
                parameters
            });
            return null;
        }
    }

    /**
     * Main scan function - runs the complete detection pipeline
     */
    /**
     * Process items in batches with concurrency control
     * @param {Array} items - Items to process
     * @param {Function} fn - Async function to apply to each item
     * @param {number} concurrency - Max parallel executions
     * @returns {Array} Results in same order as items
     */
    async _runWithConcurrency(items, fn, concurrency) {
        const results = new Array(items.length);
        let nextIndex = 0;

        async function worker() {
            while (nextIndex < items.length) {
                const idx = nextIndex++;
                try {
                    results[idx] = await fn(items[idx], idx);
                } catch (err) {
                    results[idx] = null;
                }
            }
        }

        const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
        await Promise.all(workers);
        return results;
    }

    async runScan() {
        if (this.isRunning) {
            logger.warn('Scanner: Scan already in progress, skipping');
            return { status: 'skipped', reason: 'Already running' };
        }

        if (!this.config.enabled) {
            logger.info('Scanner: Disabled by runtime settings, skipping');
            return { status: 'disabled', reason: 'Scanner disabled by settings' };
        }

        this.isRunning = true;
        const startTime = Date.now();
        logger.info('рџ”Ќ Scanner: Starting comprehensive arbitrage scan...');

        try {
            // в”Ђв”Ђ Step 1: Collect accounts from multiple sources в”Ђв”Ђ
            const accountsToScan = await this.collectAccountsFromAllSources();

            if (accountsToScan.size === 0) {
                logger.warn('Scanner: No accounts found to analyze - generating empty alert');
                const emptyAlert = this.generateScanAlert([], [], 0, {
                    accountsWithTrades: 0,
                    analyzedDeep: 0,
                    analyzedQuick: 0,
                });
                if (emptyAlert) this.alerts.push(emptyAlert);
                this.lastScanTime = new Date();
                return { status: 'completed', confirmed: [], suspicious: [], alert: emptyAlert };
            }

            const accountsList = [...accountsToScan.entries()]; // [[login, info], ...]
            logger.info(`Scanner: Will deep-analyze ${accountsList.length} accounts (concurrency: ${this.config.concurrency})...`);

            // в”Ђв”Ђ Step 2: Fetch trade history for ALL accounts (concurrent) в”Ђв”Ђ
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - this.config.lookbackDays * 24 * 60 * 60 * 1000)
                .toISOString().split('T')[0];

            let fetchedCount = 0;
            const tradesMap = new Map(); // login -> trades[]

            await this._runWithConcurrency(
                accountsList,
                async ([login, _info], idx) => {
                    try {
                        const result = await this.executeFunction('getAccountTrades', {
                            login,
                            startDate,
                            endDate
                        });

                        let trades = [];
                        if (result && result.trades) {
                            trades = result.trades;
                        } else if (Array.isArray(result)) {
                            trades = result;
                        }

                        // Filter out non-trade records
                        trades = trades.filter(t =>
                            t.Symbol && t.Symbol !== '' &&
                            t.TicketType !== 'BalanceOrder' &&
                            t.Cmd !== 'Charge' &&
                            t.Cmd !== 'Credit' &&
                            t.Cmd !== 'Balance'
                        );

                        tradesMap.set(login, trades);
                    } catch (err) {
                        tradesMap.set(login, []);
                    }

                    fetchedCount++;
                    if (fetchedCount % 25 === 0 || fetchedCount === accountsList.length) {
                        logger.info(`Scanner: Fetched trades ${fetchedCount}/${accountsList.length}`);
                    }
                },
                this.config.concurrency
            );

            const fetchDuration = ((Date.now() - startTime) / 1000).toFixed(1);
            const accountsWithTrades = [...tradesMap.values()].filter(t => t.length >= 10).length;
            logger.info(`Scanner: Trade history fetched in ${fetchDuration}s. Accounts with в‰Ґ10 trades: ${accountsWithTrades}`);

            // в”Ђв”Ђ Step 3: Deep analysis for accounts with enough trades в”Ђв”Ђ
            const confirmedArbitrage = [];
            const suspiciousAccounts = [];
            let analyzedDeepCount = 0;
            let analyzedQuickCount = 0;

            for (const [login, accountInfo] of accountsList) {
                const trades = tradesMap.get(login) || [];

                let analysis = null;

                if (trades.length >= 10) {
                    // в”Ђ DEEP analysis with real trade data в”Ђ
                    analysis = this._analyzeTradesDeep(login, accountInfo, trades);
                    analyzedDeepCount++;

                    // Add metadata bonus points from Quick Mode
                    const metaBonus = this._getMetadataBonus(accountInfo);
                    if (metaBonus > 0 && analysis) {
                        analysis.riskScore = Math.min(10, analysis.riskScore + metaBonus);
                        analysis.patterns.push({
                            name: 'metadataBonus',
                            score: metaBonus,
                            description: `Metadata indicators: +${metaBonus} points`,
                            details: { bonus: metaBonus }
                        });
                    }
                } else {
                    // в”Ђ Quick fallback for accounts without trade history в”Ђ
                    analysis = await this.analyzeAccount(accountInfo);
                    analyzedQuickCount++;
                }

                if (analysis && analysis.riskScore >= this.config.confirmedArbitrageScore) {
                    if (this._isArbitrageConfirmedCandidate(analysis)) {
                        confirmedArbitrage.push(analysis);
                        logger.warn(`Scanner: CONFIRMED arbitrage`, {
                            login, riskScore: analysis.riskScore,
                            patterns: analysis.patterns.map(p => p.name),
                            source: accountInfo._source,
                            analysisType: trades.length >= 10 ? 'deep' : 'quick'
                        });
                    } else {
                        suspiciousAccounts.push(analysis);
                        this.addToWatchlist(login, analysis.riskScore, 'high_risk_non_arbitrage', { node: analysis.node });
                        logger.info(`Scanner: High-risk account downgraded to suspicious (no arbitrage anchor patterns)`, {
                            login,
                            riskScore: analysis.riskScore,
                            patterns: analysis.patterns.map(p => p.name),
                            avgDurationMin: analysis.tradesSummary?.avgDurationMin || null,
                        });
                    }
                } else if (analysis && analysis.riskScore >= this.config.suspiciousScore) {
                    suspiciousAccounts.push(analysis);
                    this.addToWatchlist(login, analysis.riskScore, 'auto_detected', { node: analysis.node });
                    logger.info(`Scanner: Suspicious account`, {
                        login, riskScore: analysis.riskScore,
                        patterns: analysis.patterns.map(p => p.name)
                    });
                }
            }

            // Auto-link scanner accounts with AI warn tag once (idempotent by account tag check)
            await this._assignAiWarnTagToScannerAccounts(confirmedArbitrage, suspiciousAccounts);

            // в”Ђв”Ђ Step 4: Generate alert в”Ђв”Ђ
            const scanAlert = this.generateScanAlert(confirmedArbitrage, suspiciousAccounts, accountsToScan.size, {
                accountsWithTrades,
                analyzedDeep: analyzedDeepCount,
                analyzedQuick: analyzedQuickCount,
            });
            if (scanAlert) {
                this.alerts.push(scanAlert);
            }

            if (this.alerts.length > 50) {
                this.alerts = this.alerts.slice(-50);
            }

            this.lastScanTime = new Date();
            this.lastScanResults = { confirmed: confirmedArbitrage, suspicious: suspiciousAccounts };

            const duration = ((Date.now() - startTime) / 1000).toFixed(1);
            logger.info(`вњ… Scanner: Scan completed in ${duration}s`, {
                tenantId: this.tenantId,
                accountsTotal: accountsToScan.size,
                analyzedDeep: analyzedDeepCount,
                analyzedQuick: analyzedQuickCount,
                confirmed: confirmedArbitrage.length,
                suspicious: suspiciousAccounts.length
            });

            return {
                status: 'completed',
                tenantId: this.tenantId,
                duration: `${duration}s`,
                accountsAnalyzed: accountsToScan.size,
                analyzedDeep: analyzedDeepCount,
                analyzedQuick: analyzedQuickCount,
                confirmed: confirmedArbitrage,
                suspicious: suspiciousAccounts,
                watchlistCount: this.watchlist.size,
                alert: scanAlert
            };

        } catch (error) {
            logger.error('Scanner: Scan failed', { error: error.message });
            return { status: 'error', error: error.message };
        } finally {
            this.isRunning = false;
        }
    }

    async _assignAiWarnTagToScannerAccounts(confirmed, suspicious) {
        const logins = new Set();

        for (const account of confirmed || []) {
            const login = Number(account?.login);
            if (Number.isFinite(login)) {
                logins.add(login);
            }
        }

        for (const account of suspicious || []) {
            const login = Number(account?.login);
            if (Number.isFinite(login)) {
                logins.add(login);
            }
        }

        if (logins.size === 0) {
            return;
        }

        for (const login of logins) {
            try {
                const result = await internalAiWarnTagService.markAssigned(login, {
                    source: 'scanner',
                    reason: 'scanner_alert',
                    detectedAt: new Date(),
                });
                if (result?.assigned) {
                    logger.info('Scanner: Internal AI warn tag assigned to account', { login });
                }
            } catch (error) {
                logger.warn('Scanner: Failed to assign internal AI warn tag', { login, error: error.message });
            }
        }
    }

    /**
     * Synchronous deep trade analysis (trades already fetched)
     * Runs ALL pattern checks on provided trades array
     */
    _analyzeTradesDeep(login, accountInfo, trades) {
        const patterns = [];
        let totalRiskScore = 0;

        // 1. Win Rate
        const winRateResult = this.checkWinRate(trades);
        if (winRateResult) { patterns.push(winRateResult); totalRiskScore += winRateResult.score; }

        // 2. Lock Pattern (simultaneous buy+sell)
        const lockResult = this.checkLockPattern(trades);
        if (lockResult) { patterns.push(lockResult); totalRiskScore += lockResult.score; }

        // 2.5 Cross-symbol synthetic lock (e.g., BTCUSD + BTCJPY)
        const syntheticCrossResult = this.checkCrossSymbolSyntheticPattern(trades);
        if (syntheticCrossResult) { patterns.push(syntheticCrossResult); totalRiskScore += syntheticCrossResult.score; }

        // 3. Short Profitable Trades
        const shortResult = this.checkShortProfitableTrades(trades);
        if (shortResult) { patterns.push(shortResult); totalRiskScore += shortResult.score; }

        // 4. TP Closure Rate
        const tpResult = this.checkTPClosureRate(trades);
        if (tpResult) { patterns.push(tpResult); totalRiskScore += tpResult.score; }

        // 5. Single Symbol Concentration
        const symbolResult = this.checkSingleSymbolConcentration(trades);
        if (symbolResult) { patterns.push(symbolResult); totalRiskScore += symbolResult.score; }

        // 6. Small Consistent Profits
        const smallProfitResult = this.checkSmallConsistentProfits(trades);
        if (smallProfitResult) { patterns.push(smallProfitResult); totalRiskScore += smallProfitResult.score; }

        if (patterns.length === 0) return null;

        const riskScore = this._calculateCompositeRisk(patterns);

        const tradesSummary = this.summarizeTrades(trades);
        const result = {
            login,
            node: accountInfo.Node || 'Unknown',
            group: accountInfo.Group || 'Unknown',
            platform: accountInfo.Platform || 'Unknown',
            totalProfit: Number(tradesSummary.totalProfit || accountInfo.SessionProfitInUsd || accountInfo.Profit || 0),
            balance: (accountInfo.BalanceInUsd || 0),
            tradesCount: trades.length,
            patterns,
            riskScore,
            deepAnalysis: true,
            tradesSummary,
            analyzedAt: new Date().toISOString()
        };

        return result;
    }

    /**
     * Calculate bonus risk points from account metadata (balance, leverage, profit ratios)
     * Returns 0-3 bonus points that get added to the deep analysis score
     */
    _getMetadataBonus(accountInfo) {
        let bonus = 0;
        const sessionProfit = accountInfo.SessionProfitInUsd || 0;
        const balance = accountInfo.BalanceInUsd || 0;
        const leverage = accountInfo.Leverage || 100;
        const actualLeverage = accountInfo.ActualLeverage || 0;
        const drawdown = accountInfo.Drawdown || 0;

        // High profit/balance ratio
        if (balance > 0 && sessionProfit > 0) {
            const profitRatio = (sessionProfit / balance) * 100;
            if (profitRatio > 20) bonus += 1;
        }
        // Max leverage actively used
        if (leverage >= 500 && actualLeverage > 5) bonus += 1;
        // Zero drawdown with profits
        if (sessionProfit > 1000 && drawdown === 0) bonus += 1;

        return Math.min(3, bonus);
    }

    /**
     * Normalize symbol by removing separators/suffixes and uppercasing.
     */
    _normalizeSymbol(symbol) {
        return String(symbol || '')
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '');
    }

    _tradeProfit(trade) {
        const candidates = [
            trade?.Profit,
            trade?.ProfitInUsd,
            trade?.ProfitUSD,
            trade?.ProfitUsd,
            trade?.ClosedProfit,
            trade?.ClosedProfitInUsd,
            trade?.Pnl,
            trade?.PnL,
        ];

        for (const value of candidates) {
            const parsed = Number(value);
            if (Number.isFinite(parsed)) {
                return parsed;
            }
        }

        return 0;
    }

    /**
     * Parse FX-like symbol into base/quote from first 6 alpha chars.
     * Examples: EURUSD.ecn -> EUR/USD, BTCJPY -> BTC/JPY
     */
    _parseFxLikeSymbol(symbol) {
        const normalized = this._normalizeSymbol(symbol).replace(/[^A-Z]/g, '');
        if (normalized.length < 6) return null;

        return {
            base: normalized.slice(0, 3),
            quote: normalized.slice(3, 6),
            normalized,
        };
    }

    /**
     * Check if two commands are opposite directions (Buy vs Sell).
     */
    _isOppositeDirections(cmdA, cmdB) {
        const a = String(cmdA || '').toLowerCase();
        const b = String(cmdB || '').toLowerCase();
        return (a === 'buy' && b === 'sell') || (a === 'sell' && b === 'buy');
    }

    /**
     * Detect synthetic USD/JPY exposure via two different symbols sharing base.
     * Example: BTCUSD + BTCJPY opened in opposite directions almost simultaneously.
     */
    _isUsdJpySyntheticPair(symbolA, symbolB) {
        const a = this._parseFxLikeSymbol(symbolA);
        const b = this._parseFxLikeSymbol(symbolB);
        if (!a || !b) return false;
        if (a.base !== b.base) return false;

        const quotes = new Set([a.quote, b.quote]);
        return quotes.has('USD') && quotes.has('JPY');
    }

    /**
     * Calculate composite risk score from detected patterns.
     */
    _calculateCompositeRisk(patterns) {
        const keyPatterns = ['highWinRate', 'lockPattern', 'smallConsistentProfits', 'highTPRate', 'crossSymbolSyntheticLock'];
        const foundKeyPatterns = patterns.filter(p => keyPatterns.includes(p.name));
        const hasSecondary = patterns.some(p => ['singleSymbolConcentration', 'shortProfitableTrades'].includes(p.name));
        const secondaryCount = patterns.filter(p => ['singleSymbolConcentration', 'shortProfitableTrades'].includes(p.name)).length;
        const totalRiskScore = patterns.reduce((sum, p) => sum + (p.score || 0), 0);

        let riskScore;
        if (foundKeyPatterns.length >= 2) {
            // Keep score monotonic by total evidence; extra patterns can raise confidence but not overinflate weak sums.
            riskScore = Math.min(10, 5 + Math.floor(totalRiskScore / 2));
            if (foundKeyPatterns.length >= 3 && totalRiskScore >= 8) {
                riskScore = Math.min(10, riskScore + 1);
            }
            if (secondaryCount >= 2 && totalRiskScore >= 9) {
                riskScore = Math.min(10, riskScore + 1);
            }
        } else if (foundKeyPatterns.length === 1 && hasSecondary) {
            riskScore = Math.min(10, 5 + Math.floor(totalRiskScore / 2));
        } else if (foundKeyPatterns.length === 1) {
            riskScore = Math.min(7, 4 + foundKeyPatterns[0].score);
        } else {
            riskScore = Math.min(4, patterns.length + 1);
        }

        // Strong synthetic cross-symbol signal can be upgraded directly to confirmed.
        const syntheticPattern = patterns.find(p => p.name === 'crossSymbolSyntheticLock');
        if (syntheticPattern && syntheticPattern.details) {
            const pairCount = Number(syntheticPattern.details.pairCount || 0);
            const combinedPositiveRate = Number(syntheticPattern.details.combinedPositiveRate || 0);

            if (
                pairCount >= this.thresholds.syntheticCrossSymbol.strongPairs &&
                combinedPositiveRate >= this.thresholds.syntheticCrossSymbol.strongCombinedPositiveRate
            ) {
                riskScore = Math.max(riskScore, this.config.confirmedArbitrageScore);
            }
        }

        return Math.round(Math.min(10, riskScore));
    }

    _isArbitrageConfirmedCandidate(account) {
        const patterns = Array.isArray(account?.patterns) ? account.patterns : [];
        const names = new Set(patterns.map((p) => p?.name).filter(Boolean));

        // Hard evidence of arbitrage mechanics.
        if (names.has('lockPattern') || names.has('crossSymbolSyntheticLock')) {
            return true;
        }

        // Soft evidence requires short holding horizon to avoid long-term strategy false positives.
        const avgDurationMin = Number(account?.tradesSummary?.avgDurationMin || 0);
        const hasShortHorizon = avgDurationMin > 0 && avgDurationMin <= this.thresholds.shortTrades.avgDurationMinutes;
        const hasShortPattern = names.has('shortProfitableTrades');
        const hasSupportivePattern = names.has('highWinRate') || names.has('smallConsistentProfits') || names.has('highTPRate');

        return hasShortHorizon && hasShortPattern && hasSupportivePattern;
    }

    /**
     * Convert risk score and status to compact severity level.
     */
    _getSeverity(riskScore, status) {
        if (status === 'confirmed' || riskScore >= this.config.confirmedArbitrageScore) {
            return 'high';
        }
        if (riskScore >= this.config.suspiciousScore) {
            return 'medium';
        }
        return 'low';
    }

    /**
     * Build operator action checklist based on risk level.
     */
    _buildOperatorActions(riskScore, status) {
        if (status === 'confirmed' || riskScore >= this.config.confirmedArbitrageScore) {
            return [
                'Run manual trade-history review for mirrored entries/exits',
                'Consider moving account flow to A-Book',
                'Configure Latency Arbitrage trigger for follow-up monitoring'
            ];
        }

        return [
            'Keep account on watchlist and review next scanner cycle',
            'Validate execution timestamps and symbol exposure manually',
            'Escalate to dealing team if risk score grows'
        ];
    }

    /**
     * Convert pattern details into user-facing evidence list.
     */
    _buildSignalEvidence(details) {
        if (!details || typeof details !== 'object') {
            return [];
        }

        const toLabel = (key) =>
            String(key)
                .replace(/([A-Z])/g, ' $1')
                .replace(/[_-]+/g, ' ')
                .trim()
                .replace(/^./, (c) => c.toUpperCase());

        const evidence = [];

        for (const [rawKey, value] of Object.entries(details)) {
            if (value === null || value === undefined || value === '') {
                continue;
            }

            const key = toLabel(rawKey);

            if (Array.isArray(value)) {
                if (value.length === 0) continue;
                const rendered = value.slice(0, 3).map((item) => String(item)).join(', ');
                evidence.push(`${key}: ${rendered}${value.length > 3 ? ', ...' : ''}`);
                continue;
            }

            if (typeof value === 'object') {
                const compact = JSON.stringify(value);
                evidence.push(`${key}: ${compact.length > 120 ? `${compact.slice(0, 117)}...` : compact}`);
                continue;
            }

            evidence.push(`${key}: ${String(value)}`);
        }

        return evidence;
    }

    /**
     * Normalize summary fields for consistent explainable payload.
     */
    _normalizeTradeStats(account) {
        const summary = account.tradesSummary || {};

        const parseNum = (value) => {
            const parsed = Number(value);
            return Number.isFinite(parsed) ? parsed : 0;
        };

        return {
            totalTrades: parseNum(summary.totalTrades || account.tradesCount || 0),
            winRate: parseNum(summary.winRate || 0),
            totalProfit: parseNum(summary.totalProfit || summary.sessionProfit || account.totalProfit || 0),
            avgDurationMin: parseNum(summary.avgDurationMin || 0),
            topSymbols: Array.isArray(summary.topSymbols) ? summary.topSymbols : [],
            totalVolume: parseNum(summary.totalVolume || 0),
            profitableTrades: parseNum(summary.profitableTrades || 0),
        };
    }

    /**
     * Build explainable account payload used by Alerts UI.
     */
    _buildExplainableAccount(account, status) {
        const patterns = Array.isArray(account.patterns) ? account.patterns : [];
        const totalPatternScore = patterns.reduce((sum, pattern) => sum + Number(pattern.score || 0), 0);

        const signals = patterns.map((pattern) => {
            const score = Number(pattern.score || 0);
            const contribution = totalPatternScore > 0 ? Math.round((score / totalPatternScore) * 100) : 0;

            return {
                name: pattern.name || 'unknownPattern',
                description: pattern.description || pattern.name || 'Pattern detected',
                score,
                contribution,
                evidence: this._buildSignalEvidence(pattern.details || {}),
                details: pattern.details || {},
            };
        });

        const topSignals = signals.slice(0, 2).map((signal) => signal.description);
        const shortReason = topSignals.length > 0
            ? topSignals.join('; ')
            : `Risk score ${account.riskScore}/10 above threshold`;

        const tradeStats = this._normalizeTradeStats(account);
        const severity = this._getSeverity(account.riskScore, status);

        return {
            alertAccountId: `${status}_${account.login}`,
            accountLogin: String(account.login),
            status,
            detectedAt: account.analyzedAt || new Date().toISOString(),
            riskScore: Number(account.riskScore || 0),
            severity,
            shortReason,
            topSignals,
            explanationSummary: `${status === 'confirmed' ? 'Confirmed risk' : 'Suspicious behavior'}: ${shortReason}`,
            node: account.node || 'Unknown',
            group: account.group || 'Unknown',
            platform: account.platform || 'Unknown',
            signals,
            tradeStats,
            actions: this._buildOperatorActions(Number(account.riskScore || 0), status),
            meta: {
                scannerVersion: 'explainable-alerts-v1',
                rulesVersion: 'heuristics-v1',
                lookbackDays: this.config.lookbackDays,
                analysisType: account.deepAnalysis ? 'deep' : 'quick'
            }
        };
    }

    /**
     * Build flattened explainable accounts list for one scan alert.
     */
    _buildExplainableAccounts(confirmed, suspicious) {
        const accounts = [];

        for (const account of confirmed) {
            accounts.push(this._buildExplainableAccount(account, 'confirmed'));
        }

        for (const account of suspicious) {
            accounts.push(this._buildExplainableAccount(account, 'suspicious'));
        }

        return accounts;
    }

    /**
     * Generate comprehensive alert message for chat bot (English)
     */
    generateScanAlert(confirmed, suspicious, totalScanned, analysisStats = {}) {
        const timestamp = new Date().toISOString();
        const explainableAccounts = this._buildExplainableAccounts(confirmed, suspicious);
        const toCount = (value) => {
            const parsed = Number(value);
            return Number.isFinite(parsed) ? parsed : 0;
        };
        const accountsWithTrades = toCount(analysisStats.accountsWithTrades);
        const analyzedDeep = toCount(analysisStats.analyzedDeep);
        const analyzedQuick = toCount(analysisStats.analyzedQuick);
        
        let message = `рџ”Ќ **SCAN RESULTS**\n`;
        message += `рџ“… ${new Date().toLocaleString('en-US')}\n`;
        message += `рџ“Љ Accounts scanned: ${totalScanned}`;
        if (analyzedDeep > 0) {
            message += ` (deep analysis with trade history)`;
        }
        message += `\nрџ§Є Analysis split: deep ${analyzedDeep}, quick ${analyzedQuick}, eligible (>=10 trades): ${accountsWithTrades}`;
        message += `\n\n`;

        // If no accounts scanned - diagnostic message
        if (totalScanned === 0) {
            message += `вљ пёЏ **Failed to retrieve account data**\n`;
            message += `Possible reasons:\n`;
            message += `вЂў Platform service unavailable\n`;
            message += `вЂў No active trading accounts\n`;
            message += `вЂў API connection error\n\n`;
            message += `Check server logs for details.\n`;
        } else if (confirmed.length > 0) {
            // Confirmed arbitrage section
            message += `рџљЁ **CONFIRMED ARBITRAGE (${confirmed.length} accounts):**\n\n`;
            
            for (const acc of confirmed) {
                const tradeStats = this._normalizeTradeStats(acc);
                const sessionProfit = tradeStats.totalProfit;
                message += `**Account ${acc.login}** вЂ” Risk: ${acc.riskScore}/10\n`;
                message += `в”њ Node: ${acc.node} | Group: ${acc.group}\n`;
                message += `в”њ Session profit: $${sessionProfit.toLocaleString()}\n`;
                message += `в”њ Patterns:\n`;
                for (const p of acc.patterns) {
                    message += `в”‚  вЂў ${p.description}\n`;
                }
                message += `в”” **Recommendation:** Move to A-Book / Configure trigger\n\n`;
            }
        } else {
            message += `вњ… **No confirmed arbitrage detected**\n\n`;
        }

        // Suspicious accounts section
        if (suspicious.length > 0) {
            message += `вљ пёЏ **SUSPICIOUS ACCOUNTS (${suspicious.length}):**\n`;
            message += `_Added to Watchlist for monitoring_\n\n`;
            
            for (const acc of suspicious.slice(0, 10)) { // Show max 10
                const tradeStats = this._normalizeTradeStats(acc);
                const sessionProfit = tradeStats.totalProfit;
                message += `вЂў **${acc.login}** вЂ” Risk: ${acc.riskScore}/10 | $${sessionProfit.toLocaleString()}`;
                if (acc.patterns.length > 0) {
                    message += ` (${acc.patterns[0].name})`;
                }
                message += `\n`;
            }
            
            if (suspicious.length > 10) {
                message += `_...and ${suspicious.length - 10} more accounts_\n`;
            }
        }

        // Summary
        message += `\n---\n`;
        message += `рџ“‹ Watchlist: ${this.watchlist.size} accounts under monitoring`;

        return {
            id: `scan_${Date.now()}`,
            type: 'scan_result',
            timestamp,
            message,
            data: {
                confirmedCount: confirmed.length,
                suspiciousCount: suspicious.length,
                totalScanned,
                analyzedDeep,
                analyzedQuick,
                accountsWithTrades,
                confirmed: confirmed.map(a => a.login),
                suspicious: suspicious.map(a => a.login),
                explainableAccounts
            }
        };
    }

    /**
     * Check all accounts in watchlist
     */
    async checkWatchlist() {
        if (this.watchlist.size === 0) {
            return {
                status: 'empty',
                message: 'Watchlist is empty. Suspicious accounts will be added automatically during the next scan.'
            };
        }

        logger.info(`Scanner: Checking watchlist (${this.watchlist.size} accounts)...`);
        
        const results = [];
        const upgraded = [];    // Became arbitrageurs (risk >= 8)
        const stillSuspicious = []; // Still suspicious
        const cleared = [];     // Cleared (risk < 5)

        for (const [login, info] of this.watchlist) {
            if (this._isExcludedNode(info.node || info.Node)) {
                logger.info(`Scanner: Removing watchlist account ${login} from excluded node`, {
                    node: info.node || info.Node
                });
                this.watchlist.delete(login);
                cleared.push({ login, previousScore: info.riskScore, newScore: 0, reason: 'excluded_node' });
                continue;
            }

            const analysis = await this.analyzeSpecificAccount(login);

            if (analysis.status === 'excluded_node') {
                this.watchlist.delete(login);
                cleared.push({ login, previousScore: info.riskScore, newScore: 0, reason: 'excluded_node' });
                continue;
            }
            
            if (analysis.status === 'analyzed') {
                const newScore = analysis.riskScore;
                const oldScore = info.riskScore;

                if (newScore >= this.config.confirmedArbitrageScore) {
                    upgraded.push({ ...analysis, previousScore: oldScore });
                    // Generate individual alert
                    const alert = await this.generateAlert(analysis);
                    if (alert) this.alerts.push(alert);
                } else if (newScore >= this.config.suspiciousScore) {
                    stillSuspicious.push({ ...analysis, previousScore: oldScore });
                    // Update watchlist entry
                    this.watchlist.set(login, {
                        ...info,
                        riskScore: newScore,
                        lastCheck: new Date().toISOString()
                    });
                } else {
                    cleared.push({ login, previousScore: oldScore, newScore });
                    // Remove from watchlist
                    this.watchlist.delete(login);
                }
                
                results.push(analysis);
            }
        }

        await this._assignAiWarnTagToScannerAccounts(upgraded, stillSuspicious);

        // Generate watchlist check alert
        const alert = this.generateWatchlistAlert(upgraded, stillSuspicious, cleared);

        return {
            status: 'completed',
            checkedCount: results.length,
            upgraded,
            stillSuspicious,
            cleared,
            alert
        };
    }

    /**
     * Generate alert for watchlist check (English)
     */
    generateWatchlistAlert(upgraded, stillSuspicious, cleared) {
        let message = `рџ“‹ **WATCHLIST CHECK**\n`;
        message += `рџ“… ${new Date().toLocaleString('en-US')}\n\n`;

        if (upgraded.length > 0) {
            message += `рџљЁ **CONFIRMED ARBITRAGE (${upgraded.length}):**\n`;
            for (const acc of upgraded) {
                message += `вЂў **${acc.login}** вЂ” Risk: ${acc.previousScore}в†’**${acc.riskScore}**/10\n`;
                message += `  Recommendation: Move to A-Book\n`;
            }
            message += `\n`;
        }

        if (stillSuspicious.length > 0) {
            message += `вљ пёЏ **STILL UNDER MONITORING (${stillSuspicious.length}):**\n`;
            for (const acc of stillSuspicious.slice(0, 5)) {
                const trend = acc.riskScore > acc.previousScore ? 'рџ“€' : 
                              acc.riskScore < acc.previousScore ? 'рџ“‰' : 'вћЎпёЏ';
                message += `вЂў ${acc.login}: ${acc.previousScore}в†’${acc.riskScore} ${trend}\n`;
            }
            if (stillSuspicious.length > 5) {
                message += `  _...and ${stillSuspicious.length - 5} more_\n`;
            }
            message += `\n`;
        }

        if (cleared.length > 0) {
            message += `вњ… **REMOVED FROM WATCHLIST (${cleared.length}):**\n`;
            for (const acc of cleared.slice(0, 5)) {
                message += `вЂў ${acc.login}: risk reduced to ${acc.newScore}\n`;
            }
            message += `\n`;
        }

        if (upgraded.length === 0 && stillSuspicious.length === 0 && cleared.length === 0) {
            message += `в„№пёЏ Watchlist is empty\n`;
        }

        message += `\nрџ“Љ Total in Watchlist: ${this.watchlist.size} accounts`;

        return {
            id: `watchlist_${Date.now()}`,
            type: 'watchlist_check',
            timestamp: new Date().toISOString(),
            message,
            data: {
                upgradedCount: upgraded.length,
                stillSuspiciousCount: stillSuspicious.length,
                clearedCount: cleared.length
            }
        };
    }

    /**
     * Collect accounts from all sources (deduplicated)
     */
    async collectAccountsFromAllSources() {
        const allAccounts = new Map(); // login -> accountInfo (deduplication)
        
        logger.info('Scanner: Collecting accounts from multiple sources...');

        // Source 1: Top Winners (by profit)
        if (this.config.sourceTopWinnersEnabled) {
            try {
                const winners = await this.getTopWinners();
                for (const acc of winners) {
                    if (acc.Login) {
                        acc._source = 'top_winners';
                        allAccounts.set(acc.Login, acc);
                    }
                }
                logger.info(`Scanner: Source 'top_winners': ${winners.length} accounts`);
            } catch (error) {
                logger.error('Scanner: Failed to get top winners', { error: error.message });
            }
        } else {
            logger.info("Scanner: Skipping source 'top_winners' (disabled by settings)");
        }

        // Source 2: Top by Trade Count (active traders)
        if (this.config.sourceTopByTradeCountEnabled) {
            try {
                const activeTraders = await this.getTopByTradeCount();
                for (const acc of activeTraders) {
                    if (acc.Login && !allAccounts.has(acc.Login)) {
                        acc._source = 'top_trades';
                        allAccounts.set(acc.Login, acc);
                    }
                }
                logger.info(`Scanner: Source 'top_trades': ${activeTraders.length} accounts`);
            } catch (error) {
                logger.error('Scanner: Failed to get top by trades', { error: error.message });
            }
        } else {
            logger.info("Scanner: Skipping source 'top_trades' (disabled by settings)");
        }

        // Source 3: New Accounts (recently created)
        if (this.config.sourceNewAccountsEnabled) {
            try {
                const newAccounts = await this.getNewAccounts();
                for (const acc of newAccounts) {
                    if (acc.Login && !allAccounts.has(acc.Login)) {
                        acc._source = 'new_accounts';
                        allAccounts.set(acc.Login, acc);
                    }
                }
                logger.info(`Scanner: Source 'new_accounts': ${newAccounts.length} accounts`);
            } catch (error) {
                logger.error('Scanner: Failed to get new accounts', { error: error.message });
            }
        } else {
            logger.info("Scanner: Skipping source 'new_accounts' (disabled by settings)");
        }

        // Source 4: Watchlist (previously flagged accounts)
        for (const [login, info] of this.watchlist) {
            if (!allAccounts.has(login)) {
                allAccounts.set(login, { 
                    Login: login, 
                    _source: 'watchlist',
                    Node: info.node || info.Node || 'Unknown',
                    Group: 'Unknown'
                });
            }
        }
        if (this.watchlist.size > 0) {
            logger.info(`Scanner: Source 'watchlist': ${this.watchlist.size} accounts`);
        }

        logger.info(`Scanner: Total unique accounts to scan: ${allAccounts.size}`);

        // Filter out excluded nodes (e.g. demo servers)
        if (this.config.excludeNodes.length > 0) {
            const before = allAccounts.size;
            for (const [login, acc] of allAccounts) {
                const node = acc.Node || acc._node || acc.node || acc.Server || acc.ServerName || '';
                if (this._isExcludedNode(node)) {
                    allAccounts.delete(login);
                }
            }
            const excluded = before - allAccounts.size;
            if (excluded > 0) {
                logger.info(`Scanner: Excluded ${excluded} accounts from nodes: ${this.config.excludeNodes.join(', ')}`);
            }
        }

        return allAccounts;
    }

    /**
     * Get top winning accounts from platform source
     */
    async getTopWinners() {
        const result = await this.executeFunction('getWinnersLosers', { 
            top: this.config.topWinnersCount 
        });
        
        // Result can be in various formats from backend
        // Format 1: { Winners: [...], Losers: [...] }
        // Format 2: { Result: { Winners: [...] } }
        // Format 3: [ { Winners: [...] } ]
        let winners = [];
        
        if (!result) {
            logger.warn('Scanner: getWinnersLosers returned null');
            return [];
        }
        
        // Check direct Winners property
        if (result.Winners && Array.isArray(result.Winners)) {
            winners = result.Winners;
        }
        // Check nested Result.Winners
        else if (result.Result && result.Result.Winners) {
            winners = result.Result.Winners;
        }
        // Check lowercase winners (from old format)
        else if (result.winners && Array.isArray(result.winners)) {
            winners = result.winners;
        }
        // If Result is array of node results
        else if (Array.isArray(result) && result[0]?.Winners) {
            winners = result[0].Winners;
        }
        // If Result itself is array (might be direct winners list)
        else if (Array.isArray(result)) {
            winners = result;
        }
        
        if (winners.length === 0) {
            logger.warn('Scanner: getWinnersLosers returned no winners', { 
                resultKeys: Object.keys(result || {}),
                resultType: typeof result
            });
            return [];
        }

        logger.info(`Scanner: Got ${winners.length} winners from API`);
        
        // Return all winners with valid logins (they're already sorted by profit)
        const filtered = winners.filter(w => w.Login && w.Login > 0);
        logger.info(`Scanner: After filtering: ${filtered.length} accounts with valid logins`);
        
        return filtered;
    }

    /**
     * Get accounts with most trades in current session (high activity)
     * Uses RequestTradeSessionRealizedOrders to find high-frequency traders
     */
    async getTopByTradeCount() {
        try {
            const result = await platformApi.getTradeSessionRealizedOrders(500);

            if (!result || !result.Result) {
                logger.warn('Scanner: getTradeSessionRealizedOrders returned no data');
                return [];
            }

            // Extract orders from response (handles multi-node format)
            const orders = platformApi._extractResults(result);

            // Filter out non-trade records (balance operations, credits, etc.)
            const realTrades = orders.filter(o =>
                o.Symbol && o.Symbol !== '' &&
                o.TicketType !== 'BalanceOrder' &&
                o.Cmd !== 'Charge' &&
                o.Cmd !== 'Credit'
            );

            // Group by Login and count trades
            const accountTrades = new Map();
            for (const order of realTrades) {
                const login = order.Login;
                if (!login || login <= 0) continue;

                if (!accountTrades.has(login)) {
                    accountTrades.set(login, {
                        Login: login,
                        _tradeCount: 0,
                        _totalProfit: 0,
                        Node: order._node || order.Node,
                        Group: order.Group
                    });
                }
                const acc = accountTrades.get(login);
                acc._tradeCount++;
                acc._totalProfit += (order.Profit || 0);
            }

            // Sort by trade count descending and take top N
            const sorted = [...accountTrades.values()]
                .sort((a, b) => b._tradeCount - a._tradeCount)
                .slice(0, this.config.topByTradesCount);

            logger.info(`Scanner: Got ${sorted.length} top traders by trade count (from ${realTrades.length} session orders)`);
            return sorted;
        } catch (error) {
            logger.error('Scanner: Failed to get top by trade count', { error: error.message });
            return [];
        }
    }

    /**
     * Get accounts with open positions (active traders)
     * Uses RequestOpenPositions to find currently active accounts
     * that may not appear in winners/losers (new or small accounts)
     */
    async getNewAccounts() {
        try {
            const result = await platformApi.getAllOpenPositions(500);

            if (!result || !result.positions || result.positions.length === 0) {
                logger.warn('Scanner: getAllOpenPositions returned no data');
                return [];
            }

            // Group positions by Login
            const accountMap = new Map();
            for (const pos of result.positions) {
                const login = pos.Login;
                if (!login || login <= 0) continue;

                if (!accountMap.has(login)) {
                    accountMap.set(login, {
                        Login: login,
                        _positionCount: 0,
                        _totalVolume: 0,
                        Node: pos.node || pos.Node,
                        Group: pos.Group
                    });
                }
                const acc = accountMap.get(login);
                acc._positionCount++;
                acc._totalVolume += (pos.Volume || pos.Lots || 0);
            }

            // Sort by position count descending and take top N
            const sorted = [...accountMap.values()]
                .sort((a, b) => b._positionCount - a._positionCount)
                .slice(0, this.config.newAccountsCount);

            logger.info(`Scanner: Got ${sorted.length} active accounts from open positions (${result.positions.length} total positions)`);
            return sorted;
        } catch (error) {
            logger.error('Scanner: Failed to get accounts from open positions', { error: error.message });
            return [];
        }
    }

    /**
     * Add account to watchlist for monitoring
     */
    addToWatchlist(login, riskScore = 0, reason = 'manual', meta = {}) {
        const loginNum = parseInt(login);
        const node = meta.node || meta.Node || null;

        this.watchlist.set(loginNum, {
            addedAt: new Date().toISOString(),
            reason,
            riskScore,
            lastCheck: null,
            ...(node && { node })
        });
        logger.info(`Scanner: Account ${login} added to watchlist`, { reason, riskScore, node });
        return true;
    }

    /**
     * Remove account from watchlist
     */
    removeFromWatchlist(login) {
        const removed = this.watchlist.delete(parseInt(login));
        if (removed) {
            logger.info(`Scanner: Account ${login} removed from watchlist`);
        }
        return removed;
    }

    /**
     * Get current watchlist with details
     */
    getWatchlist() {
        const list = [];
        for (const [login, info] of this.watchlist) {
            list.push({
                login,
                ...info
            });
        }
        return list.sort((a, b) => b.riskScore - a.riskScore);
    }

    /**
     * Get watchlist count
     */
    getWatchlistCount() {
        return this.watchlist.size;
    }

    /**
     * Analyze a single account for arbitrage patterns
     */
    async analyzeAccount(accountInfo) {
        const login = accountInfo.Login;
        
        // QUICK MODE: Analyze based on available data without extra API calls
        // Full analysis would require getAccountTrades which is too slow for batch scanning
        
        const patterns = [];
        let totalRiskScore = 0;

        // Analyze based on account statistics from winners/losers data
        const sessionProfit = accountInfo.SessionProfitInUsd || 0;
        const balance = accountInfo.BalanceInUsd || 0;
        const equity = accountInfo.EquityInUsd || 0;
        const realizedProfit = accountInfo.TotalRealizedProfitInUsd || accountInfo.RealizedProfit || 0;
        const sessionTrades = accountInfo.SessionTotalVolumeInLots || 0;
        const leverage = accountInfo.Leverage || 100;
        const actualLeverage = accountInfo.ActualLeverage || 0;
        
        logger.info(`Scanner: Analyzing ${login}`, { 
            sessionProfit, balance, leverage, actualLeverage, 
            drawdown: accountInfo.Drawdown,
            group: accountInfo.Group 
        });
        
        // Pattern 1: Extremely high profit relative to balance (potential arbitrage)
        if (balance > 0 && sessionProfit > 0) {
            const profitRatio = (sessionProfit / balance) * 100;
            if (profitRatio > 10) { // More than 10% daily profit
                patterns.push({
                    name: 'highProfitRatio',
                    score: profitRatio > 50 ? 4 : profitRatio > 20 ? 3 : 2,
                    description: `High daily profit: ${profitRatio.toFixed(1)}% of balance`,
                    details: { profitRatio: profitRatio.toFixed(1), sessionProfit, balance }
                });
                totalRiskScore += profitRatio > 50 ? 4 : profitRatio > 20 ? 3 : 2;
            }
        }

        // Pattern 2: Using maximum leverage (common for arbitrageurs)
        if (leverage >= 500 && actualLeverage > 5) {
            patterns.push({
                name: 'highLeverage',
                score: 2,
                description: `High leverage: 1:${leverage}, using ${actualLeverage.toFixed(1)}x`,
                details: { leverage, actualLeverage }
            });
            totalRiskScore += 2;
        }

        // Pattern 3: Demo account with huge profits (testing arbitrage?)
        const group = (accountInfo.Group || '').toLowerCase();
        if (group.includes('demo') && sessionProfit > 100000) {
            patterns.push({
                name: 'demoHighProfit',
                score: 3,
                description: `Demo account with high profit: $${sessionProfit.toLocaleString()}`,
                details: { group: accountInfo.Group, sessionProfit }
            });
            totalRiskScore += 3;
        }

        // Pattern 4: Zero drawdown with profits (too perfect)
        const drawdown = accountInfo.Drawdown || 0;
        if (sessionProfit > 1000 && drawdown === 0) {
            patterns.push({
                name: 'zeroDrawdown',
                score: 2,
                description: `Zero drawdown with profit $${sessionProfit.toLocaleString()}`,
                details: { drawdown, sessionProfit }
            });
            totalRiskScore += 2;
        }

        // Skip if no suspicious patterns found
        if (patterns.length === 0) {
            return null;
        }

        // Calculate final risk score
        const riskScore = Math.min(10, totalRiskScore);

        return {
            login,
            node: accountInfo.Node || 'Unknown',
            group: accountInfo.Group || 'Unknown',
            platform: accountInfo.Platform || 'Unknown',
            totalProfit: sessionProfit,
            balance: balance,
            tradesCount: sessionTrades,
            patterns,
            riskScore,
            tradesSummary: {
                sessionProfit,
                realizedProfit,
                equity,
                leverage
            },
            analyzedAt: new Date().toISOString()
        };
    }

    /**
     * Deep analysis for specific account (with full trade history)
     */
    async analyzeAccountDeep(accountInfo) {
        const login = accountInfo.Login;
        
        // Get trade history
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - this.config.lookbackDays * 24 * 60 * 60 * 1000)
            .toISOString().split('T')[0];
        
        const tradesResult = await this.executeFunction('getAccountTrades', {
            login,
            startDate,
            endDate
        });

        if (!tradesResult || !tradesResult.trades || tradesResult.trades.length < 10) {
            return null; // Not enough data
        }

        const trades = tradesResult.trades.filter(t => 
            t.Symbol && t.Symbol !== '' && 
            t.Cmd !== 'Balance' && t.Cmd !== 'Credit'
        );

        if (trades.length < 10) {
            logger.info(`Scanner Deep: Account ${login} has only ${trades.length} trades after filtering`);
            return null;
        }

        logger.info(`Scanner Deep: Analyzing ${login} with ${trades.length} trades`, {
            sampleTrade: trades[0] ? {
                Symbol: trades[0].Symbol,
                Cmd: trades[0].Cmd,
                OpenTime: trades[0].OpenTime,
                CloseTime: trades[0].CloseTime,
                Profit: trades[0].Profit,
                Comment: trades[0].Comment
            } : null
        });

        // Run pattern detection
        const patterns = [];
        let totalRiskScore = 0;

        // Check Win Rate
        const winRateResult = this.checkWinRate(trades);
        if (winRateResult) {
            patterns.push(winRateResult);
            totalRiskScore += winRateResult.score;
            logger.info(`Scanner Deep: ${login} - WIN RATE pattern detected`, winRateResult.details);
        }

        // Check Lock Pattern
        const lockResult = this.checkLockPattern(trades);
        if (lockResult) {
            patterns.push(lockResult);
            totalRiskScore += lockResult.score;
            logger.info(`Scanner Deep: ${login} - LOCK pattern detected`, lockResult.details);
        }

        // Check Cross-symbol synthetic lock pattern
        const syntheticCrossResult = this.checkCrossSymbolSyntheticPattern(trades);
        if (syntheticCrossResult) {
            patterns.push(syntheticCrossResult);
            totalRiskScore += syntheticCrossResult.score;
            logger.info(`Scanner Deep: ${login} - CROSS-SYMBOL SYNTHETIC pattern detected`, syntheticCrossResult.details);
        }

        // Check Short Profitable Trades
        const shortTradesResult = this.checkShortProfitableTrades(trades);
        if (shortTradesResult) {
            patterns.push(shortTradesResult);
            totalRiskScore += shortTradesResult.score;
            logger.info(`Scanner Deep: ${login} - SHORT TRADES pattern detected`, shortTradesResult.details);
        }

        // Check TP Closure Rate
        const tpResult = this.checkTPClosureRate(trades);
        if (tpResult) {
            patterns.push(tpResult);
            totalRiskScore += tpResult.score;
            logger.info(`Scanner Deep: ${login} - TP CLOSURE pattern detected`, tpResult.details);
        }

        // Check Single Symbol Concentration (real arbitrageur pattern)
        const symbolResult = this.checkSingleSymbolConcentration(trades);
        if (symbolResult) {
            patterns.push(symbolResult);
            totalRiskScore += symbolResult.score;
            logger.info(`Scanner Deep: ${login} - SINGLE SYMBOL pattern detected`, symbolResult.details);
        }

        // Check Small Consistent Profits (real arbitrageur pattern: $1-2.5)
        const smallProfitResult = this.checkSmallConsistentProfits(trades);
        if (smallProfitResult) {
            patterns.push(smallProfitResult);
            totalRiskScore += smallProfitResult.score;
            logger.info(`Scanner Deep: ${login} - SMALL PROFITS pattern detected`, smallProfitResult.details);
        }

        logger.info(`Scanner Deep: ${login} analysis complete`, {
            patternsFound: patterns.length,
            patternNames: patterns.map(p => p.name),
            totalRiskScore
        });

        const riskScore = this._calculateCompositeRisk(patterns);

        logger.info(`Scanner Deep: ${login} final score`, {
            keyPatternsFound: patterns.filter(p => ['highWinRate', 'lockPattern', 'smallConsistentProfits', 'highTPRate', 'crossSymbolSyntheticLock'].includes(p.name)).length,
            hasSecondary: patterns.some(p => ['singleSymbolConcentration', 'shortProfitableTrades'].includes(p.name)),
            riskScore
        });

        const tradesSummary = this.summarizeTrades(trades);
        return {
            login,
            node: accountInfo.Node || 'Unknown',
            group: accountInfo.Group || 'Unknown',
            platform: accountInfo.Platform || 'Unknown',
            totalProfit: Number(tradesSummary.totalProfit || accountInfo.SessionProfitInUsd || accountInfo.Profit || 0),
            tradesCount: trades.length,
            patterns,
            riskScore,
            tradesSummary,
            analyzedAt: new Date().toISOString()
        };
    }

    /**
     * Check for high win rate pattern
     * Only flags accounts that are actually profitable overall
     */
    checkWinRate(trades) {
        // Skip accounts that are losing money overall вЂ” high win rate with net loss
        // means many small wins and few large losses, not arbitrage
        const totalProfit = trades.reduce((sum, t) => sum + this._tradeProfit(t), 0);
        if (totalProfit <= 0) return null;

        const profitable = trades.filter(t => this._tradeProfit(t) > 0);
        const winRate = (profitable.length / trades.length) * 100;

        if (winRate >= this.thresholds.highWinRate.rate && 
            trades.length >= this.thresholds.highWinRate.minTrades) {
            return {
                name: 'highWinRate',
                score: winRate >= 95 ? 4 : 3,
                details: {
                    winRate: winRate.toFixed(1),
                    profitableTrades: profitable.length,
                    totalTrades: trades.length
                },
                description: `Win Rate ${winRate.toFixed(1)}% (normal range: 40-60%)`
            };
        }
        return null;
    }

    /**
     * Check for lock pattern (simultaneous buy+sell)
     */
    checkLockPattern(trades) {
        const lockPairs = [];
        
        // Sort by open time
        const sorted = [...trades].sort((a, b) => 
            new Date(a.OpenTime) - new Date(b.OpenTime)
        );

        for (let i = 0; i < sorted.length - 1; i++) {
            const current = sorted[i];
            const next = sorted[i + 1];

            // Check if same symbol
            if (current.Symbol !== next.Symbol) continue;

            // Check if opposite directions
            const isBuySell = (current.Cmd === 'Buy' && next.Cmd === 'Sell') ||
                             (current.Cmd === 'Sell' && next.Cmd === 'Buy');
            if (!isBuySell) continue;

            // Check time difference
            const timeDiff = Math.abs(
                new Date(next.OpenTime) - new Date(current.OpenTime)
            );

            if (timeDiff <= this.thresholds.lockPattern.timeWindowMs) {
                // Check if both profitable
                const bothProfitable = this._tradeProfit(current) > 0 && this._tradeProfit(next) > 0;
                
                lockPairs.push({
                    trade1: current.Ticket || current.Order,
                    trade2: next.Ticket || next.Order,
                    symbol: current.Symbol,
                    timeDiffMs: timeDiff,
                    bothProfitable
                });
            }
        }

        if (lockPairs.length >= 3) {
            const bothProfitableCount = lockPairs.filter(p => p.bothProfitable).length;
            return {
                name: 'lockPattern',
                score: bothProfitableCount >= 5 ? 5 : 4,
                details: {
                    lockPairsFound: lockPairs.length,
                    bothProfitable: bothProfitableCount,
                    examples: lockPairs.slice(0, 3).map(p => 
                        `${p.symbol}: ${p.timeDiffMs}ms apart`
                    )
                },
                description: `Detected ${lockPairs.length} lock pairs (Buy+Sell < 10 sec apart), ${bothProfitableCount} both profitable`
            };
        }
        return null;
    }

    /**
     * Check for cross-symbol synthetic lock pattern.
     * Targets synthetic USD/JPY exposure via same-base symbols, e.g. BTCUSD + BTCJPY.
     */
    checkCrossSymbolSyntheticPattern(trades) {
        const syntheticPairs = [];
        const usedIndexes = new Set();

        const sorted = [...trades].sort((a, b) =>
            new Date(a.OpenTime) - new Date(b.OpenTime)
        );

        for (let i = 0; i < sorted.length - 1; i++) {
            if (usedIndexes.has(i)) continue;
            const current = sorted[i];
            if (!current.OpenTime || !current.Symbol || !current.Cmd) continue;

            for (let j = i + 1; j < sorted.length; j++) {
                if (usedIndexes.has(j)) continue;
                const next = sorted[j];
                if (!next.OpenTime || !next.Symbol || !next.Cmd) continue;

                const timeDiff = Math.abs(new Date(next.OpenTime) - new Date(current.OpenTime));
                if (timeDiff > this.thresholds.syntheticCrossSymbol.timeWindowMs) {
                    break;
                }

                if (current.Symbol === next.Symbol) continue;
                if (!this._isOppositeDirections(current.Cmd, next.Cmd)) continue;
                if (!this._isUsdJpySyntheticPair(current.Symbol, next.Symbol)) continue;

                const combinedProfit = this._tradeProfit(current) + this._tradeProfit(next);
                syntheticPairs.push({
                    symbolA: current.Symbol,
                    symbolB: next.Symbol,
                    timeDiffMs: timeDiff,
                    combinedProfit,
                    bothProfitable: this._tradeProfit(current) > 0 && this._tradeProfit(next) > 0,
                });

                usedIndexes.add(i);
                usedIndexes.add(j);
                break;
            }
        }

        if (syntheticPairs.length < this.thresholds.syntheticCrossSymbol.minPairs) {
            return null;
        }

        const combinedPositiveCount = syntheticPairs.filter(p => p.combinedProfit > 0).length;
        const combinedPositiveRate = (combinedPositiveCount / syntheticPairs.length) * 100;

        if (combinedPositiveRate < this.thresholds.syntheticCrossSymbol.minCombinedPositiveRate) {
            return null;
        }

        let score = 3;
        if (syntheticPairs.length >= this.thresholds.syntheticCrossSymbol.strongPairs) {
            score = combinedPositiveRate >= this.thresholds.syntheticCrossSymbol.strongCombinedPositiveRate ? 5 : 4;
        } else if (syntheticPairs.length >= this.thresholds.syntheticCrossSymbol.minPairs + 2) {
            score = 4;
        }

        return {
            name: 'crossSymbolSyntheticLock',
            score,
            details: {
                pairCount: syntheticPairs.length,
                combinedPositiveCount,
                combinedPositiveRate: Number(combinedPositiveRate.toFixed(1)),
                examples: syntheticPairs.slice(0, 3).map(p => `${p.symbolA}+${p.symbolB}: ${p.timeDiffMs}ms`),
            },
            description: `Cross-symbol synthetic pairs: ${syntheticPairs.length} (USD/JPY synthetic exposure, ${combinedPositiveRate.toFixed(1)}% positive combined P&L)`
        };
    }

    /**
     * Check for short profitable trades pattern
     */
    checkShortProfitableTrades(trades) {
        // Calculate average duration
        let totalDurationMs = 0;
        let tradesWithDuration = 0;
        let totalProfit = 0;
        let profitableTrades = 0;

        for (const trade of trades) {
            if (trade.OpenTime && trade.CloseTime) {
                const duration = new Date(trade.CloseTime) - new Date(trade.OpenTime);
                if (duration > 0) {
                    totalDurationMs += duration;
                    tradesWithDuration++;
                }
            }
            
            const profit = this._tradeProfit(trade);
            totalProfit += profit;
            if (profit > 0) profitableTrades++;
        }

        if (tradesWithDuration < 10) return null;

        const avgDurationMin = (totalDurationMs / tradesWithDuration) / (1000 * 60);
        const avgProfit = totalProfit / trades.length;
        const winRate = (profitableTrades / trades.length) * 100;

        // Short trades + small consistent profit + high win rate = suspicious
        if (avgDurationMin < this.thresholds.shortTrades.avgDurationMinutes &&
            avgProfit > 0 &&
            avgProfit < this.thresholds.shortTrades.maxAvgProfit &&
            winRate >= 80) {
            return {
                name: 'shortProfitableTrades',
                score: 3,
                details: {
                    avgDurationMin: avgDurationMin.toFixed(1),
                    avgProfit: avgProfit.toFixed(2),
                    winRate: winRate.toFixed(1)
                },
                description: `Short trades (avg ${avgDurationMin.toFixed(0)} min) with consistent profit ($${avgProfit.toFixed(2)} avg)`
            };
        }
        return null;
    }

    /**
     * Check for high TP closure rate
     */
    checkTPClosureRate(trades) {
        const tpClosed = trades.filter(t => 
            t.Comment && t.Comment.toLowerCase().includes('tp')
        );

        const tpRate = (tpClosed.length / trades.length) * 100;

        if (tpRate >= this.thresholds.tpClosure.rate && trades.length >= 10) {
            return {
                name: 'highTPRate',
                score: tpRate >= 95 ? 3 : 2,
                details: {
                    tpRate: tpRate.toFixed(1),
                    tpClosed: tpClosed.length,
                    totalTrades: trades.length
                },
                description: `${tpRate.toFixed(1)}% of trades closed by TP (normal range: ~30-40%)`
            };
        }
        return null;
    }

    /**
     * Check for single symbol concentration (real arbitrageur pattern)
     * Real case: 100% trades on EURUSD only
     */
    checkSingleSymbolConcentration(trades) {
        const symbolCounts = {};
        for (const trade of trades) {
            if (trade.Symbol) {
                symbolCounts[trade.Symbol] = (symbolCounts[trade.Symbol] || 0) + 1;
            }
        }

        const symbols = Object.entries(symbolCounts);
        if (symbols.length === 0) return null;

        // Find dominant symbol
        symbols.sort((a, b) => b[1] - a[1]);
        const [topSymbol, topCount] = symbols[0];
        const concentration = (topCount / trades.length) * 100;

        if (concentration >= this.thresholds.singleSymbol.concentration && trades.length >= 10) {
            return {
                name: 'singleSymbolConcentration',
                score: concentration >= 95 ? 3 : 2,
                details: {
                    symbol: topSymbol,
                    concentration: concentration.toFixed(1),
                    tradesOnSymbol: topCount,
                    totalTrades: trades.length
                },
                description: `${concentration.toFixed(0)}% of trades on ${topSymbol} (typical for arbitrage)`
            };
        }
        return null;
    }

    /**
     * Check for small consistent profits (real arbitrageur pattern)
     * Real case: $1.05 - $2.40 per trade, all profitable
     */
    checkSmallConsistentProfits(trades) {
        const profitableTrades = trades.filter(t => this._tradeProfit(t) > 0);
        if (profitableTrades.length < 10) return null;

        const profits = profitableTrades.map(t => this._tradeProfit(t));
        const minProfit = Math.min(...profits);
        const maxProfit = Math.max(...profits);
        const avgProfit = profits.reduce((a, b) => a + b, 0) / profits.length;

        // Check if profits are small and consistent
        const smallProfits = profits.filter(p => 
            p >= this.thresholds.smallProfits.maxProfitPerTrade * 0.1 && 
            p <= this.thresholds.smallProfits.maxProfitPerTrade
        );
        const consistency = (smallProfits.length / profits.length) * 100;

        if (consistency >= this.thresholds.smallProfits.minConsistency && 
            avgProfit <= this.thresholds.smallProfits.maxProfitPerTrade) {
            return {
                name: 'smallConsistentProfits',
                score: consistency >= 90 ? 4 : 3,
                details: {
                    avgProfit: avgProfit.toFixed(2),
                    minProfit: minProfit.toFixed(2),
                    maxProfit: maxProfit.toFixed(2),
                    consistency: consistency.toFixed(1),
                    profitableTrades: profitableTrades.length
                },
                description: `Small consistent profits: avg $${avgProfit.toFixed(2)} (${consistency.toFixed(0)}% in $0.3-$3 range)`
            };
        }
        return null;
    }

    /**
     * Summarize trades for display
     */
    summarizeTrades(trades) {
        const profitable = trades.filter(t => this._tradeProfit(t) > 0);
        const totalProfit = trades.reduce((sum, t) => sum + this._tradeProfit(t), 0);
        const totalVolume = trades.reduce((sum, t) => sum + (t.Volume || t.Lots || 0), 0);
        
        // Calculate avg duration
        let totalDuration = 0;
        let count = 0;
        for (const t of trades) {
            if (t.OpenTime && t.CloseTime) {
                totalDuration += new Date(t.CloseTime) - new Date(t.OpenTime);
                count++;
            }
        }
        const avgDurationMin = count > 0 ? (totalDuration / count) / (1000 * 60) : 0;

        // Symbols breakdown
        const symbols = {};
        for (const t of trades) {
            symbols[t.Symbol] = (symbols[t.Symbol] || 0) + 1;
        }
        const topSymbols = Object.entries(symbols)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([s, c]) => `${s}:${c}`);

        return {
            totalTrades: trades.length,
            profitableTrades: profitable.length,
            winRate: ((profitable.length / trades.length) * 100).toFixed(1),
            totalProfit: totalProfit.toFixed(2),
            totalVolume: totalVolume.toFixed(2),
            avgDurationMin: avgDurationMin.toFixed(1),
            topSymbols
        };
    }

    /**
     * Generate alert message for suspicious account
     */
    async generateAlert(analysis) {
        const { login, node, group, patterns, riskScore, tradesSummary } = analysis;

        // Build alert message
        let message = `вљ пёЏ **ANOMALY DETECTED**\n\n`;
        message += `**Account:** ${login}\n`;
        message += `**Node:** ${node}\n`;
        message += `**Group:** ${group}\n`;
        message += `**Type:** Probable arbitrage\n\n`;
        
        message += `рџ“Љ **Statistics for the last ${this.config.lookbackDays} days:**\n`;
        message += `вЂў Trades: ${tradesSummary.totalTrades}\n`;
        message += `вЂў Win Rate: ${tradesSummary.winRate}%\n`;
        message += `вЂў Total P&L: $${tradesSummary.totalProfit}\n`;
        message += `вЂў Avg duration: ${tradesSummary.avgDurationMin} min\n`;
        message += `вЂў Volume: ${tradesSummary.totalVolume} lots\n`;
        message += `вЂў Top symbols: ${tradesSummary.topSymbols.join(', ')}\n\n`;

        message += `рџ”Ќ **Detected patterns:**\n`;
        for (const pattern of patterns) {
            message += `вЂў ${pattern.description}\n`;
        }

        message += `\nрџ’Ў **Recommendation:**\n`;
        if (riskScore >= 8) {
            message += `High probability of arbitrage. Recommended actions:\n`;
            message += `1. Manually review trade history\n`;
            message += `2. Consider moving to A-Book\n`;
            message += `3. Configure Latency Arbitrage trigger\n`;
        } else if (riskScore >= 6) {
            message += `Suspicious activity detected. Monitoring recommended.\n`;
        }

        message += `\n**Risk Score: ${riskScore}/10**`;

        return {
            id: `alert_${login}_${Date.now()}`,
            login,
            type: 'arbitrage',
            riskScore,
            message,
            patterns: patterns.map(p => p.name),
            createdAt: new Date().toISOString(),
            acknowledged: false
        };
    }

    /**
     * Get scanner status
     */
    getStatus() {
        return {
            enabled: this.config.enabled,
            isRunning: this.isRunning,
            lastScanTime: this.lastScanTime,
            lastScanResultsCount: this.lastScanResults.length,
            activeAlertsCount: this.alerts.filter(a => !a.acknowledged).length,
            config: this.config
        };
    }

    /**
     * Get active alerts
     */
    getAlerts(onlyUnacknowledged = false) {
        if (onlyUnacknowledged) {
            return this.alerts.filter(a => !a.acknowledged);
        }
        return this.alerts;
    }

    /**
     * Acknowledge an alert
     */
    acknowledgeAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.acknowledged = true;
            alert.acknowledgedAt = new Date().toISOString();
            return true;
        }
        return false;
    }

    /**
     * Get last scan results
     */
    getLastResults() {
        return {
            scanTime: this.lastScanTime,
            results: this.lastScanResults
        };
    }

    /**
     * Analyze a specific account (for manual testing) - uses DEEP analysis with trade history
     */
    async analyzeSpecificAccount(login) {
        logger.info(`Scanner: Deep analyzing specific account ${login}`);
        
        try {
            // Get real account info first
            const realInfo = await this.executeFunction('getAccountDetails', { login });
            const account = realInfo?.account || realInfo?.Account || realInfo || {};

            const resolvedNode = account.node || account.Node || 'Unknown';
            if (this._isExcludedNode(resolvedNode)) {
                return {
                    login,
                    status: 'excluded_node',
                    node: resolvedNode,
                    message: `Account ${login} belongs to excluded node ${resolvedNode}`,
                    riskScore: 0,
                    patterns: []
                };
            }
            
            const accountInfo = {
                Login: login,
                Node: resolvedNode,
                Group: account.group || account.Group || 'Unknown',
                Platform: account.platform || account.Platform || 'Unknown',
                BalanceInUsd: account.BalanceInUsd || account.balance || account.Balance || 0,
                SessionProfitInUsd: account.SessionProfitInUsd || account.sessionProfit || account.ProfitInUsd || 0,
                Leverage: account.leverage || account.Leverage || 100,
                ActualLeverage: account.ActualLeverage || account.actualLeverage || 0,
                Drawdown: account.Drawdown || account.drawdown || 0
            };

            // Run DEEP analysis with trade history
            const analysis = await this.analyzeAccountDeep(accountInfo);
            
            if (!analysis) {
                // Fallback to quick analysis if not enough trades
                const quickAnalysis = await this.analyzeAccount(accountInfo);
                if (quickAnalysis) {
                    return {
                        login,
                        status: 'analyzed',
                        analysisType: 'quick',
                        ...quickAnalysis
                    };
                }
                
                return {
                    login,
                    status: 'insufficient_data',
                    message: 'Insufficient data for analysis (fewer than 10 trades in last 7 days)',
                    riskScore: 0,
                    patterns: []
                };
            }

            // Generate alert if suspicious
            let alert = null;
            if (analysis.riskScore >= this.config.suspiciousScore) {
                alert = await this.generateAlert(analysis);
                this.alerts.push(alert);
            }

            return {
                login,
                status: 'analyzed',
                analysisType: 'deep',
                ...analysis,
                alert: alert
            };
        } catch (error) {
            logger.error(`Scanner: Failed to analyze account ${login}`, { error: error.message });
            return {
                login,
                status: 'error',
                error: error.message
            };
        }
    }
}

// Scanner instances cache (one per tenant)
const scannerInstances = new Map();

/**
 * Factory function to get or create scanner for a tenant
 */
function getScanner(tenantId = 'default') {
    const normalized = (tenantId || 'default').toLowerCase();
    
    if (!scannerInstances.has(normalized)) {
        scannerInstances.set(normalized, new ArbitrageScannerService(normalized));
    }
    
    return scannerInstances.get(normalized);
}

/**
 * Create a new scanner instance (for testing or one-time use)
 */
function createScanner(tenantId = 'default') {
    return new ArbitrageScannerService(tenantId);
}

// Export factory functions and utilities
module.exports = {
    getScanner,           // Get cached scanner for tenant
    createScanner,        // Create new scanner instance  
    getConfiguredTenants, // Get list of all configured tenants
    getPlatformUrl,    // Get URL for a tenant
    ArbitrageScannerService // Class for testing
};



