/**
 * Freshchat JWT Authentication Middleware
 * 
 * In DEMO mode authentication is optional and fallback demo identity is assigned.
 */

let jwt;
try {
    jwt = require('jsonwebtoken');
} catch (e) {
    console.warn('[FRESHCHAT-JWT] jsonwebtoken is not installed');
    jwt = null;
}

const logger = require('../utils/logger');
const DEMO_MODE = process.env.DEMO_MODE === 'true';
const DEMO_USER_ID = process.env.DEMO_USER_ID || 'demo-user';

function getTokenPreview(token) {
    if (!token) {
        return null;
    }

    const value = String(token);
    return `${value.slice(0, 12)}... (len=${value.length})`;
}

function getRequestDebugContext(req) {
    const authHeader = req.headers?.authorization || null;
    const authJwtHeader = req.headers?.['authorization-jwt'] || req.headers?.['Authorization-Jwt'] || null;

    return {
        method: req.method,
        path: req.originalUrl || req.path,
        query: req.query || {},
        body: req.body || {},
        headers: {
            host: req.headers?.host,
            origin: req.headers?.origin,
            referer: req.headers?.referer,
            userAgent: req.headers?.['user-agent'],
            hasAuthorization: !!authHeader,
            hasAuthorizationJwt: !!authJwtHeader,
            authorizationPreview: getTokenPreview(authHeader),
            authorizationJwtPreview: getTokenPreview(authJwtHeader)
        }
    };
}

const JWT_SECRET = process.env.FRESHCHAT_JWT_SECRET || process.env.JWT_SECRET;

function assignDemoIdentity(req) {
    req.userId = req.userId || DEMO_USER_ID;
    req.user = req.user || {
        id: req.userId,
        email: null,
        firstName: null,
        lastName: null,
        brandName: null,
        referenceId: null,
    };
}

/**
 * Check if Freshchat JWT auth is enabled
 */
function isEnabled() {
    return !DEMO_MODE && jwt !== null && JWT_SECRET;
}

/**
 * Extract token from Authorization header
 * Supports: Authorization, Authorization-Jwt, authorization-jwt headers
 * @param {Request} req - Express request
 * @returns {string|null} Token or null
 */
function extractToken(req) {
    // Check multiple possible header names (case-insensitive in Express)
    const authHeader = req.headers.authorization || 
                       req.headers['authorization-jwt'] || 
                       req.headers['Authorization-Jwt'];
    
    if (!authHeader) {
        return null;
    }
    
    // Support both "Bearer <token>" and just "<token>"
    if (authHeader.startsWith('Bearer ')) {
        return authHeader.slice(7);
    }
    
    return authHeader;
}

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token
 * @returns {object|null} Decoded payload or null
 */
function verifyToken(token) {
    if (!jwt || !JWT_SECRET) {
        return null;
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        logger.warn('[FRESHCHAT-JWT] Token verification failed', { 
            error: error.message,
            name: error.name 
        });
        return null;
    }
}

/**
 * Decode JWT payload without signature verification.
 * Used only as a fallback in local/dev when JWT secret is not configured.
 * @param {string} token - JWT token (raw or Bearer)
 * @returns {object|null} decoded payload or null
 */
function decodeTokenPayloadUnsafe(token) {
    if (!token) {
        return null;
    }

    try {
        // If jsonwebtoken package is available, prefer built-in decode.
        if (jwt && typeof jwt.decode === 'function') {
            return jwt.decode(token);
        }
    } catch (_error) {
        // ignore and fallback to manual parse
    }

    try {
        const raw = token.startsWith('Bearer ') ? token.slice(7) : token;
        const parts = raw.split('.');
        if (parts.length < 2) {
            return null;
        }

        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
        const json = Buffer.from(padded, 'base64').toString('utf8');
        return JSON.parse(json);
    } catch (_error) {
        return null;
    }
}

/**
 * Middleware: Require valid JWT token
 * Extracts freshchat_uuid as userId and attaches user info to request
 */
