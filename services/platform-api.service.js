/**
 * Platform API Client Service
 * Executes requests via direct WebSocket connection to Backend Master
 * 
 * NO AUTHENTICATION REQUIRED - connects directly to backend master
 */

const gatewayService = require('./gateway.service');
const fieldFilter = require('./field-filter.service');
const logger = require('../utils/logger');

const AI_WARN_TAG_NAME = 'AI warn';
const AI_WARN_TEMPLATE_ID = 'red-light';
const AI_WARN_TAG_ID = process.env.AI_WARN_TAG_ID || null;

class PlatformApiService {
    constructor() {
        // Node list — will be auto-discovered from Backend Master on initialize()
        this.allNodes = [];
        
        // Cache for account -> node mapping
        this.accountNodeCache = new Map();
    }

    /**
     * Initialize service (connect to Backend Master and discover nodes)
     */
    async initialize() {
        await gatewayService.initialize();
        
        // Auto-discover available nodes from Backend Master
        await this._discoverNodes();
        
        logger.info('Platform API service initialized with direct Backend Master connection');
    }

    /**
     * Discover available nodes from Backend Master.
     * Calls RequestNodesInfo with no params (returns all accessible nodes).
     * Falls back to env BROKER_NODES if discovery fails.
     */
    async _discoverNodes() {
        try {
            const response = await this.executeRequest('RequestNodesInfo', {});
            
            if (response && response.Result && Array.isArray(response.Result)) {
                const nodes = response.Result
                    .filter(n => n.Node && n.Node !== 'QuotesManager')
                    .map(n => n.Node);
                
                if (nodes.length > 0) {
                    this.allNodes = nodes;
                    logger.info('Auto-discovered nodes from Backend Master', { 
                        count: nodes.length, 
                        nodes: nodes 
                    });
                    return;
                }
            }
            
            logger.warn('RequestNodesInfo returned no nodes, trying fallback');
        } catch (error) {
            logger.warn('Failed to auto-discover nodes', { error: error.message });
        }
        
        // Fallback: env variable BROKER_NODES (comma-separated)
        if (process.env.BROKER_NODES) {
            this.allNodes = process.env.BROKER_NODES.split(',').map(n => n.trim()).filter(Boolean);
            logger.info('Using BROKER_NODES from env', { nodes: this.allNodes });
        } else {
            // Last resort: default demo nodes
            this.allNodes = [
                'MT5Demo', 'cTraderDemo', 'Hedge',
                'MT4dev', 'MT5dev', 'SuperNode', 'Second',
                'Demo MT5', 'CTrader', 'QuotesManager'
            ];
            logger.warn('No nodes discovered and no BROKER_NODES env — using hardcoded defaults');
        }
    }

    /**
     * Extract results from API response (handles various formats)
     */
    _extractResults(response) {
        if (!response || !response.Result) return [];
        
        const result = response.Result;
        
        if (result.Page && Array.isArray(result.Page)) {
            return result.Page;
        }
        
        if (Array.isArray(result)) {
            let items = [];
            for (const item of result) {
                if (item.Node !== undefined && item.Result !== undefined) {
                    if (item.Result.Page && Array.isArray(item.Result.Page)) {
                        items = items.concat(item.Result.Page.map(r => ({ ...r, _node: item.Node })));
                    } else if (Array.isArray(item.Result)) {
                        items = items.concat(item.Result.map(r => ({ ...r, _node: item.Node })));
                    } else if (item.Result && typeof item.Result === 'object') {
                        items.push({ ...item.Result, _node: item.Node });
                    }
                } else {
                    items.push(item);
                }
            }
            return items;
        }
        
        if (typeof result === 'object') return [result];
        return [];
    }

    /**
     * Safely iterate over node results from API response
     */
    _forEachNodeResult(response, callback) {
        if (!response || !response.Result) {
            return;
        }

        const result = response.Result;

        if (Array.isArray(result)) {
            for (const item of result) {
                if (item.Node !== undefined && item.Result !== undefined) {
                    callback(item.Result, item.Node, item.Platform);
                }
            }
        }
    }

    /**
     * Find which node an account belongs to
     */
    async findAccountNode(login) {
        if (this.accountNodeCache.has(login)) {
            return this.accountNodeCache.get(login);
        }
        
        logger.debug('Finding node for account', { login });
        
        const result = await this.executeRequest('RequestAccountsShortInfo', {
            Logins: [login],
            Nodes: this.allNodes
        });
        
        if (result && result.Result && Array.isArray(result.Result)) {
            for (const nodeResult of result.Result) {
                if (nodeResult.Result && nodeResult.Result.length > 0) {
                    const node = nodeResult.Node;
                    logger.info('Account found on node', { login, node });
                    this.accountNodeCache.set(login, node);
                    return node;
                }
            }
        }
        
        logger.warn('Account not found on any node', { login });
        return null;
    }

    /**
     * Execute platform API request via direct WebSocket to Backend Master
     */
    async executeRequest(requestName, params = {}) {
        try {
            // Ensure connected
            if (!gatewayService.isConnected()) {
                await gatewayService.initialize();
            }

            const requestBody = {
                RequestName: requestName,
                ...params
            };

            logger.debug('Executing request to Backend Master', { requestName });

            const response = await gatewayService.request(requestBody);
            
            logger.debug('Response received from Backend Master', { 
                requestName, 
                responseMaster: response.ResponseMaster 
            });

            return response;
        } catch (error) {
            logger.logError(error, { context: 'Backend Master API request', requestName });
            throw error;
        }
    }

    // ============================================
    // ACCOUNT FUNCTIONS
    // ============================================

    async getAccountCurrentProfit(login) {
        const node = await this.findAccountNode(login);
        if (!node) return { error: `Account ${login} not found` };
        return this.executeRequest('RequestTradeSessionAccountCurrentProfit', {
            Login: login,
            Nodes: [node]
        });
    }

