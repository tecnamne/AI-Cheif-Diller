const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const scannerAlertSettingsService = require('../services/scanner-alert-settings.service');

function getTenantId(req) {
    return req.headers['x-tenant-id'] || req.query.tenantId || 'default';
}

function getChangedBy(req) {
    return req.headers['x-user-id'] || req.headers['x-user-email'] || 'system';
}

/**
 * GET /api/scanner-alerts/settings
 * Returns current scanner alerts settings.
 */
router.get('/settings', async (req, res) => {
    try {
        const tenantId = getTenantId(req);
        const settings = await scannerAlertSettingsService.getSettings(tenantId);

        res.json(settings);
    } catch (error) {
        logger.error('Get scanner-alert settings error', { error: error.message });
        res.status(500).json({ error: 'Failed to get scanner alerts settings' });
    }
});

/**
 * PUT /api/scanner-alerts/settings
 * Updates scanner alerts settings.
 */
router.put('/settings', async (req, res) => {
    try {
        const tenantId = getTenantId(req);
        const changedBy = getChangedBy(req);
        const payload = req.body || {};

        const updated = await scannerAlertSettingsService.updateSettings(tenantId, payload, changedBy);

        res.json(updated);
    } catch (error) {
        if (error.code === 'VALIDATION_ERROR') {
            return res.status(400).json({ error: error.message });
        }

        logger.error('Update scanner-alert settings error', { error: error.message });
        res.status(500).json({ error: 'Failed to update scanner alerts settings' });
    }
});

/**
 * PATCH /api/scanner-alerts/settings/enabled
 * Enables/disables scanner alerts.
 */
router.patch('/settings/enabled', async (req, res) => {
    try {
        const tenantId = getTenantId(req);
        const changedBy = getChangedBy(req);
        const enabled = req.body?.enabled;

        if (typeof enabled !== 'boolean') {
            return res.status(400).json({ error: 'enabled must be a boolean' });
        }

        const updated = await scannerAlertSettingsService.setEnabled(tenantId, enabled, changedBy);
        res.json(updated);
    } catch (error) {
        logger.error('Patch scanner-alert enabled error', { error: error.message });
        res.status(500).json({ error: 'Failed to update scanner enabled setting' });
    }
});

/**
 * GET /api/scanner-alerts/lists
 * Returns available scanner lists with enabled state.
 */
router.get('/lists', async (req, res) => {
    try {
        const tenantId = getTenantId(req);
        const settings = await scannerAlertSettingsService.getSettings(tenantId);
        const lists = scannerAlertSettingsService.getAvailableLists(settings);

        res.json(lists);
    } catch (error) {
        logger.error('Get scanner-alert lists error', { error: error.message });
        res.status(500).json({ error: 'Failed to get scanner alerts lists' });
    }
});

/**
 * GET /api/scanner-alerts/status
 * Returns scanner alerts runtime status.
 */
router.get('/status', async (req, res) => {
    try {
        const tenantId = getTenantId(req);
        const status = await scannerAlertSettingsService.getStatus(tenantId);

        res.json(status);
    } catch (error) {
        logger.error('Get scanner-alert status error', { error: error.message });
        res.status(500).json({ error: 'Failed to get scanner alerts status' });
    }
});

module.exports = router;
