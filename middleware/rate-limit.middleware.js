const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

/**
 * Rate limiter for chat endpoints
 * Prevents abuse and protects against DoS attacks
 */
const chatRateLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10, // 10 requests per window
    message: {
        error: 'Too many requests from this IP, please try again later.',
        retryAfter: '1 minute'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        logger.warn('Rate limit exceeded', {
            ip: req.ip,
            path: req.path,
            userAgent: req.get('user-agent')
        });
        res.status(429).json({
            error: 'Too many requests from this IP, please try again later.',
            retryAfter: '1 minute'
        });
    },
    skip: (req) => {
        // Skip rate limiting for health check endpoints
        return req.path === '/health' || req.path === '/';
    },
});

/**
 * Stricter rate limiter for session creation
 */
const sessionRateLimiter = rateLimit({
    windowMs: 3600000, // 1 hour
    max: 100, // 100 new sessions per hour per IP (increased for testing)
    message: {
        error: 'Too many sessions created from this IP, please try again later.',
        retryAfter: '1 hour'
    },
    handler: (req, res) => {
        logger.warn('Session creation rate limit exceeded', {
            ip: req.ip,
            path: req.path,
        });
        res.status(429).json({
            error: 'Too many sessions created from this IP, please try again later.',
            retryAfter: '1 hour'
        });
    },
});

module.exports = {
    chatRateLimiter,
    sessionRateLimiter,
};
