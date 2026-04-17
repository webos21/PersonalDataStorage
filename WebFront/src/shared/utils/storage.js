/**
 * Storage Utility
 * - Wrapper for localStorage with automatic JSON parsing/stringifying.
 * - Handles exceptions during storage access.
 */
import logger from './logger';

const storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            logger.error(`Error getting key "${key}" from storage`, error);
            return null;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            logger.error(`Error setting key "${key}" to storage`, error);
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            logger.error(`Error removing key "${key}" from storage`, error);
        }
    },
    clear: () => {
        try {
            localStorage.clear();
        } catch (error) {
            logger.error('Error clearing storage', error);
        }
    }
};

export default storage;
