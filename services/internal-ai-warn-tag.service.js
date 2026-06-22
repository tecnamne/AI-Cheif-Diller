const logger = require('../utils/logger');
const databaseService = require('./database.service');

const DEMO_MODE = process.env.DEMO_MODE === 'true';

class InternalAiWarnTagService {
    constructor() {
        this.collectionName = 'internal_ai_warn_tags';
        this.collection = null;

        this.demoAssignments = new Map();
    }

    async initialize() {
        if (DEMO_MODE) {
            logger.info('Internal AI warn tag service initialized in DEMO mode (memory-only)');
            return;
        }

        if (this.collection) {
            return;
        }

        if (!databaseService.db) {
            await databaseService.initialize();
        }

        this.collection = databaseService.db.collection(this.collectionName);
        await this.collection.createIndex({login: 1}, {unique: true});
        await this.collection.createIndex({active: 1, updatedAt: -1});
    }

    async markAssigned(login, meta = {}) {
        const loginNum = Number(login);
        if (!Number.isFinite(loginNum)) {
            throw new Error('Invalid login for internal AI warn tag');
        }

        if (DEMO_MODE) {
            this.demoAssignments.set(loginNum, {
                login: loginNum,
                assigned: true,
                source: meta.source || 'scanner',
                reason: meta.reason || null,
                updatedAt: new Date().toISOString(),
                lastDetectedAt: meta.detectedAt || new Date().toISOString(),
            });

            return { assigned: true, login: loginNum, mode: 'demo' };
        }

        await this.initialize();
        const now = new Date();

        await this.collection.updateOne(
            {login: loginNum},
            {
                $set: {
                    active: true,
                    source: meta.source || 'scanner',
                    node: meta.node || null,
                    reason: meta.reason || null,
                    updatedAt: now,
                    lastDetectedAt: meta.detectedAt || now,
                },
                $setOnInsert: {
                    login: loginNum,
                    createdAt: now,
                },
            },
            {upsert: true},
        );

        return {assigned: true, login: loginNum};
    }

    async unassign(login, meta = {}) {
        const loginNum = Number(login);
        if (!Number.isFinite(loginNum)) {
            throw new Error('Invalid login for internal AI warn tag');
        }

        if (DEMO_MODE) {
            const value = this.demoAssignments.get(loginNum);
            if (value) {
                value.assigned = false;
                value.updatedAt = new Date().toISOString();
                value.source = meta.source || 'manual';
                this.demoAssignments.set(loginNum, value);
            }

            return { unassigned: true, login: loginNum, mode: 'demo' };
        }

        await this.initialize();
        const now = new Date();

        await this.collection.updateOne(
            {login: loginNum},
            {
                $set: {
                    active: false,
                    source: meta.source || 'manual',
                    updatedAt: now,
                },
                $setOnInsert: {
                    login: loginNum,
                    createdAt: now,
                },
            },
            {upsert: true},
        );

        return {unassigned: true, login: loginNum};
    }

    async isAssigned(login) {
        const loginNum = Number(login);
        if (!Number.isFinite(loginNum)) {
            return false;
        }

        if (DEMO_MODE) {
            const value = this.demoAssignments.get(loginNum);
            return !!value && value.assigned !== false;
        }

        await this.initialize();
        const doc = await this.collection.findOne({login: loginNum, active: true}, {projection: {_id: 0}});
        return !!doc;
    }
}

module.exports = new InternalAiWarnTagService();
