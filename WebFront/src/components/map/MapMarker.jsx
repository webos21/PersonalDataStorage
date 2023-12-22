import { Link } from '@mui/material';
import L from 'leaflet';
import 'leaflet-rotatedmarker';
import { forwardRef, useEffect, useRef } from 'react';
import { Marker, Polyline, Popup } from 'react-leaflet';
import CarImage from '../../assets/images/cars/car-normal.png';
const carIcon = new L.Icon({
    iconUrl: CarImage,
    iconRetinaUrl: CarImage,
    iconAnchor: new L.Point(10, 21),
    popupAnchor: new L.Point(1, -30),
    iconSize: new L.Point(30, 64)
});

const limeOptions = { color: 'green' };

const MapMarker = forwardRef(({ children, ...props }, forwardRef) => {
    const markerRef = useRef();
    // console.log('props : ', props);
    const { rotationAngle, rotationOrigin } = { rotationAngle: props.iconRotate?.gpsBearing, rotationOrigin: 'center' };
    useEffect(() => {
        const marker = markerRef.current;
        // cs('dataInfo', props.dataInfo)
        if (marker) {
            marker.setRotationAngle(rotationAngle);
            marker.setRotationOrigin(rotationOrigin);
        }
    }, [rotationAngle, rotationOrigin]);

    const closeThisPopup = (event) => {
        event.preventDefault();
        markerRef.current.closePopup();
    };

    return (
        <>
            {/* {polylines.length > 0 && ( */}
            <Polyline pathOptions={limeOptions} positions={props.polylines} />
            <Marker
                icon={carIcon}
                position={props.polylines[props.polylines.length - 1]}
                ref={(ref) => {
                    // cs('forwardRef')
                    markerRef.current = ref;
                    if (forwardRef) {
                        forwardRef.current = ref;
                    }
                }}
                // {...props}
            >
                {children}
                <Popup closeOnClick={false} closeButton={false}>
                    <div style={{ fontFamily: 'dotum, arial, sans-serif', fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>
                        주행정보
                        <Link className="leaflet-popup-close-button" href="#" onClick={closeThisPopup}>
                            X
                        </Link>
                    </div>
                    {'popup'}
                </Popup>
            </Marker>
            {/* )} */}
        </>
    );
});

MapMarker.displayName = 'MapMarker';

export default MapMarker;
