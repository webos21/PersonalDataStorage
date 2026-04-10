import { SVGOverlay } from 'react-leaflet';
import MapMarker from './MapMarker';

const PolylineRender = (props) => {
    const { mapData } = props;

    return (
        <>
            {(mapData === undefined) | (mapData?.polyline.length === 0) ? (
                <SVGOverlay
                    attributes={{ stroke: 'red' }}
                    bounds={[
                        [37.543096, 127.175551],
                        [37.131096, 127.645511]
                    ]}
                >
                    {/* <rect x="0" y="0" width="100%" height="100%" fill="skyblue" stroke="cadetblue" strokeWidth={2} />
                    <text x="10%" y="50%" fontSize={20} stroke="white">
                        경로 정보 없음.
                    </text> */}
                </SVGOverlay>
            ) : (
                mapData.polyline.length > 0 && (
                    <MapMarker
                        // key={'mapMarker-' + index}
                        position={mapData.markerPosision}
                        polylines={mapData.polyline}
                        iconRotate={mapData.markerAngle}
                        data={mapData.data}
                    />
                )
            )}
        </>
    );
};

export default PolylineRender;