    async getAccountProfitHistory(login, startDate, endDate) {
        const node = await this.findAccountNode(login);
        if (!node) return { error: `Account ${login} not found` };
        
        // Normalize date format to ISO 8601 (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss)
        const normalizeDate = (dateStr) => {
            if (!dateStr) return dateStr;
            // Handle common formats: DD.MM.YYYY, DD/MM/YYYY, MM-DD-YYYY
            const dotMatch = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
            if (dotMatch) {
                return `${dotMatch[3]}-${dotMatch[2].padStart(2, '0')}-${dotMatch[1].padStart(2, '0')}`;
            }
            const slashMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (slashMatch) {
                return `${slashMatch[3]}-${slashMatch[2].padStart(2, '0')}-${slashMatch[1].padStart(2, '0')}`;
            }
            return dateStr;
        };
        
        const normalizedStart = normalizeDate(startDate);
        const normalizedEnd = normalizeDate(endDate);
        
        const result = await this.executeRequest('RequestTradeSessionAccountsProfitHistory', {
            Logins: [login],
            StartDate: normalizedStart,
            EndDate: normalizedEnd,
            Nodes: [node]
        });
        
        const records = this._extractResults(result);
        if (!records || records.length === 0) {
            return {
                login, node,
                period: { from: normalizedStart, to: normalizedEnd },
                summary: `No profit history found for account ${login} from ${normalizedStart} to ${normalizedEnd}`,
                records: []
            };
        }
        
        let totalProfit = 0;
        const formatted = records.map(r => {
            const profit = r.Profit || r.ProfitInUsd || 0;
            totalProfit += profit;
            return {
                date: r.Date || r.DateTime,
                balance: r.Balance || r.BalanceInUsd,
                profit: profit,
                equity: r.Equity || r.EquityInUsd,
                ...(r.Deposit !== undefined && { deposit: r.Deposit }),
                ...(r.Withdrawal !== undefined && { withdrawal: r.Withdrawal })
            };
        });
        
        return {
            login, node,
            period: { from: normalizedStart, to: normalizedEnd },
            totalProfit,
            recordsCount: formatted.length,
            records: formatted,
            summary: `Account ${login} profit history: ${formatted.length} records, total profit: ${totalProfit.toFixed(2)} USD`
        };
    }

    async getAccountDetails(login) {
        const node = await this.findAccountNode(login);
        if (!node) return { error: `Account ${login} not found` };
        
        const result = await this.executeRequest('RequestAccountTradeState', {
            Login: login,
            Nodes: [node]
        });
        
        let account = null;
        if (result && result.Result) {
            if (Array.isArray(result.Result)) {
                for (const nodeResult of result.Result) {
                    if (nodeResult.Result && typeof nodeResult.Result === 'object') {
                        account = nodeResult.Result;
                        account.Node = nodeResult.Node;
                        break;
                    }
                }
            } else if (typeof result.Result === 'object') {
                account = result.Result;
            }
        }
        
        if (!account) {
            return { error: `Account ${login} data not found` };
        }
        
        // Format response (trading fields always included)
        const accountData = {
            login: account.Login,
            group: account.Group,
            platform: account.Platform,
            node: account.Node || node,
            currency: account.Currency || 'USD',
            balance: account.Balance,
            equity: account.Equity,
            credit: account.Credit || 0,
            margin: account.Margin || 0,
            marginLevel: account.MarginLevel || 0,
            leverage: account.Leverage,
            book: account.Book || 'Unknown'
        };

        // Add personal fields if allowed for this broker
        fieldFilter.enrichAccountData(accountData, account);

        return { account: accountData };
    }

    async getAccountTrades(login, startDate = null, endDate = null) {
        const node = await this.findAccountNode(login);
        if (!node) return { error: `Account ${login} not found` };

        const params = {
            Login: login,
            Nodes: [node],
            PageSize: 50,
            PageNum: 1
        };

        if (startDate) params.From = startDate;
        if (endDate) params.To = endDate;

        const result = await this.executeRequest('RequestAccountHistory', params);
        if (!result || !result.Result) {
            return { trades: [], count: 0, summary: `No trades found for account ${login}` };
        }

        const trades = this._extractResults(result);
        const realTrades = trades.filter(t =>
            t.TicketType !== 'BalanceOrder' &&
            t.Cmd !== 'Charge' &&
            t.Cmd !== 'Credit' &&
            (t.Symbol && t.Symbol !== '')
        );

        return {
            trades: realTrades,
            count: realTrades.length,
            summary: `Account ${login}: ${realTrades.length} trades found`
        };
    }

    async getAccountPositions(login) {
        return this.getOpenPositions(login);
    }

    async analyzeAccount(login) {
        const node = await this.findAccountNode(login);
        if (!node) {
            return {
                login,
                error: `Account ${login} not found`,
                details: { error: 'Account not found' },
                currentProfit: { error: 'Account not found' },
                openPositions: { error: 'Account not found' },
                recentTrades: { error: 'Account not found' }
            };
        }

        const [detailsResult, profitResult, positionsResult, tradesResult] = await Promise.allSettled([
            this.getAccountDetails(login),
            this.getAccountCurrentProfit(login),
            this.getAccountPositions(login),
            this.getAccountTrades(login)
        ]);

        return {
            login,
            node,
            details: detailsResult.status === 'fulfilled' ? detailsResult.value : { error: detailsResult.reason?.message },
            currentProfit: profitResult.status === 'fulfilled' ? profitResult.value : { error: profitResult.reason?.message },
            openPositions: positionsResult.status === 'fulfilled' ? positionsResult.value : { error: positionsResult.reason?.message },
            recentTrades: tradesResult.status === 'fulfilled' ? tradesResult.value : { error: tradesResult.reason?.message }
        };
    }

    async getOpenPositions(login) {
        const node = await this.findAccountNode(login);
        if (!node) return { error: `Account ${login} not found` };
        
        const result = await this.executeRequest('RequestAccountOpenedOrders', {
            Login: login,
            Nodes: [node]
        });
        
        const positions = this._extractResults(result);
        
        return {
            login,
            node,
            positionsCount: positions.length,
            positions: positions.map(p => ({
                ticket: p.Order || p.Ticket,
                symbol: p.Symbol,
                type: p.Type || p.TradeType,
                volume: p.Volume || p.Lots,
                openPrice: p.OpenPrice,
                currentPrice: p.CurrentPrice || p.ClosePrice,
                profit: p.Profit,
                swap: p.Swap || 0,
                commission: p.Commission || 0,
                openTime: p.OpenTime
            }))
        };
    }

    async getTagsCatalog() {
        const result = await this.executeRequest('RequestTags', {});
        return this._extractResults(result);
    }

