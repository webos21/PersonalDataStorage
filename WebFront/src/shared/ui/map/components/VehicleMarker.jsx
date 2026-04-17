import { useRef, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


// Fix for default marker icon (same as MapEngine)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom icon creator with status-based styling
const createVehicleIcon = (status) => {
    const isActive = status === '01'; // 01: Driving
    const className = isActive ? 'vehicle-marker' : 'vehicle-marker grayscale opacity-70';

    return L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        className: className
    });
};

/**
 * VehicleMarker Component
 * Renders a vehicle on the map with a popup showing details.
 */
export const VehicleMarker = ({ vehicle, onClick, isSelected }) => {
    const { gps_y: lat, gps_x: lng, plate_no: plateNo, speed } = vehicle;
    const markerRef = useRef(null);

    const handleClick = () => {
        if (onClick) onClick(vehicle);
    };

    // Auto-open popup when selected from the panel
    useEffect(() => {
        if (lat != null && lng != null && isSelected && markerRef.current) {
            markerRef.current.openPopup();
        }
    }, [isSelected, lat, lng]);

    // Safety check for coordinates
    if (lat == null || lng == null) return null;

    return (
        <Marker
            ref={markerRef}
            position={[lat, lng]}
            icon={createVehicleIcon(vehicle.device_status)}
            eventHandlers={{ click: handleClick }}
        >
            <Popup>
                <div className="text-center min-w-[100px]">
                    <div className="font-bold mb-1 text-sm">{plateNo}</div>
                    <div className="text-xs text-zinc-500">
                        <span className="font-semibold">{speed}</span> km/h
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                        {vehicle.device_status === '01' ? '운행' : '미운행'}
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};
