const { body, validationResult } = require('express-validator');
const logger = require('../utils/logger');
const DEMO_MODE = process.env.DEMO_MODE === 'true';

/**
 * Validation rules for chat message
 */
const validateChatMessage = [
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 1, max: 2000 })
        .withMessage('Message must be between 1 and 2000 characters'),
];

if (!DEMO_MODE) {
    validateChatMessage.push(
        body('sessionId')
            .trim()
            .notEmpty()
            .withMessage('Session ID is required')
            .isUUID()
            .withMessage('Invalid session ID format')
    );
} else {
    validateChatMessage.push(
        body('sessionId')
            .optional({ checkFalsy: true })
            .trim()
            .isUUID()
            .withMessage('Session ID must be a UUID')
    );
}

/**
 * Validation rules for session creation
 */
const validateSessionCreation = [
    body('metadata')
        .optional()
        .isObject()
        .withMessage('Metadata must be an object'),
];

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => ({
            field: err.path,
            message: err.msg,
        }));
        
        logger.warn('Validation failed', {
            ip: req.ip,
            path: req.path,
            errors: errorMessages,
        });
        
        return res.status(400).json({
            error: 'Validation failed',
            details: errorMessages,
        });
    }
    
    next();
};

/**
 * Sanitize user input to prevent XSS and injection attacks
 */
const sanitizeInput = (req, res, next) => {
    if (req.body.message) {
        // Remove any potentially harmful characters or scripts
        req.body.message = req.body.message
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
            .trim();
    }
    next();
};

/**
 * Check content for spam or abusive patterns
 */
const contentModerationMiddleware = (req, res, next) => {
    if (req.body.message) {
        const message = req.body.message.toLowerCase();
        
        // Basic spam patterns
        const spamPatterns = [
            /(.)\1{10,}/, // Repeated characters (more than 10 times)
            /https?:\/\/[^\s]+/g, // Multiple URLs (count them)
        ];
        
        // Check for repeated characters
        if (spamPatterns[0].test(message)) {
            logger.warn('Spam detected: repeated characters', {
                ip: req.ip,
                sessionId: req.body.sessionId,
            });
            return res.status(400).json({
                error: 'Message appears to be spam. Please send a valid question.',
            });
        }
        
        // Check for too many URLs (more than 2)
        const urlMatches = message.match(spamPatterns[1]);
        if (urlMatches && urlMatches.length > 2) {
            logger.warn('Spam detected: too many URLs', {
                ip: req.ip,
                sessionId: req.body.sessionId,
            });
            return res.status(400).json({
                error: 'Message contains too many links. Please send a valid question.',
            });
        }
    }
    
    next();
};

module.exports = {
    validateChatMessage,
    validateSessionCreation,
    handleValidationErrors,
    sanitizeInput,
    contentModerationMiddleware,
};
