import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Default Tile: OpenStreetMap (Fallback)
const DefaultTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const DefaultAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Helper component to handle view state updates
const MapViewUpdater = ({ center, zoom }) => {
    const map = useMap();
    const isInitial = useRef(true);
    const prevCenter = useRef(center);

    useEffect(() => {
        if (isInitial.current) {
            isInitial.current = false;
            return;
        }
        // center 변경 시: 현재 줌이 너무 낮으면 최소 14로 확대, 아니면 현재 줌 유지
        if (prevCenter.current[0] !== center[0] || prevCenter.current[1] !== center[1]) {
            const currentZoom = map.getZoom();
            const targetZoom = Math.max(currentZoom, 14);
            map.flyTo(center, targetZoom, { duration: 0.8 });
        }
        prevCenter.current = center;
    }, [center, map]);
    return null;
};

// Helper to expose map instance
const MapInstanceExposer = ({ onMapReady }) => {
    const map = useMap();
    useEffect(() => {
        if (onMapReady) onMapReady(map);
    }, [map, onMapReady]);
    return null;
};

export default function MapEngine({
    id = 'map',
    center = [37.5666, 126.9784],
    zoom = 14,
    className = 'w-full h-full',
    tileUrl = DefaultTileUrl,
    attribution = DefaultAttribution,
    onMapReady,
    children
}) {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            className={className}
            id={id}
            zoomControl={false}
        >
            <TileLayer
                attribution={attribution}
                url={tileUrl}
            />

            {/* Logic Components */}
            <MapViewUpdater center={center} zoom={zoom} />
            <MapInstanceExposer onMapReady={onMapReady} />

            {/* Data Layers */}
            {children}
        </MapContainer>
    );
}
