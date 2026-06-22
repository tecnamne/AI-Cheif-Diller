const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

const DEMO_MODE = process.env.DEMO_MODE === 'true';
const DEFAULT_DB_NAME = 'trading_chat_demo';
const BROKER_NAME = process.env.BROKER_NAME || 'default';

class ScannerAlertSettingsService {
    constructor() {
        this.client = null;
        this.db = null;
        this.settingsCollection = null;
        this.auditCollection = null;
        this.runtimeStatusCollection = null;

        this.mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
        this.dbName = process.env.MONGODB_DATABASE || DEFAULT_DB_NAME;
        this.initialized = false;

        this.demoSettings = new Map();
        this.demoRuntime = new Map();
        this.demoAudit = [];
    }

    async initialize() {
        if (DEMO_MODE) {
            this.initialized = true;
            logger.info('Scanner alert settings initialized in DEMO mode (memory-only)');
            return;
        }

        if (this.initialized) {
            return;
        }

        this.client = new MongoClient(this.mongoUri, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 10000,
        });

        await this.client.connect();

        this.db = this.client.db(this.dbName);
        this.settingsCollection = this.db.collection('scanner_alert_settings');
        this.auditCollection = this.db.collection('scanner_alert_settings_audit');
        this.runtimeStatusCollection = this.db.collection('scanner_alert_runtime_status');

        await this._createIndexes();
        this.initialized = true;