function requireAuth(req, res, next) {
    if (!isEnabled()) {
        assignDemoIdentity(req);
        return next();
    }
    
    const token = extractToken(req);
    
    if (!token) {
        logger.warn('[FRESHCHAT-JWT] No token provided', { 
            path: req.path,
            ip: req.ip,
            request: getRequestDebugContext(req)
        });
        return res.status(401).json({
            error: 'Authentication required',
            message: 'No authorization token provided'
        });
    }
    
    const decoded = verifyToken(token);
    
    if (!decoded) {
        return res.status(401).json({
            error: 'Invalid token',
            message: 'Token verification failed'
        });
    }
    
    // Extract user info from token
    const userId = decoded.freshchat_uuid;
    
    if (!userId) {
        logger.warn('[FRESHCHAT-JWT] Token missing freshchat_uuid', {
            decoded,
            request: getRequestDebugContext(req)
        });
        return res.status(401).json({
            error: 'Invalid token',
            message: 'Token missing required freshchat_uuid field'
        });
    }
    
    // Attach user info to request
    req.userId = userId;
    req.user = {
        id: userId,
        email: decoded.email,
        firstName: decoded.first_name,
        lastName: decoded.last_name,
        brandName: decoded.cf_brand_name,
        referenceId: decoded.reference_id
    };
    
    logger.debug('[FRESHCHAT-JWT] User authenticated', { 
        userId,
        email: decoded.email,
        brandName: decoded.cf_brand_name
    });
    
    next();
}

/**
 * Middleware: Optional JWT auth
 * If token provided - validates and extracts user info
 * If no token - continues without user info (uses userId from body)
 */
function optionalAuth(req, res, next) {
    // Skip if JWT not configured
    if (!isEnabled()) {
        assignDemoIdentity(req);
        return next();
    }
    
    const token = extractToken(req);
    
    if (!token) {
        // No token - continue without auth
        return next();
    }
    
    const decoded = verifyToken(token);
    
    if (decoded && decoded.freshchat_uuid) {
        // Valid token - attach user info
        req.userId = decoded.freshchat_uuid;
        req.user = {
            id: decoded.freshchat_uuid,
            email: decoded.email,
            firstName: decoded.first_name,
            lastName: decoded.last_name,
            brandName: decoded.cf_brand_name,
            referenceId: decoded.reference_id
        };
        
        logger.debug('[FRESHCHAT-JWT] Optional auth - user authenticated', { 
            userId: req.userId,
            email: decoded.email 
        });
    }
    
    next();
}

/**
 * Get user info from request (after auth middleware)
 * @param {Request} req - Express request
 * @returns {object|null} User info or null
 */
function getUserInfo(req) {
    return req.user || null;
}

/**
 * Get userId from request - prioritizes JWT, falls back to body
 * @param {Request} req - Express request
 * @returns {string|null} userId
 */
function getUserId(req) {
    if (req && req.userId) {
        return req.userId;
    }

    if (DEMO_MODE) {
        return DEMO_USER_ID;
    }

    // Priority 1: From JWT token
    // Priority 2: From JWT payload without verification (local/dev fallback)
    // Needed when JWT secret is not configured but token is present.
    const token = extractToken(req);
    if (token) {
        const decoded = decodeTokenPayloadUnsafe(token);
        if (decoded && decoded.freshchat_uuid) {
            return decoded.freshchat_uuid;
        }
    }
    
    // Priority 3: From request body
    if (req.body && req.body.userId) {
        return req.body.userId;
    }
    
    // Priority 4: From query params
    if (req.query && req.query.userId) {
        return req.query.userId;
    }

    logger.warn('[FRESHCHAT-JWT] Unable to resolve userId from request', getRequestDebugContext(req));

    return null;
}

module.exports = {
    isEnabled,
    extractToken,
    verifyToken,
    requireAuth,
    optionalAuth,
    getUserInfo,
    getUserId
};
