import MapEngine from './MapEngine';
import { getMapConfig } from './mapProviders';

/**
 * BaseMap (Facade)
 * - Environment variable (`VITE_MAP_SOURCE`) determines the map provider.
 * - Injects the appropriate `tileUrl` and `attribution` into `MapEngine`.
 */
const BaseMap = (props) => {
    const mapSource = import.meta.env.VITE_MAP_SOURCE;
    const { tileUrl, attribution } = getMapConfig(mapSource);

    return (
        <MapEngine
            {...props}
            tileUrl={tileUrl}
            attribution={attribution}
        />
    );
};

export default BaseMap;
