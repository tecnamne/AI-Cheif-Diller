/**
 * Scanner API Routes - Multi-Tenant
 * Endpoints for arbitrage scanner control and monitoring
 * 
 * All endpoints support tenantId via:
 *   1. X-Tenant-ID header (recommended)
 *   2. Query parameter ?tenantId=xxx
 */

const express = require('express');
const router = express.Router();
const scannerModule = require('../services/arbitrage-scanner.service');
const schedulerService = require('../services/scheduler.service');
const alertService = require('../services/alert.service');
const logger = require('../utils/logger');

// Helper to extract tenantId from request
function getTenantId(req) {
    return req.headers['x-tenant-id'] || req.query.tenantId || 'default';
}

/**
 * GET /api/scanner/status
 * Get scanner and scheduler status (global)
 */
router.get('/status', (req, res) => {
    try {
        const status = schedulerService.getStatus();
        res.json(status);
    } catch (error) {
        logger.error('Scanner status error', { error: error.message });
        res.status(500).json({ error: 'Failed to get scanner status' });
    }
});

/**
 * GET /api/scanner/tenants
 * Get list of configured tenants
 */
router.get('/tenants', (req, res) => {
    try {
        const tenants = scannerModule.getConfiguredTenants();
        const tenantDetails = tenants.map(tenantId => ({
            tenantId,
                connector: scannerModule.getPlatformUrl
                ? scannerModule.getPlatformUrl(tenantId)
                : null,
        }));
        
        res.json({
            count: tenants.length,
            tenants: tenantDetails
        });
    } catch (error) {
        logger.error('Get tenants error', { error: error.message });
        res.status(500).json({ error: 'Failed to get tenants' });
    }
});

/**
 * POST /api/scanner/run
 * Manually trigger a scan for a specific tenant or ALL tenants
 * Query: ?tenantId=xxx (optional, if not provided - scans all tenants)
 */
router.post('/run', async (req, res) => {
    try {
        const tenantId = req.query.tenantId || req.body.tenantId;
        
        logger.info('Manual scan requested', { 
            ip: req.ip,
            tenantId: tenantId || 'ALL' 
        });
        
        const result = await schedulerService.triggerScan(tenantId || null);
        
        res.json({
            message: tenantId ? `Scan completed for tenant ${tenantId}` : 'Scan completed for all tenants',
            result
        });
    } catch (error) {
        logger.error('Manual scan error', { error: error.message });
        res.status(500).json({ error: 'Scan failed', details: error.message });
    }
});

/**
 * GET /api/scanner/alerts
 * Get current alerts for a tenant
 */
router.get('/alerts', (req, res) => {
    try {
        const tenantId = getTenantId(req);
        const stats = alertService.getStats(tenantId);
        
        res.json({
            tenantId,
            ...stats
        });
    } catch (error) {
        logger.error('Get alerts error', { error: error.message });
        res.status(500).json({ error: 'Failed to get alerts' });
    }
});

/**
 * GET /api/scanner/results
 * Get last scan results for a tenant
 */
router.get('/results', (req, res) => {
    try {
        const tenantId = getTenantId(req);
        const scanner = scannerModule.getScanner(tenantId);
        const results = scanner.lastScanResults || { confirmed: [], suspicious: [] };
        
        res.json({
            tenantId,
            lastScanTime: scanner.lastScanTime,
            ...results
        });
    } catch (error) {
        logger.error('Get results error', { error: error.message });
        res.status(500).json({ error: 'Failed to get results' });
    }
});

/**
 * POST /api/scanner/analyze/:login
 * Analyze a specific account for arbitrage patterns
 */
router.post('/analyze/:login', async (req, res) => {
    try {
        const login = parseInt(req.params.login);
        const tenantId = getTenantId(req);
        
        if (isNaN(login)) {
            return res.status(400).json({ error: 'Invalid login parameter' });
        }
        
        logger.info('Analyzing specific account', { login, tenantId });
        
        const scanner = scannerModule.getScanner(tenantId);
        const result = await scanner.analyzeSpecificAccount(login);
        
        res.json({
            tenantId,
            ...result
        });
    } catch (error) {
        logger.error('Account analysis error', { error: error.message });
        res.status(500).json({ error: 'Analysis failed', details: error.message });
    }
});

/**
 * GET /api/scanner/watchlist
 * Get accounts in watchlist for a tenant
 */
router.get('/watchlist', (req, res) => {
    try {
        const tenantId = getTenantId(req);
        const scanner = scannerModule.getScanner(tenantId);
        const watchlist = scanner.getWatchlist();
        
        res.json({
            tenantId,
            count: watchlist.length,
            accounts: watchlist
        });
    } catch (error) {
        logger.error('Get watchlist error', { error: error.message });
        res.status(500).json({ error: 'Failed to get watchlist' });
    }
});

/**
 * POST /api/scanner/watchlist/check
 * Check all accounts in watchlist for a tenant
 */
router.post('/watchlist/check', async (req, res) => {
    try {
        const tenantId = getTenantId(req);
        logger.info('Watchlist check requested', { tenantId });
        
        const scanner = scannerModule.getScanner(tenantId);
        const result = await scanner.checkWatchlist();
        
        res.json({
            tenantId,
            ...result
        });
    } catch (error) {
        logger.error('Watchlist check error', { error: error.message });
        res.status(500).json({ error: 'Watchlist check failed', details: error.message });
    }
});

/**
 * POST /api/scanner/watchlist/:login
 * Add account to watchlist for a tenant
 */
router.post('/watchlist/:login', (req, res) => {
    try {
        const login = parseInt(req.params.login);
        const tenantId = getTenantId(req);
        
        if (isNaN(login)) {
            return res.status(400).json({ error: 'Invalid login parameter' });
        }
        
        const scanner = scannerModule.getScanner(tenantId);
        scanner.addToWatchlist(login);
        
        res.json({
            message: 'Account added to watchlist',
            tenantId,
            login,
            watchlist: scanner.getWatchlist()
        });
    } catch (error) {
        logger.error('Add to watchlist error', { error: error.message });
        res.status(500).json({ error: 'Failed to add to watchlist' });
    }
});

/**
 * DELETE /api/scanner/watchlist/:login
 * Remove account from watchlist for a tenant
 */
router.delete('/watchlist/:login', (req, res) => {
    try {
        const login = parseInt(req.params.login);
        const tenantId = getTenantId(req);
        
        if (isNaN(login)) {
            return res.status(400).json({ error: 'Invalid login parameter' });
        }
        
        const scanner = scannerModule.getScanner(tenantId);
        const removed = scanner.removeFromWatchlist(login);
        
        if (removed) {
            res.json({
                message: 'Account removed from watchlist',
                tenantId,
                login,
                watchlist: scanner.getWatchlist()
            });
        } else {
            res.status(404).json({ error: 'Account not in watchlist' });
        }
    } catch (error) {
        logger.error('Remove from watchlist error', { error: error.message });
        res.status(500).json({ error: 'Failed to remove from watchlist' });
    }
});

module.exports = router;