    async getAccountShortInfo(login) {
        const node = await this.findAccountNode(login);
        if (!node) {
            return null;
        }

        const result = await this.executeRequest('RequestAccountsShortInfo', {
            Logins: [login],
            Nodes: [node]
        });

        if (!result || !Array.isArray(result.Result)) {
            return null;
        }

        for (const nodeResult of result.Result) {
            const records = Array.isArray(nodeResult?.Result) ? nodeResult.Result : [];
            if (records.length > 0) {
                return {
                    ...records[0],
                    Node: nodeResult.Node || node
                };
            }
        }

        return null;
    }

    async ensureAiWarnTagAssigned(login) {
        const loginNum = Number(login);
        if (!Number.isFinite(loginNum)) {
            return { assigned: false, reason: 'invalid_login' };
        }

        let account = null;
        try {
            account = await this.getAccountShortInfo(loginNum);
        } catch (error) {
            logger.warn('Failed to load account short info before AI warn assignment', {
                login: loginNum,
                error: error.message,
            });
        }

        const accountNode = account?.Node || await this.findAccountNode(loginNum);
        if (!accountNode) {
            return { assigned: false, reason: 'account_not_found' };
        }

        let tagId = this._normalizeGuid(AI_WARN_TAG_ID);

        if (!tagId) {
            try {
                const tag = await this._ensureTagByNameAndTemplate(AI_WARN_TAG_NAME, AI_WARN_TEMPLATE_ID);
                tagId = this._normalizeGuid(tag?.Id);
            } catch (error) {
                logger.warn('Failed to resolve AI warn tag from catalog', {
                    login: loginNum,
                    error: error.message,
                });
            }
        }

        if (!tagId) {
            return { assigned: false, reason: 'tag_catalog_unavailable' };
        }

        try {
            const assignedTagIds = Array.isArray(account?.Tags) ? account.Tags.map((id) => String(id).toLowerCase()) : null;
            if (assignedTagIds?.includes(tagId.toLowerCase())) {
                return { assigned: false, reason: 'already_assigned', tagId };
            }
        } catch (error) {
            logger.warn('Failed to verify AI warn assignment via account short info, will attempt assign anyway', {
                login: loginNum,
                error: error.message,
            });
        }

        await this.executeRequest('RequestTagAssign', {
            TagId: tagId,
            Logins: [loginNum],
            Groups: [],
            Nodes: [accountNode]
        });

        return { assigned: true, reason: 'assigned', tagId };
    }

    async _ensureTagByNameAndTemplate(name, templateId) {
        const findExisting = async () => {
            const tags = await this.getTagsCatalog();
            return (
                tags.find((tag) =>
                    String(tag?.Name || '').trim().toLowerCase() === name.toLowerCase() &&
                    String(tag?.TemplateId || '').trim() === templateId,
                ) || null
            );
        };

        const existing = await findExisting();
        if (existing) {
            return existing;
        }

        try {
            await this.executeRequest('RequestTagManage', {
                Action: 'Create',
                Tag: {
                    Name: name,
                    TemplateId: templateId
                }
            });
        } catch (error) {
            logger.warn('Failed to create AI warn tag, will re-check catalog', {
                error: error.message,
                templateId,
                name
            });
        }

        return findExisting();
    }

    _normalizeGuid(value) {
        if (!value) {
            return null;
        }

        const guid = String(value).trim();
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(guid)) {
            return guid;
        }