        logger.info('ScannerAlertSettingsService initialized', {
            broker: BROKER_NAME,
            dbName: this.dbName,
            mode: 'production',
        });
    }

    async _createIndexes() {
        await this.settingsCollection.createIndex({ broker: 1, tenantId: 1 }, { unique: true });
        await this.settingsCollection.createIndex({ updated_at: -1 });
        await this.auditCollection.createIndex({ broker: 1, tenantId: 1, created_at: -1 });
        await this.runtimeStatusCollection.createIndex({ broker: 1, tenantId: 1 }, { unique: true });
        await this.runtimeStatusCollection.createIndex({ updated_at: -1 });
    }

    _resolveTenantId(tenantId = 'default') {
        return String(tenantId || 'default').trim().toLowerCase();
    }

    _toBoolean(raw, fallback = false) {
        if (typeof raw === 'boolean') {
            return raw;
        }

        if (typeof raw === 'string') {
            const normalized = raw.trim().toLowerCase();
            if (normalized === 'true') return true;
            if (normalized === 'false') return false;
        }

        if (typeof raw === 'number') {
            if (raw === 1) return true;
            if (raw === 0) return false;
        }

        return fallback;
    }

    _toInteger(raw, fallback) {
        const parsed = Number.parseInt(raw, 10);
        return Number.isFinite(parsed) ? parsed : fallback;
    }

    _clampIntervalSeconds(rawValue) {
        const interval = this._toInteger(rawValue, 300);
        return Math.max(30, Math.min(86400, interval));
    }

    _buildDefaults(tenantId) {
        const nowIso = new Date().toISOString();
        const intervalFromLegacyMinutes = this._toInteger(process.env.SCANNER_INTERVAL_MINUTES, 5) * 60;

        return {
            id: uuidv4(),
            broker: BROKER_NAME,
            tenantId,
            scanner_enabled: this._toBoolean(
                process.env.SCANNER_ALERTS_ENABLED,
                this._toBoolean(process.env.SCANNER_ENABLED, true)
            ),
            lists: {
                top_winners: this._toBoolean(
                    process.env.SCANNER_ALERTS_TOP_WINNERS_ENABLED,
                    true
                ),
                top_by_trade_count: this._toBoolean(
                    process.env.SCANNER_ALERTS_TOP_BY_TRADE_COUNT_ENABLED,
                    true
                ),
                new_accounts: this._toBoolean(
                    process.env.SCANNER_ALERTS_NEW_ACCOUNTS_ENABLED,
                    true
                ),
            },
            interval_seconds: this._clampIntervalSeconds(
                process.env.SCANNER_ALERTS_INTERVAL_SECONDS || intervalFromLegacyMinutes
            ),
            config_refresh_seconds: Math.max(
                3,
                this._toInteger(process.env.SCANNER_ALERTS_CONFIG_REFRESH_SECONDS, 10)
            ),
            created_at: nowIso,
            updated_at: nowIso,
        };
    }

    _sanitizeSettings(doc) {
        const lists = doc?.lists || {};

        return {
            scanner_enabled: this._toBoolean(doc?.scanner_enabled, true),
            lists: {
                top_winners: this._toBoolean(lists.top_winners, true),
                top_by_trade_count: this._toBoolean(lists.top_by_trade_count, true),
                new_accounts: this._toBoolean(lists.new_accounts, true),
            },
            interval_seconds: this._clampIntervalSeconds(doc?.interval_seconds),
            config_refresh_seconds: Math.max(
                3,
                this._toInteger(doc?.config_refresh_seconds, 10)
            ),
            created_at: doc?.created_at || null,
            updated_at: doc?.updated_at || null,
            id: doc?.id || uuidv4(),
            tenantId: doc?.tenantId || 'default',
            broker: doc?.broker || BROKER_NAME,
        };
    }

    _validatePayload(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            const error = new Error('Payload must be an object');
            error.code = 'VALIDATION_ERROR';
            throw error;
        }

        const errors = [];

        if (payload.scanner_enabled !== undefined && typeof payload.scanner_enabled !== 'boolean') {
            errors.push('scanner_enabled must be a boolean');
        }

        if (payload.lists !== undefined) {
            if (!payload.lists || typeof payload.lists !== 'object' || Array.isArray(payload.lists)) {
                errors.push('lists must be an object');
            } else {
                if (payload.lists.top_winners !== undefined && typeof payload.lists.top_winners !== 'boolean') {
                    errors.push('lists.top_winners must be a boolean');
                }
                if (payload.lists.top_by_trade_count !== undefined && typeof payload.lists.top_by_trade_count !== 'boolean') {
                    errors.push('lists.top_by_trade_count must be a boolean');
                }
                if (payload.lists.new_accounts !== undefined && typeof payload.lists.new_accounts !== 'boolean') {
                    errors.push('lists.new_accounts must be a boolean');
                }
            }
        }

        if (payload.interval_seconds !== undefined) {
            if (!Number.isInteger(payload.interval_seconds)) {
                errors.push('interval_seconds must be an integer');
            } else if (payload.interval_seconds < 30 || payload.interval_seconds > 86400) {
                errors.push('interval_seconds must be between 30 and 86400');
            }
        }

        if (errors.length > 0) {
            const error = new Error(errors.join('; '));
            error.code = 'VALIDATION_ERROR';
            throw error;
        }
    }

    _mergeSettings(current, payload) {
        const merged = {
            ...current,
            lists: {
                ...current.lists,
            },
        };

        if (payload.scanner_enabled !== undefined) {
            merged.scanner_enabled = payload.scanner_enabled;
        }

        if (payload.lists) {
            if (payload.lists.top_winners !== undefined) {
                merged.lists.top_winners = payload.lists.top_winners;
            }
            if (payload.lists.top_by_trade_count !== undefined) {
                merged.lists.top_by_trade_count = payload.lists.top_by_trade_count;
            }
            if (payload.lists.new_accounts !== undefined) {
                merged.lists.new_accounts = payload.lists.new_accounts;
            }
        }

        if (payload.interval_seconds !== undefined) {
            merged.interval_seconds = payload.interval_seconds;
        }

        return merged;
    }

    getAvailableLists(settings) {
        const source = settings || { lists: {} };

        return [
            {
                key: 'top_winners',
                name: 'Top Winners',
                enabled: this._toBoolean(source.lists?.top_winners, true),
            },
            {
                key: 'top_by_trade_count',
                name: 'Top by Trade Count',
                enabled: this._toBoolean(source.lists?.top_by_trade_count, true),
            },
            {
                key: 'new_accounts',
                name: 'New Accounts',
                enabled: this._toBoolean(source.lists?.new_accounts, true),
            },
        ];
    }

    _ensureDemoState(tenantId) {
        const resolvedTenantId = this._resolveTenantId(tenantId);
        if (!this.demoSettings.has(resolvedTenantId)) {
            this.demoSettings.set(resolvedTenantId, this._buildDefaults(resolvedTenantId));
            logger.info('Scanner alerts demo settings initialized', { tenantId: resolvedTenantId });
        }

        return this.demoSettings.get(resolvedTenantId);
    }

    async getSettings(tenantId = 'default') {
        if (DEMO_MODE) {
            const resolvedTenantId = this._resolveTenantId(tenantId);
            const settings = this._ensureDemoState(resolvedTenantId);
            return this._sanitizeSettings(settings);
        }

        if (!this.initialized) {
            await this.initialize();
        }

        const resolvedTenantId = this._resolveTenantId(tenantId);

        let settingsDoc = await this.settingsCollection.findOne({
            broker: BROKER_NAME,
            tenantId: resolvedTenantId,
        });

        if (!settingsDoc) {
            settingsDoc = this._buildDefaults(resolvedTenantId);
            await this.settingsCollection.insertOne(settingsDoc);
            logger.info('Scanner alert defaults created', {
                broker: BROKER_NAME,
                tenantId: resolvedTenantId,
            });
        }

        return this._sanitizeSettings(settingsDoc);
    }

    async updateSettings(tenantId = 'default', payload = {}, changedBy = 'system') {
        this._validatePayload(payload);

        if (DEMO_MODE) {
            const resolvedTenantId = this._resolveTenantId(tenantId);
            const current = this._ensureDemoState(resolvedTenantId);
            const merged = this._mergeSettings(current, payload);
            merged.updated_at = new Date().toISOString();

            this.demoSettings.set(resolvedTenantId, merged);

            const auditRecord = {
                id: uuidv4(),
                tenantId: resolvedTenantId,
                broker: BROKER_NAME,
                changed_by: changedBy || 'system',
                old_settings: current,
                new_settings: merged,
                created_at: merged.updated_at,
            };
            this.demoAudit.unshift(auditRecord);
            if (this.demoAudit.length > 200) {
                this.demoAudit.length = 200;
            }

            return this._sanitizeSettings(merged);
        }

        if (!this.initialized) {
            await this.initialize();
        }

        const resolvedTenantId = this._resolveTenantId(tenantId);
        const currentSettings = await this.getSettings(resolvedTenantId);
        const mergedSettings = this._mergeSettings(currentSettings, payload);
        const nowIso = new Date().toISOString();

        await this.settingsCollection.updateOne(
            { broker: BROKER_NAME, tenantId: resolvedTenantId },
            {
                $set: {
                    ...mergedSettings,
                    updated_at: nowIso,
                    config_refresh_seconds: this._toInteger(mergedSettings.config_refresh_seconds, 10),
                },
                $setOnInsert: {
                    id: currentSettings.id || uuidv4(),
                    broker: BROKER_NAME,
                    tenantId: resolvedTenantId,
                    created_at: currentSettings.created_at || nowIso,
                },
            },
            { upsert: true }
        );

        const updatedSettings = this._sanitizeSettings({
            ...mergedSettings,
            broker: BROKER_NAME,
            tenantId: resolvedTenantId,
            id: currentSettings.id || uuidv4(),
            created_at: currentSettings.created_at,
            updated_at: nowIso,
        });

        await this.auditCollection.insertOne({
            id: uuidv4(),
            broker: BROKER_NAME,
            tenantId: resolvedTenantId,
            changed_by: changedBy || 'system',
            old_settings: currentSettings,
            new_settings: updatedSettings,
            created_at: nowIso,
        });

        return updatedSettings;
    }

    async setEnabled(tenantId = 'default', enabled, changedBy = 'system') {
        return this.updateSettings(tenantId, { scanner_enabled: !!enabled }, changedBy);
    }

    async updateRuntimeStatus(tenantId = 'default', patch = {}) {
        if (DEMO_MODE) {
            const resolvedTenantId = this._resolveTenantId(tenantId);
            const current = this._ensureDemoState(resolvedTenantId);
            const currentStatus = this.demoRuntime.get(resolvedTenantId) || {};
            const nowIso = new Date().toISOString();
            this.demoRuntime.set(resolvedTenantId, {
                ...currentStatus,
                ...patch,
                broker: BROKER_NAME,
                tenantId: resolvedTenantId,
                interval_seconds: patch.interval_seconds || current.interval_seconds || 300,
                updated_at: nowIso,
            });
            return;
        }

        if (!this.initialized) {
            await this.initialize();
        }

        const resolvedTenantId = this._resolveTenantId(tenantId);
        const nowIso = new Date().toISOString();

        await this.runtimeStatusCollection.updateOne(
            { broker: BROKER_NAME, tenantId: resolvedTenantId },
            {
                $set: {
                    ...patch,
                    broker: BROKER_NAME,
                    tenantId: resolvedTenantId,
                    updated_at: nowIso,
                },
                $setOnInsert: {
                    id: uuidv4(),
                    created_at: nowIso,
                },
            },
            { upsert: true }
        );
    }

    async getStatus(tenantId = 'default') {
        const resolvedTenantId = this._resolveTenantId(tenantId);
        const settings = await this.getSettings(resolvedTenantId);

        let runtime = null;
        if (DEMO_MODE) {
            runtime = this.demoRuntime.get(resolvedTenantId) || {};
        } else {
            if (!this.initialized) {
                await this.initialize();
            }

            runtime = await this.runtimeStatusCollection.findOne({
                broker: BROKER_NAME,
                tenantId: resolvedTenantId,
            }) || {};
        }

        const activeLists = this.getAvailableLists(settings)
            .filter((item) => item.enabled)
            .map((item) => item.key);

        return {
            scanner_enabled: settings.scanner_enabled,
            interval_seconds: settings.interval_seconds,
            active_lists: activeLists,
            worker_alive: this._toBoolean(runtime?.worker_alive, false),
            last_run_at: runtime?.last_run_at || null,
            next_run_at: runtime?.next_run_at || null,
            last_run_status: runtime?.last_run_status || null,
            last_error: runtime?.last_error || null,
            updated_at: runtime?.updated_at || settings.updated_at || null,
        };
    }

    async getAuditLog(tenantId = 'default', limit = 20) {
        if (DEMO_MODE) {
            const resolvedTenantId = this._resolveTenantId(tenantId);
            return this.demoAudit
                .filter((item) => item.tenantId === resolvedTenantId)
                .slice(0, Math.max(1, Math.min(100, this._toInteger(limit, 20))));
        }

        if (!this.initialized) {
            await this.initialize();
        }

        const resolvedTenantId = this._resolveTenantId(tenantId);
        return this.auditCollection
            .find({ broker: BROKER_NAME, tenantId: resolvedTenantId })
            .sort({ created_at: -1 })
            .limit(Math.max(1, Math.min(100, this._toInteger(limit, 20))))
            .toArray();
    }
}

module.exports = new ScannerAlertSettingsService();
