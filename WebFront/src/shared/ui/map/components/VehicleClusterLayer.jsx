import { useMemo, useState } from 'react';
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { VehicleMarker } from './VehicleMarker';

const CLUSTER_RADIUS_PX = 40;
const CLUSTER_MAX_ZOOM = 18;
const CLUSTER_ZOOM_STEP = 2;

const hasCoordinates = (vehicle) => vehicle?.gps_y != null && vehicle?.gps_x != null;

const getClusterSize = (count) => {
    if (count >= 10) return 'lg';
    if (count >= 5) return 'md';
    return 'sm';
};

const createClusterIcon = (count) => (
    L.divIcon({
        html: `<div class="vehicle-cluster-marker vehicle-cluster-marker--${getClusterSize(count)}"><span>${count}</span></div>`,
        className: 'vehicle-cluster-icon',
        iconSize: [52, 52],
        iconAnchor: [26, 26],
        popupAnchor: [0, -24],
    })
);

const clusterVehicles = ({ vehicles, map, selectedVehicleVin, zoomLevel }) => {
    if (!map) return [];

    const clusters = [];

    vehicles
        .filter(hasCoordinates)
        .filter(vehicle => vehicle.vin !== selectedVehicleVin)
        .forEach((vehicle) => {
            const point = map.project([vehicle.gps_y, vehicle.gps_x], zoomLevel);

            let targetCluster = null;
            let shortestDistance = Infinity;

            clusters.forEach((cluster) => {
                const distance = cluster.centerPoint.distanceTo(point);
                if (distance <= CLUSTER_RADIUS_PX && distance < shortestDistance) {
                    targetCluster = cluster;
                    shortestDistance = distance;
                }
            });

            if (!targetCluster) {
                clusters.push({
                    vehicles: [vehicle],
                    centerPoint: point,
                    sumLat: vehicle.gps_y,
                    sumLng: vehicle.gps_x,
                });
                return;
            }

            targetCluster.vehicles.push(vehicle);
            targetCluster.sumLat += vehicle.gps_y;
            targetCluster.sumLng += vehicle.gps_x;
            targetCluster.centerPoint = L.point(
                targetCluster.centerPoint.x + ((point.x - targetCluster.centerPoint.x) / targetCluster.vehicles.length),
                targetCluster.centerPoint.y + ((point.y - targetCluster.centerPoint.y) / targetCluster.vehicles.length)
            );
        });

    return clusters.map((cluster) => ({
        ...cluster,
        count: cluster.vehicles.length,
        position: [
            cluster.sumLat / cluster.vehicles.length,
            cluster.sumLng / cluster.vehicles.length,
        ],
        key: cluster.vehicles
            .map(vehicle => vehicle.vin || vehicle.plate_no || `${vehicle.gps_y}:${vehicle.gps_x}`)
            .sort()
            .join('|'),
    }));
};

export const VehicleClusterLayer = ({
    vehicles = [],
    selectedVehicle = null,
    onVehicleClick,
}) => {
    const map = useMap();
    const [zoomLevel, setZoomLevel] = useState(map.getZoom());

    useMapEvents({
        zoomend: () => setZoomLevel(map.getZoom()),
    });

    const selectedVehicleVin = selectedVehicle?.vin ?? null;

    const clusters = useMemo(
        () => clusterVehicles({ vehicles, map, selectedVehicleVin, zoomLevel }),
        [vehicles, map, selectedVehicleVin, zoomLevel]
    );

    const handleClusterClick = (cluster) => {
        const nextZoom = Math.min(map.getZoom() + CLUSTER_ZOOM_STEP, CLUSTER_MAX_ZOOM);
        const hasDifferentPositions = cluster.vehicles.some(
            vehicle => vehicle.gps_y !== cluster.vehicles[0].gps_y || vehicle.gps_x !== cluster.vehicles[0].gps_x
        );

        if (hasDifferentPositions) {
            const bounds = L.latLngBounds(cluster.vehicles.map(vehicle => [vehicle.gps_y, vehicle.gps_x]));
            map.flyToBounds(bounds.pad(0.35), { duration: 0.8, maxZoom: nextZoom });
            return;
        }

        map.flyTo(cluster.position, nextZoom, { duration: 0.8 });
    };

    return (
        <>
            {clusters.map((cluster) => (
                cluster.count === 1 ? (
                    <VehicleMarker
                        key={cluster.key}
                        vehicle={cluster.vehicles[0]}
                        isSelected={false}
                        onClick={onVehicleClick}
                    />
                ) : (
                    <Marker
                        key={cluster.key}
                        position={cluster.position}
                        icon={createClusterIcon(cluster.count)}
                        eventHandlers={{ click: () => handleClusterClick(cluster) }}
                    >
                        <Popup>
                            <div className="min-w-[180px]">
                                <div className="mb-2 text-sm font-bold text-zinc-800">
                                    묶인 차량 {cluster.count}대
                                </div>
                                <div className="max-h-48 space-y-1 overflow-y-auto pr-1 text-xs text-zinc-600">
                                    {cluster.vehicles.map((vehicle) => (
                                        <button
                                            key={vehicle.vin}
                                            type="button"
                                            className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left transition-colors hover:bg-orange-50"
                                            onClick={() => onVehicleClick?.(vehicle)}
                                        >
                                            <span className="truncate font-medium text-zinc-800">
                                                {vehicle.plate_no || vehicle.vin}
                                            </span>
                                            <span className="ml-3 shrink-0 text-zinc-500">
                                                {vehicle.speed ?? 0} km/h
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                )
            ))}

            {selectedVehicle && hasCoordinates(selectedVehicle) && (
                <VehicleMarker
                    key={`selected:${selectedVehicle.vin}`}
                    vehicle={selectedVehicle}
                    isSelected
                    onClick={onVehicleClick}
                />
            )}
        </>
    );
};
