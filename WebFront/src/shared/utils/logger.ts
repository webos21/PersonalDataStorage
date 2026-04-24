/**
 * Logger Utility
 * - Wraps console methods to prevent output in production environment.
 * - Provides consistent log formatting.
 */
const isProduction = import.meta.env.PROD;

type LoggerArgs = unknown[];

interface Logger {
    log: (...args: LoggerArgs) => void;
    info: (...args: LoggerArgs) => void;
    warn: (...args: LoggerArgs) => void;
    error: (...args: LoggerArgs) => void;
    debug: (...args: LoggerArgs) => void;
}

const logger: Logger = {
    log: (...args) => {
        if (!isProduction) {
            console.log('[LOG]', ...args);
        }
    },
    info: (...args) => {
        if (!isProduction) {
            console.info('[INFO]', ...args);
        }
    },
    warn: (...args) => {
        if (!isProduction) {
            console.warn('[WARN]', ...args);
        }
    },
    error: (...args) => {
        // Errors are always shown, even in production, for debugging purposes.
        // Often integrated with Sentry or other monitoring tools here.
        console.error('[ERROR]', ...args);
    },
    debug: (...args) => {
        if (!isProduction) {
            console.debug('[DEBUG]', ...args);
        }
    }
};

export default logger;