        return null;
    }

    /**
     * Get account CIDs (Client IDs for detecting related accounts)
     */
    async getAccountCids(login) {
        const node = await this.findAccountNode(login);
        if (!node) return { error: `Account ${login} not found` };
        return this.executeRequest('RequestAccountCids', {
            Login: login,
            Nodes: [node]
        });
    }

    /**
     * Get account IPs (for detecting related accounts)
     */
    async getAccountIps(login) {
        const node = await this.findAccountNode(login);
        if (!node) return { error: `Account ${login} not found` };
        return this.executeRequest('RequestAccountIps', {
            Login: login,
            Nodes: [node]
        });
    }

    /**
     * Get account connections (CIDs + IPs for finding related accounts)
     */
    async getAccountConnections(login) {
        const node = await this.findAccountNode(login);
        if (!node) return { error: `Account ${login} not found` };

        const [cidsResult, ipsResult] = await Promise.allSettled([
            this.getAccountCids(login),
            this.getAccountIps(login)
        ]);

        return {
            login,
            node,
            cids: cidsResult.status === 'fulfilled' ? cidsResult.value : { error: cidsResult.reason?.message },
            ips: ipsResult.status === 'fulfilled' ? ipsResult.value : { error: ipsResult.reason?.message }
        };
    }

    async getAccountHistory(login, startDate, endDate) {
        const node = await this.findAccountNode(login);
        if (!node) return { error: `Account ${login} not found` };
        
        const result = await this.executeRequest('RequestAccountHistory', {
            Login: login,
            StartDate: startDate,
            EndDate: endDate,
            Nodes: [node]
        });
        
        const orders = this._extractResults(result);
        
        return {
            login,
            node,
            startDate,
            endDate,
            ordersCount: orders.length,
            orders: orders.slice(0, 50).map(o => ({
                ticket: o.Order || o.Ticket,
                symbol: o.Symbol,
                type: o.Type || o.TradeType,
                volume: o.Volume || o.Lots,
                openPrice: o.OpenPrice,
                closePrice: o.ClosePrice,
                profit: o.Profit,
                swap: o.Swap || 0,
                commission: o.Commission || 0,
                openTime: o.OpenTime,
                closeTime: o.CloseTime
            }))
        };
    }

    async getAccountIssues(login) {
        return this.executeRequest('RequestAccountsIssuesHistory', {
            Login: login,
            PageSize: 50,
            PageNum: 1
        });
    }

    async getTriggersSettings() {
        const rawResult = await this.executeRequest('RequestTriggersSettings', {});

        if (!rawResult || !rawResult.Result) {
            return { error: 'Failed to get trigger settings' };
        }

        const nodesSummary = [];
        const allNodes = new Set();

        for (const nodeResult of rawResult.Result) {
            const node = nodeResult.Node;
            const platform = nodeResult.Platform;
            allNodes.add(node);

            if (!nodeResult.Result || !Array.isArray(nodeResult.Result)) continue;

            const triggers = nodeResult.Result;
            const enabled = triggers.filter(t => t.Enabled);
            const disabled = triggers.filter(t => !t.Enabled);

            const byType = {};
            for (const t of triggers) {
                const type = this._getTriggerTypeName(t.TriggerType);
                if (!byType[type]) {
                    byType[type] = { enabled: 0, disabled: 0 };
                }
                if (t.Enabled) {
                    byType[type].enabled++;
                } else {
                    byType[type].disabled++;
                }
            }

            nodesSummary.push({
                node,
                platform,
                totalTriggers: triggers.length,
                enabledTriggers: enabled.length,
                disabledTriggers: disabled.length,
                byType
            });
        }

        return {
            nodes: Array.from(allNodes),
            nodesSummary
        };
    }

    async getTriggersSettingsRaw() {
        return this.executeRequest('RequestTriggersSettings', {});
    }

    async getTriggersActivity() {
        return this.executeRequest('RequestTriggersActivity', {});
    }

    async getAccountTriggers(login) {
        const accountNode = await this.findAccountNode(login);
        let accountGroup = null;

        if (accountNode) {
            const details = await this.getAccountDetails(login);
            accountGroup = details?.account?.group || null;
        }

        const rawResult = await this.getTriggersSettingsRaw();
        if (!rawResult || !rawResult.Result) {
            return { login, triggers: [], message: 'Failed to get trigger settings' };
        }

        const relevantTriggers = [];

        for (const nodeResult of rawResult.Result) {
            const node = nodeResult.Node;
            const platform = nodeResult.Platform;

            if (accountNode && node !== accountNode) {
                continue;
            }

            if (!nodeResult.Result || !Array.isArray(nodeResult.Result)) continue;

            for (const trigger of nodeResult.Result) {
                const isLoginIncluded = trigger.Accounts?.Included?.some(acc =>
                    acc.Item === login || acc.Item === String(login) || acc.Item === Number(login)
                );
                const isLoginExcluded = trigger.Accounts?.Excluded?.some(acc =>
                    acc.Item === login || acc.Item === String(login) || acc.Item === Number(login)
                );
                const isGroupIncluded = accountGroup && trigger.AccountsGroups?.Included?.some(g => g.Item === accountGroup);
                const isGroupExcluded = accountGroup && trigger.AccountsGroups?.Excluded?.some(g => g.Item === accountGroup);

                let isRelevant = false;
                if (isLoginIncluded) {
                    isRelevant = true;
                } else if (isLoginExcluded) {
                    isRelevant = false;
                } else if (isGroupExcluded) {
                    isRelevant = false;
                } else if (isGroupIncluded) {
                    isRelevant = true;
                } else {
                    const hasAccountFilters = trigger.Accounts?.Included?.length > 0;
                    const hasGroupFilters = trigger.AccountsGroups?.Included?.length > 0;
                    isRelevant = !hasAccountFilters && !hasGroupFilters;
                }

                if (isRelevant) {
                    relevantTriggers.push({
                        name: trigger.RuleName || trigger.Name,
                        type: trigger.TriggerType,
                        description: trigger.Description,
                        enabled: trigger.Enabled,
                        state: trigger.State,
                        node,
                        platform,
                        alertType: trigger.AlertType,
                        settings: this._extractTriggerSettings(trigger)
                    });
                }
            }
        }

        return {
            login,
            node: accountNode,
            group: accountGroup,
            totalTriggers: relevantTriggers.length,
            enabledTriggers: relevantTriggers.filter(t => t.enabled).length,
            triggers: relevantTriggers,
            summary: this._formatTriggersSummary(login, relevantTriggers)
        };
    }

    async getAccountTriggerStats(login, days = 30) {
        const issuesResult = await this.getAccountIssues(login);
        const triggersResult = await this.getAccountTriggers(login);

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        let issues = [];
        if (issuesResult && issuesResult.Result) {
            issues = Array.isArray(issuesResult.Result) ? issuesResult.Result : [issuesResult.Result];
            issues = issues.filter(issue => {
                if (!issue.CreateTime) return false;
                const issueDate = new Date(issue.CreateTime);
                return issueDate >= startDate && issueDate <= endDate;
            });
        }

        const triggerStats = {};
        for (const issue of issues) {
            const triggerType = issue.TriggerType || issue.Type || 'Unknown';
            if (!triggerStats[triggerType]) {
                triggerStats[triggerType] = { count: 0, lastFired: null, issues: [] };
            }
            triggerStats[triggerType].count++;
            if (!triggerStats[triggerType].lastFired || new Date(issue.CreateTime) > new Date(triggerStats[triggerType].lastFired)) {
                triggerStats[triggerType].lastFired = issue.CreateTime;
            }
            triggerStats[triggerType].issues.push({
                time: issue.CreateTime,
                state: issue.State,
                description: issue.Description
            });
        }

        return {
            login,
            period: { days, startDate: startDate.toISOString(), endDate: endDate.toISOString() },
            totalIssues: issues.length,
            triggerStats,
            monitoringTriggers: triggersResult.totalTriggers,
            enabledTriggers: triggersResult.enabledTriggers
        };
    }

    async getAverageTradeTime(login, days = 30) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const tradesResult = await this.getAccountTrades(login, startDate.toISOString(), endDate.toISOString());
        const trades = tradesResult?.trades || [];

        if (trades.length === 0) {
            return {
                login,
                period: { days, startDate: startDate.toISOString(), endDate: endDate.toISOString() },
                tradesCount: 0,
                summary: `No closed trades for account ${login} in last ${days} days.`
            };
        }

        const lifetimes = [];
        for (const trade of trades) {
            const openTime = trade.OpenTime || trade.TimeCreate || trade.TimeSetup;
            const closeTime = trade.CloseTime || trade.TimeDone || trade.TimeClose;
            if (openTime && closeTime) {
                const openDate = new Date(openTime);
                const closeDate = new Date(closeTime);
                const lifetimeMs = closeDate - openDate;
                const lifetimeMinutes = lifetimeMs / (1000 * 60);
                if (lifetimeMinutes >= 0) lifetimes.push(lifetimeMinutes);
            }
        }

        if (lifetimes.length === 0) {
            return {
                login,
                period: { days },
                tradesCount: trades.length,
                summary: `Trades found but no open/close timestamps available for account ${login}.`
            };
        }

        const avgMinutes = lifetimes.reduce((a, b) => a + b, 0) / lifetimes.length;
        return {
            login,
            period: { days, startDate: startDate.toISOString(), endDate: endDate.toISOString() },
            tradesCount: lifetimes.length,
            avgMinutes
        };
    }

    async getABookSettings(login = null) {
        const params = {};
        if (login) {
            params.Accounts = [login];
        }
        return this.executeRequest('RequestABookSettings', params);
    }

    async getAccountExposure(login) {
        const node = await this.findAccountNode(login);
        if (!node) return { error: `Account ${login} not found` };
        const result = await this.executeRequest('RequestAccountExposure', {
            Login: login,
            Nodes: [node]
        });

        if (!result || !result.Result) {
            return {
                login,
                node,
                count: 0,
                exposure: [],
                summary: `No exposure data found for account ${login}`
            };
        }

        let rows = this._extractResults(result);
        if (rows.length === 1 && rows[0] && typeof rows[0] === 'object') {
            const container = rows[0];
            if (Array.isArray(container.BySymbol)) rows = container.BySymbol;
            else if (Array.isArray(container.Symbols)) rows = container.Symbols;
            else if (Array.isArray(container.Exposure)) rows = container.Exposure;
        }

        const pick = (obj, fields, defaultValue = null) => {
            for (const field of fields) {
                if (obj[field] !== undefined && obj[field] !== null) {
                    return obj[field];
                }
            }
            return defaultValue;
        };

        const toNumber = (value) => {
            const n = Number(value);
            return Number.isFinite(n) ? n : 0;
        };

        const exposure = rows
            .map((row) => {
                const longVolume = toNumber(pick(row, ['LongVolume', 'BuyVolume', 'BuyLots', 'LotsBuy', 'TotalBuyVolume'], 0));
                const shortVolume = toNumber(pick(row, ['ShortVolume', 'SellVolume', 'SellLots', 'LotsSell', 'TotalSellVolume'], 0));
                const longExposure = toNumber(pick(row, ['LongExposure', 'BuyExposure', 'ExposureBuy'], 0));
                const shortExposure = toNumber(pick(row, ['ShortExposure', 'SellExposure', 'ExposureSell'], 0));

                const netVolumeRaw = pick(row, ['NetVolume']);
                const netExposureRaw = pick(row, ['NetExposure', 'Exposure']);

                return {
                    symbol: pick(row, ['Symbol', 'Instrument', 'Name', 'Ticker'], null),
                    longVolume,
                    shortVolume,
                    netVolume: netVolumeRaw !== null && netVolumeRaw !== undefined ? toNumber(netVolumeRaw) : (longVolume - shortVolume),
                    longExposure,
                    shortExposure,
                    netExposure: netExposureRaw !== null && netExposureRaw !== undefined ? toNumber(netExposureRaw) : (longExposure - shortExposure),
                    profit: toNumber(pick(row, ['Profit', 'PnL', 'NetProfit', 'UnrealizedProfit'], 0))
                };
            })
            .filter((row) => row.symbol || row.longVolume !== 0 || row.shortVolume !== 0 || row.netExposure !== 0 || row.profit !== 0)
            .sort((a, b) => Math.abs(b.netExposure) - Math.abs(a.netExposure));

        const totals = exposure.reduce((acc, item) => {
            acc.longVolume += item.longVolume;
            acc.shortVolume += item.shortVolume;
            acc.netVolume += item.netVolume;
            acc.longExposure += item.longExposure;
            acc.shortExposure += item.shortExposure;
            acc.netExposure += item.netExposure;
            acc.profit += item.profit;
            return acc;
        }, {
            longVolume: 0,
            shortVolume: 0,
            netVolume: 0,
            longExposure: 0,
            shortExposure: 0,
            netExposure: 0,
            profit: 0
        });

        return {
            login,
            node,
            count: exposure.length,
            exposure,
            totals,
            summary: `Account ${login} exposure: ${exposure.length} symbols, net exposure ${totals.netExposure.toFixed(2)}, net volume ${totals.netVolume.toFixed(2)}`
        };
    }

    async getNetSummary() {
        return this.executeRequest('RequestNetSummary', { TopSymbols: 50 });
    }

    /**
     * Get account journal (leverage changes, admin actions, etc.)
     */
    async getAccountJournal(login) {
        const node = await this.findAccountNode(login);
        if (!node) return { error: `Account ${login} not found` };

        const result = await this.executeRequest('RequestAccountJournal', {
            Login: login,
            Nodes: [node],
            PageSize: 100,
            PageNum: 1
        });

        if (!result || !result.Result) {
            return {
                login,
                node,
                entriesCount: 0,
                entries: [],
                summary: `No account journal entries found for account ${login}`
            };
        }

        const rows = this._extractResults(result);

        const pick = (obj, fields, defaultValue = null) => {
            for (const field of fields) {
                if (obj[field] !== undefined && obj[field] !== null && obj[field] !== '') {
                    return obj[field];
                }
            }
            return defaultValue;
        };

        const entries = rows.map((row) => ({
            timestamp: pick(row, ['Time', 'DateTime', 'CreateTime', 'Timestamp', 'Date'], null),
            action: pick(row, ['Action', 'Event', 'Type', 'Operation', 'Cmd', 'ChangeType', 'Name'], 'Unknown event'),
            field: pick(row, ['Field', 'Parameter', 'Property', 'Prop'], null),
            oldValue: pick(row, ['OldValue', 'ValueFrom', 'Before'], null),
            newValue: pick(row, ['NewValue', 'ValueTo', 'After', 'Value'], null),
            symbol: pick(row, ['Symbol', 'Instrument'], null),
            ticket: pick(row, ['Order', 'Ticket'], null),
            source: pick(row, ['Source', 'User', 'Manager', 'Admin', 'Operator'], null),
            comment: pick(row, ['Comment', 'Description', 'Note'], null)
        }));

        return {
            login,
            node,
            entriesCount: entries.length,
            entries,
            summary: `Account ${login} journal: ${entries.length} events found`
        };
    }

    // ============================================
    // SEARCH FUNCTIONS
    // ============================================

    async searchAccounts(query, limit = 20) {
        const result = await this.executeRequest('RequestAccountsByQuery', {
            Query: query,
            Skip: 0,
            Limit: limit,
            Nodes: this.allNodes
        });
        
        const accounts = this._extractResults(result);
        
        return {
            query,
            count: accounts.length,
            accounts: accounts.map(a => {
                const mapped = {
                    login: a.Login,
                    node: a._node || a.Node,
                    platform: a.Platform,
                    balance: a.Balance,
                    equity: a.Equity || a.Balance,
                    group: a.Group
                };
                // Add personal fields if allowed for this broker
                fieldFilter.enrichAccountData(mapped, a);
                return mapped;
            })
        };
    }

    // ============================================
    // MARKET DATA FUNCTIONS  
    // ============================================

    async getCurrentRates(symbols = []) {
        const result = await this.executeRequest('RequestCurrentRates', {
            Nodes: this.allNodes,
            Symbols: symbols
        });
        
        const rates = this._extractResults(result);
        
        return {
            count: rates.length,
            rates: rates.map(r => ({
                symbol: r.Symbol,
                bid: r.Bid,
                ask: r.Ask,
                time: r.Time,
                node: r._node || r.Node
            }))
        };
    }

    async getTradingSymbols() {
        const result = await this.executeRequest('RequestTradingSymbols', {
            Nodes: this.allNodes
        });
        
        const symbols = this._extractResults(result);
        
        return {
            count: symbols.length,
            symbols: symbols.map(s => ({
                name: s.Name || s.Symbol,
                description: s.Description,
                group: s.Group || s.SymbolGroup,
                node: s._node || s.Node
            }))
        };
    }

    async getAllOpenPositions(pageSize = 100, pageNum = 1) {
        const result = await this.executeRequest('RequestOpenPositions', {
            PageSize: pageSize,
            PageNum: pageNum,
            Reasons: ['Client', 'Robot', 'Signal', 'Gateway', 'WebTerminal', 'MobileDevice', 'PlatformApi']
        });

        if (!result || !result.Result) {
            return { positions: [], totalCount: 0, summary: 'No open positions found' };
        }

        let allPositions = [];
        let totalCount = 0;
        const resultData = result.Result;

        if (resultData.Page && Array.isArray(resultData.Page)) {
            allPositions = resultData.Page;
            totalCount = resultData.TotalRecords || resultData.Page.length;
        } else if (Array.isArray(resultData)) {
            for (const nodeResult of resultData) {
                if (nodeResult.Node !== undefined && nodeResult.Result) {
                    if (nodeResult.Result.Page && Array.isArray(nodeResult.Result.Page)) {
                        const positions = nodeResult.Result.Page.map(pos => ({
                            ...pos,
                            node: nodeResult.Node,
                            platform: nodeResult.Platform
                        }));
                        allPositions = allPositions.concat(positions);
                        totalCount += nodeResult.Result.TotalRecords || nodeResult.Result.Page.length;
                    } else if (Array.isArray(nodeResult.Result)) {
                        const positions = nodeResult.Result.map(pos => ({
                            ...pos,
                            node: nodeResult.Node,
                            platform: nodeResult.Platform
                        }));
                        allPositions = allPositions.concat(positions);
                    }
                }
            }
        }

        allPositions.sort((a, b) => new Date(b.OpenTime || 0) - new Date(a.OpenTime || 0));

        return {
            positions: allPositions,
            totalCount: totalCount || allPositions.length,
            positionsCount: allPositions.length
        };
    }

    async getOpenPositionsSummary() {
        const result = await this.executeRequest('RequestOpenPositionsSummary', {
            Reasons: ['Client', 'Robot', 'Signal', 'Gateway', 'WebTerminal', 'MobileDevice', 'PlatformApi']
        });

        if (!result || !result.Result) {
            return { total: 0, lots: 0, profit: 0, accounts: 0, volume: 0 };
        }

        const data = result.Result;
        let total = 0, lots = 0, profit = 0, accounts = 0, volume = 0;

        if (Array.isArray(data)) {
            for (const nodeResult of data) {
                if (nodeResult.Result) {
                    const r = nodeResult.Result;
                    total += r.Total || 0;
                    lots += r.Lots || 0;
                    profit += r.ProfitUsd || 0;
                    accounts += r.Accounts || 0;
                    volume += r.TotalVolumeInUsd || 0;
                }
            }
        } else {
            total = data.Total || 0;
            lots = data.Lots || 0;
            profit = data.ProfitUsd || 0;
            accounts = data.Accounts || 0;
            volume = data.TotalVolumeInUsd || 0;
        }

        return { total, lots, profit, accounts, volume };
    }

    async getTradeSessionSummary() {
        return this.executeRequest('RequestTradeSessionSummary', {});
    }

    async getTradeSessionRealizedOrders(pageSize = 100) {
        return this.executeRequest('RequestTradeSessionRealizedOrders', {
            PageSize: pageSize,
            PageNum: 1
        });
    }

    async getSessionPnLBySymbols(topN = 20) {
        const result = await this.executeRequest('RequestTradeSessionRealizedOrders', {
            PageSize: 1000,
            PageNum: 1
        });

        if (!result || !result.Result) {
            return { symbols: [], totalProfit: 0, summary: 'No session realized orders found' };
        }

        const orders = this._extractResults(result);
        if (orders.length === 0) {
            return { symbols: [], totalProfit: 0, summary: 'No closed orders in current session' };
        }

        const bySymbol = {};
        let totalProfit = 0;
        let totalTrades = 0;

        for (const order of orders) {
            const symbol = order.Symbol || 'Unknown';
            const profit = order.Profit || 0;
            const lots = order.Volume || order.Lots || 0;

            if (!bySymbol[symbol]) {
                bySymbol[symbol] = { symbol, profit: 0, trades: 0, lots: 0, winners: 0, losers: 0 };
            }

            bySymbol[symbol].profit += profit;
            bySymbol[symbol].trades += 1;
            bySymbol[symbol].lots += lots;
            if (profit > 0) bySymbol[symbol].winners++;
            else if (profit < 0) bySymbol[symbol].losers++;

            totalProfit += profit;
            totalTrades++;
        }

        const symbolsArray = Object.values(bySymbol)
            .sort((a, b) => Math.abs(b.profit) - Math.abs(a.profit))
            .slice(0, topN);

        const topProfitable = symbolsArray.filter(s => s.profit > 0).slice(0, 5);
        const topLosing = symbolsArray.filter(s => s.profit < 0).slice(0, 5);

        return {
            symbols: symbolsArray,
            totalProfit,
            totalTrades,
            totalSymbols: Object.keys(bySymbol).length,
            summary: `Session P&L: ${totalTrades} trades across ${Object.keys(bySymbol).length} symbols, total profit: ${totalProfit.toFixed(2)} USD. Top profitable: ${topProfitable.map(s => `${s.symbol} (${s.profit.toFixed(2)})`).join(', ') || 'none'}. Top losing: ${topLosing.map(s => `${s.symbol} (${s.profit.toFixed(2)})`).join(', ') || 'none'}.`
        };
    }

    async getWinnersLosers(top = 10, node = null) {
        const params = { Top: top };
        if (node) {
            params.Nodes = [node];
        }

        const result = await this.executeRequest('RequestWinnersLosers', params);
        
        if (!result || !result.Result) {
            return { error: 'No winners/losers data available' };
        }
        
        const toNumber = (v) => {
            const n = Number(v);
            return Number.isFinite(n) ? n : 0;
        };

        const winners = [];
        const losers = [];
        const winnersSummaryParts = [];
        const losersSummaryParts = [];

        const collectFromContainer = (container, fallbackNode = null, fallbackPlatform = null) => {
            if (!container || typeof container !== 'object') {
                return;
            }

            const markAccount = (account) => ({
                ...account,
                _node: account._node || account.Node || fallbackNode || null,
                _platform: account._platform || account.Platform || fallbackPlatform || null,
            });

            if (Array.isArray(container.Winners)) {
                winners.push(...container.Winners.map(markAccount));
            }
            if (Array.isArray(container.Losers)) {
                losers.push(...container.Losers.map(markAccount));
            }

            if (container.WinnersSummary && typeof container.WinnersSummary === 'object') {
                winnersSummaryParts.push(container.WinnersSummary);
            }
            if (container.LosersSummary && typeof container.LosersSummary === 'object') {
                losersSummaryParts.push(container.LosersSummary);
            }
        };

        const payload = result.Result;
        if (Array.isArray(payload)) {
            for (const item of payload) {
                if (item && item.Result && typeof item.Result === 'object') {
                    collectFromContainer(item.Result, item.Node, item.Platform);
                } else if (item && typeof item === 'object') {
                    collectFromContainer(item);
                }
            }
        } else if (payload && typeof payload === 'object') {
            collectFromContainer(payload);
        }

        const resolveAccountNode = (account) => (
            account.Node ||
            account._node ||
            account.node ||
            account.Server ||
            account.ServerName ||
            ''
        );

        // Filter by node only when node metadata exists in account records.
        const filterByNode = (accounts) => {
            if (!Array.isArray(accounts) || !node) {
                return accounts;
            }

            const nodeLower = node.toLowerCase();
            const hasNodeInfo = accounts.some((a) => String(resolveAccountNode(a)).trim() !== '');
            if (!hasNodeInfo) {
                logger.warn('Node filter skipped for winners/losers because account records contain no node info', { node, top });
                return accounts;
            }

            return accounts.filter((a) => String(resolveAccountNode(a)).toLowerCase().includes(nodeLower));
        };

        const filteredWinners = filterByNode(winners);
        const filteredLosers = filterByNode(losers);

        // Format account list with readable field names and allowed personal fields.
        const formatAccount = (a) => {
            const mapped = {
                login: a.Login,
                node: resolveAccountNode(a) || null,
                platform: a.Platform || a._platform || null,
                equity: a.EquityInUsd || a.Equity,
                sessionProfit: a.SessionProfitInUsd || a.SessionProfit,
                sessionRealizedProfit: a.SessionRealizedProfitInUsd || a.SessionRealizedProfit,
                totalProfit: a.TotalProfitInUsd || a.TotalProfit,
                lots: a.Lots,
                unrealizedPnL: a.NetUnrealizedProfitInUsd || a.NetUnrealizedProfit
            };

            fieldFilter.enrichAccountData(mapped, a);
            return mapped;
        };

        const combineSummary = (parts, fallbackAccounts) => {
            if (!Array.isArray(parts) || parts.length === 0) {
                if (!Array.isArray(fallbackAccounts) || fallbackAccounts.length === 0) {
                    return null;
                }

                return {
                    accounts: fallbackAccounts.length,
                    totalEquity: fallbackAccounts.reduce((sum, a) => sum + toNumber(a.EquityInUsd || a.Equity), 0),
                    totalLots: fallbackAccounts.reduce((sum, a) => sum + toNumber(a.Lots), 0),
                    unrealizedPnL: fallbackAccounts.reduce((sum, a) => sum + toNumber(a.NetUnrealizedProfitInUsd || a.NetUnrealizedProfit), 0),
                    sessionProfit: fallbackAccounts.reduce((sum, a) => sum + toNumber(a.SessionProfitInUsd || a.SessionProfit), 0),
                    sessionRealizedProfit: fallbackAccounts.reduce((sum, a) => sum + toNumber(a.SessionRealizedProfitInUsd || a.SessionRealizedProfit), 0),
                    totalProfit: fallbackAccounts.reduce((sum, a) => sum + toNumber(a.TotalProfitInUsd || a.TotalProfit), 0),
                    timePeriod: null
                };
            }

            return {
                accounts: parts.reduce((sum, s) => sum + toNumber(s.Accounts), 0),
                totalEquity: parts.reduce((sum, s) => sum + toNumber(s.EquitiesInUsd), 0),
                totalLots: parts.reduce((sum, s) => sum + toNumber(s.Lots), 0),
                unrealizedPnL: parts.reduce((sum, s) => sum + toNumber(s.NetUnrealizedProfitInUsd), 0),
                sessionProfit: parts.reduce((sum, s) => sum + toNumber(s.TotalSessionProfitInUsd), 0),
                sessionRealizedProfit: parts.reduce((sum, s) => sum + toNumber(s.TotalSessionRealizedProfitInUsd), 0),
                totalProfit: parts.reduce((sum, s) => sum + toNumber(s.TotalProfitInUsd), 0),
                timePeriod: parts.find((s) => s.TimePeriod)?.TimePeriod || null
            };
        };

        const winnersSummary = combineSummary(winnersSummaryParts, filteredWinners);
        const losersSummary = combineSummary(losersSummaryParts, filteredLosers);

        const countryAllowed = fieldFilter.isFieldAllowed('country');
        const allAccounts = filteredWinners.concat(filteredLosers);

        const byCountry = (() => {
            if (!countryAllowed) {
                return [];
            }

            const countryStats = {};

            for (const a of allAccounts) {
                const country = (a.Country || a.country || '').toString().trim();
                if (!country) {
                    continue;
                }

                if (!countryStats[country]) {
                    countryStats[country] = {
                        country,
                        accounts: 0,
                        totalLots: 0,
                        totalProfit: 0,
                        sessionProfit: 0,
                        winners: 0,
                        losers: 0
                    };
                }

                countryStats[country].accounts += 1;
                countryStats[country].totalLots += toNumber(a.Lots);
                countryStats[country].totalProfit += toNumber(a.TotalProfitInUsd || a.TotalProfit);
                countryStats[country].sessionProfit += toNumber(a.SessionProfitInUsd || a.SessionProfit);

                const totalProfit = toNumber(a.TotalProfitInUsd || a.TotalProfit);
                if (totalProfit >= 0) {
                    countryStats[country].winners += 1;
                } else {
                    countryStats[country].losers += 1;
                }
            }

            return Object.values(countryStats)
                .sort((a, b) => b.totalLots - a.totalLots);
        })();

        const accountsWithCountry = allAccounts.reduce((count, a) => {
            const country = (a.Country || a.country || '').toString().trim();
            return country ? count + 1 : count;
        }, 0);

        const countryDataStatus = !countryAllowed
            ? 'disabled_by_config'
            : (accountsWithCountry > 0
                ? 'available'
                : (allAccounts.length > 0 ? 'missing_in_source' : 'no_accounts'));

        return {
            winners: filteredWinners.map(formatAccount),
            winnersCount: filteredWinners.length,
            winnersSummary,
            losers: filteredLosers.map(formatAccount),
            losersCount: filteredLosers.length,
            losersSummary,
            byCountry,
            countryDataStatus,
            countryDataSummary: {
                allowed: countryAllowed,
                accountsTotal: allAccounts.length,
                accountsWithCountry,
            },
            ...(node && { filteredByNode: node }),
            summary: `Top ${top} winners (${filteredWinners.length}) and losers (${filteredLosers.length})${node ? ` on server ${node}` : ''}`
        };
    }

    async getActiveIssues() {
        return this.executeRequest('RequestIssues', {
            IsProcessed: false,
            PageSize: 100,
            PageNum: 1
        });
    }

    async getTriggerEventsHistory(days = 7, triggerTypes = null) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const params = {
            From: startDate.toISOString(),
            To: endDate.toISOString(),
            PageSize: 200,
            PageNum: 1
        };

        if (triggerTypes && triggerTypes.length > 0) {
            params.TriggersTypes = triggerTypes;
        }

        return this.executeRequest('RequestIssuesHistory', params);
    }

    // ============================================
    // NODE INFO FUNCTIONS
    // ============================================

    async getNodesInfo() {
        const result = await this.executeRequest('RequestNodesInfo', {});
        
        if (result && result.Result && Array.isArray(result.Result)) {
            return {
                nodes: result.Result.map(n => ({
                    name: n.Node,
                    platform: n.Platform,
                    status: n.Status || 'Unknown',
                    accountsCount: n.AccountsCount,
                    ordersCount: n.OrdersCount
                }))
            };
        }
        
        return { nodes: [] };
    }

    _extractTriggerSettings(trigger) {
        const settings = {};

        if (trigger.MarginLevelPercent !== undefined) {
            settings.marginLevelPercent = trigger.MarginLevelPercent;
        }
        if (trigger.MinDepo !== undefined) {
            settings.minDeposit = trigger.MinDepo;
            settings.threshold = trigger.Threshold;
        }
        if (trigger.LargeVolumeLots !== undefined) {
            settings.largeVolumeLots = trigger.LargeVolumeLots;
            settings.useLots = trigger.UseLots;
        }
        if (trigger.GapSeconds !== undefined) {
            settings.gapSeconds = trigger.GapSeconds;
            settings.profitInUsd = trigger.ProfitInUsd;
        }
        if (trigger.CIDList !== undefined) {
            settings.cidList = trigger.CIDList;
            settings.autoBlockTrade = trigger.AutoBlockTrade;
        }
        if (trigger.SwapLongPercent !== undefined) {
            settings.swapLongPercent = trigger.SwapLongPercent;
            settings.swapShortPercent = trigger.SwapShortPercent;
        }

        return settings;
    }

    _formatTriggersSummary(login, triggers) {
        if (!triggers || triggers.length === 0) {
            return `Account ${login} is not monitored by any triggers.`;
        }

        const enabled = triggers.filter(t => t.enabled);
        const disabled = triggers.filter(t => !t.enabled);

        const byType = {};
        for (const t of enabled) {
            const typeKey = this._getTriggerTypeName(t.type);
            if (!byType[typeKey]) {
                byType[typeKey] = [];
            }
            byType[typeKey].push(t);
        }

        let summary = `Triggers for account ${login}: ${triggers.length} total (enabled: ${enabled.length}, disabled: ${disabled.length}).`;
        return summary;
    }

    _getTriggerTypeName(type) {
        const typeNames = {
            'TriggerLatencyArbitrage': 'Latency Arbitrage',
            'TriggerCIDControl': 'CID Control',
            'TriggerIpControl': 'IP Control',
            'TriggerBadRates': 'Bad Rates',
            'TriggerSymbolUnusualPnl': 'Unusual PnL',
            'TriggerOverdueCredits': 'Overdue Credits',
            'TriggerAchievedProfit': 'Achieved Profit',
            'TriggerAccountWithLargeVolume': 'Large Volume',
            'TriggerOrderWithLargeVolume': 'Large Order Volume',
            'TriggerChurningControl': 'Churning',
            'TriggerTraderActivity': 'Trader Activity',
            'TriggerRatesGap': 'Rates Gap',
            'TriggerInsiders': 'Insiders',
            'TriggerFailedStopOuts': 'Failed Stop Outs',
            'TriggerInvalidBalances': 'Invalid Balances',
            'TriggerSwapsChange': 'Swaps Change',
            'TriggerSwapsFreeAccounts': 'Swaps Free Accounts',
            'HedgeTriggerMarginLevel': 'Margin Level (Hedge)',
            'HedgeTriggerSwapsChange': 'Swaps Change (Hedge)'
        };
        return typeNames[type] || (type ? type.replace('Trigger', '') : 'Unknown');
    }

    _formatNumber(num) {
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
        return num.toFixed(2);
    }

    /**
     * Get connection status
     */
    getStatus() {
        return gatewayService.getStatus();
    }
}

module.exports = new PlatformApiService();
