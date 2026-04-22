/**
 * Environment Configuration & Validation
 * - Validates required environment variables at startup.
 * - Exports a typed configuration object.
 */
import logger from '@/shared/utils/logger';

const env = import.meta.env;

const requiredKeys = [
    'VITE_VWORLD_API_KEY',
    // Add other required keys here
];

const validateEnv = () => {
    const missingKeys = requiredKeys.filter(key => !env[key]);
    if (missingKeys.length > 0) {
        const message = `Missing required environment variables: ${missingKeys.join(', ')}`;
        logger.error(message);
        // In development, we might want to throw an error to stop execution
        // In production, we might just log it if it's not critical
        if (env.DEV) {
            console.error(message);
            // alert(message); // Optional: Alert developer immediately
        }
    }
};

validateEnv();

const config = {
    api: {
        baseUrl: '/api/v2',
        timeout: 10000,
    },
    vworld: {
        apiKey: env.VITE_VWORLD_API_KEY,
        domain: env.VITE_VWORLD_DOMAIN || window.location.hostname,
    },
    isDev: env.DEV,
    isProd: env.PROD,
};

export default config;
