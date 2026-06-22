/**
 * JWT Authentication Middleware
 * 
 * Provides JWT-based authentication for AI chat API.
 * Generates tokens and validates requests.
 * 
 * Security: Tokens are signed with a secret key and contain userId.
 * This prevents users from accessing other users' sessions.
 */

let jwt;
try {
    jwt = require('jsonwebtoken');
} catch (e) {
    console.warn('jsonwebtoken not installed, JWT auth disabled. Run: npm install jsonwebtoken');
    jwt = null;
}

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

// Path to store auto-generated JWT secret
const JWT_SECRET_FILE = path.join(__dirname, '../data/jwt-secret.key');

/**
 * Get or generate JWT secret
 * - If JWT_SECRET env var is set, use it
 * - Otherwise, load from file or generate new one
 * This allows deployment without .env configuration
 */
function getJwtSecret() {
    // First priority: environment variable
    if (process.env.JWT_SECRET) {
        return process.env.JWT_SECRET;
    }

    // Second priority: saved secret file
    try {
        const dataDir = path.dirname(JWT_SECRET_FILE);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        if (fs.existsSync(JWT_SECRET_FILE)) {
            const secret = fs.readFileSync(JWT_SECRET_FILE, 'utf8').trim();
            if (secret.length >= 32) {
                logger.info('JWT secret loaded from file');
                return secret;
            }
        }

        // Generate new secret and save it
        const newSecret = crypto.randomBytes(64).toString('hex');
        fs.writeFileSync(JWT_SECRET_FILE, newSecret, { mode: 0o600 }); // Read/write only by owner
        logger.info('New JWT secret generated and saved');
        return newSecret;
    } catch (error) {
        logger.error('Failed to load/generate JWT secret, using fallback', { error: error.message });
        // Fallback: generate in-memory secret (will change on restart)
        return crypto.randomBytes(64).toString('hex');
    }
}

const JWT_SECRET = jwt ? getJwtSecret() : null;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Check if JWT is available
 */
function isJwtEnabled() {
    return jwt !== null && JWT_SECRET !== null;
}

/**
 * Generate JWT token for a user
 * @param {string} userId - User identifier
 * @param {object} additionalClaims - Additional claims to include in token
 * @returns {string} JWT token or empty string if JWT disabled
 */
function generateToken(userId, additionalClaims = {}) {
    if (!isJwtEnabled()) {
        logger.warn('JWT disabled, returning empty token');
        return '';
    }

    const payload = {
        userId,
        ...additionalClaims,
        iat: Math.floor(Date.now() / 1000),
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {object|null} Decoded token payload or null if invalid
 */
function verifyToken(token) {
    if (!isJwtEnabled()) {
        return null;
    }

    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        logger.debug('Token verification failed', { error: error.message });
        return null;
    }
}

/**
 * Extract token from Authorization header
 * @param {object} req - Express request object
 * @returns {string|null} Token or null
 */
function extractToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return null;
    }

    // Support "Bearer <token>" format
    if (authHeader.startsWith('Bearer ')) {
        return authHeader.slice(7);
    }

    return authHeader;
}

/**
 * Authentication middleware
 * Validates JWT token and attaches user info to request.
 * 
 * Backward compatibility: If no token provided, falls back to userId from body/query.
 * This allows gradual migration without breaking existing functionality.
 */
function authMiddleware(req, res, next) {
    const token = extractToken(req);

    if (token) {
        // Token provided - verify it
        const decoded = verifyToken(token);
        if (decoded) {
            // Valid token - use userId from token
            req.authenticatedUserId = decoded.userId;
            req.isAuthenticated = true;
            logger.debug('Authenticated request', { userId: decoded.userId });
        } else {
            // Invalid token - reject
            return res.status(401).json({
                error: 'Invalid or expired token',
                code: 'INVALID_TOKEN',
            });
        }
    } else {
        // No token - backward compatibility mode
        // Use userId from request body or query (legacy behavior)
        const legacyUserId = req.body?.userId || req.query?.userId;
        if (legacyUserId) {
            req.authenticatedUserId = legacyUserId;
            req.isAuthenticated = false; // Mark as not authenticated (legacy)
            logger.debug('Legacy request without token', { userId: legacyUserId });
        }
        // If no userId at all, that's okay - some endpoints don't require it
    }

    next();
}

/**
 * Strict authentication middleware
 * Requires valid JWT token - no backward compatibility fallback.
 * Use this for sensitive endpoints after migration is complete.
 */
function strictAuthMiddleware(req, res, next) {
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({
            error: 'Authentication required',
            code: 'NO_TOKEN',
        });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({
            error: 'Invalid or expired token',
            code: 'INVALID_TOKEN',
        });
    }

    req.authenticatedUserId = decoded.userId;
    req.isAuthenticated = true;
    next();
}

/**
 * Validate that request userId matches authenticated userId
 * Prevents accessing other users' data
 */
function validateUserOwnership(req, res, next) {
    const requestUserId = req.body?.userId || req.query?.userId || req.params?.userId;
    const authenticatedUserId = req.authenticatedUserId;

    // If authenticated with token, ensure userId matches
    if (req.isAuthenticated && requestUserId && requestUserId !== authenticatedUserId) {
        logger.warn('User ownership mismatch', {
            requestUserId,
            authenticatedUserId,
            path: req.path,
        });
        return res.status(403).json({
            error: 'Access denied: userId mismatch',
            code: 'USER_MISMATCH',
        });
    }

    // Override request userId with authenticated userId for security
    if (authenticatedUserId) {
        if (req.body) req.body.userId = authenticatedUserId;
        if (req.query) req.query.userId = authenticatedUserId;
    }

    next();
}

module.exports = {
    generateToken,
    verifyToken,
    extractToken,
    authMiddleware,
    strictAuthMiddleware,
    validateUserOwnership,
    isJwtEnabled,
    JWT_SECRET,
    JWT_EXPIRES_IN,
};
