/**
 * Map Provider Strategies
 * Returns tile configuration based on the provider key.
 */

const getVWorldConfig = () => {
    const apiKey = import.meta.env.VITE_VWORLD_API_KEY;
    return {
        tileUrl: `https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Base/{z}/{y}/{x}.png`,
        attribution: '&copy; <a href="http://www.vworld.kr/" target="_blank">VWorld</a>',
    };
};

const getOsmConfig = () => {
    return {
        tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    };
};

// Strategy Registry
const strategies = {
    vworld: getVWorldConfig,
    osm: getOsmConfig,
};

/**
 * Get map configuration for a specific source.
 * @param {string} source - 'vworld' | 'osm'
 * @returns {object} { tileUrl, attribution }
 */
export const getMapConfig = (source) => {
    const strategy = strategies[source] || strategies['vworld']; // Default to VWorld
    return strategy();
};
