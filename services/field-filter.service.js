/**
 * Field Filter Service
 * Controls which personal data fields are included in AI responses
 * 
 * Reads ALLOWED_PERSONAL_FIELDS from environment variable.
 * Trading fields (login, group, balance, equity, etc.) are always included.
 * Personal fields (name, email, phone, country, etc.) are only included
 * if explicitly listed in ALLOWED_PERSONAL_FIELDS.
 * 
 * Default: all personal fields are HIDDEN (safe default).
 * 
 * ENV example: ALLOWED_PERSONAL_FIELDS=name,email,country
 */

const logger = require('../utils/logger');

// All personal fields that can be toggled per broker
const ALL_PERSONAL_FIELDS = [
    'name',
    'email',
    'phone',
    'country',
    'city',
    'address',
    'comment',
];

// Mapping: our field name → Backend Master field name(s)
const FIELD_SOURCE_MAP = {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    country: 'Country',
    city: 'City',
    address: 'Address',
    comment: 'Comment',
};

class FieldFilterService {
    constructor() {
        this.allowedFields = this._parseAllowedFields();
        logger.info('FieldFilterService initialized', {
            allowedPersonalFields: this.allowedFields.length > 0 ? this.allowedFields : 'none',
        });
    }

    /**
     * Refresh allowed fields from current environment.
     * Useful when deployment updates env vars without code restart assumptions.
     */
    _refreshAllowedFields() {
        const parsed = this._parseAllowedFields();
        const oldValue = this.allowedFields.join(',');
        const newValue = parsed.join(',');

        if (oldValue !== newValue) {
            logger.info('ALLOWED_PERSONAL_FIELDS updated at runtime', {
                previous: oldValue || 'none',
                current: newValue || 'none'
            });
            this.allowedFields = parsed;
        }
    }

    /**
     * Parse ALLOWED_PERSONAL_FIELDS from environment
     * @returns {string[]} List of allowed field names (lowercase)
     */
    _parseAllowedFields() {
        const envValue = process.env.ALLOWED_PERSONAL_FIELDS;
        if (!envValue || envValue.trim() === '') {
            return [];
        }

        const fields = envValue
            .split(',')
            .map(f => f.trim().toLowerCase())
            .filter(f => ALL_PERSONAL_FIELDS.includes(f));

        const unknown = envValue
            .split(',')
            .map(f => f.trim().toLowerCase())
            .filter(f => f && !ALL_PERSONAL_FIELDS.includes(f));

        if (unknown.length > 0) {
            logger.warn('Unknown fields in ALLOWED_PERSONAL_FIELDS (ignored)', { unknown });
        }

        return fields;
    }

    /**
     * Check if a personal field is allowed for this broker
     * @param {string} fieldName - Field name (lowercase)
     * @returns {boolean}
     */
    isFieldAllowed(fieldName) {
        this._refreshAllowedFields();
        return this.allowedFields.includes(fieldName.toLowerCase());
    }

    /**
     * Add allowed personal fields from a raw Backend Master account object
     * to the formatted account object.
     * 
     * @param {object} formatted - Already formatted account object (login, group, balance, etc.)
     * @param {object} raw - Raw Backend Master account object with all fields
     * @returns {object} formatted object with personal fields added (if allowed)
     */
    enrichAccountData(formatted, raw) {
        this._refreshAllowedFields();

        if (!raw || this.allowedFields.length === 0) {
            return formatted;
        }

        for (const field of this.allowedFields) {
            const sourceField = FIELD_SOURCE_MAP[field];
            if (sourceField && raw[sourceField] !== undefined && raw[sourceField] !== null) {
                formatted[field] = raw[sourceField];
            }
        }

        return formatted;
    }

    /**
     * Get list of all available personal fields (for documentation/API)
     */
    getAllPersonalFields() {
        return ALL_PERSONAL_FIELDS;
    }

    /**
     * Get currently allowed fields for this broker instance
     */
    getAllowedFields() {
        this._refreshAllowedFields();
        return this.allowedFields;
    }
}

module.exports = new FieldFilterService();
