/**
 * Utility Functions for Catering System
 */

const Logger = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',

    log: function (level, message, data = null) {
        const timestamp = new Date().toISOString();
        const icon = level === this.INFO ? 'ℹ️' : level === this.WARN ? '⚠️' : '❌';

        console.log(`[${timestamp}] ${icon} ${level}: ${message}`);
        if (data) {
            console.log(data);
        }

        // Ideally, in a production app, we might send this to a remote logging service here.
    },

    info: function (message, data) {
        this.log(this.INFO, message, data);
    },

    warn: function (message, data) {
        this.log(this.WARN, message, data);
    },

    error: function (message, data) {
        this.log(this.ERROR, message, data);
    }
};

/**
 * Format currency to INR
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Expose to window
window.Logger = Logger;
window.formatCurrency = formatCurrency;
