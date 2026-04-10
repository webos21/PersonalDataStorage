// library import
import Moment from 'moment';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, SVGOverlay, TileLayer, useMap } from 'react-leaflet';
import '../../assets/leaflet/leaflet.css';
import CarImage from '../../assets/images/cars/car-normal.png';

// project import
import L from 'leaflet';
import PolylineRender from './PolylineRender';
import Instance from '../../api/Instance';
import Constant from '../../utils/Constant';
import { uniqueId } from 'lodash';

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.6.0/dist/images/';

const MapComponent = ({ deliveryData, selectedTable }) => {
    const carIcon = new L.Icon({
        iconUrl: CarImage,
        iconRetinaUrl: CarImage,
        iconAnchor: new L.Point(10, 21),
        popupAnchor: new L.Point(1, -30),
        iconSize: new L.Point(30, 64)
    });

    const [mapData, setMapData] = useState();
    const [bounds, setBounds] = useState();

    const Maps = () => {
        const map = useMap();
        if (bounds !== undefined) {
            map.flyToBounds(bounds, { padding: { x: 40, y: 20 }, maxZoom: 12 });
        } else {
            map.setMaxZoom(18);
            map.setMinZoom(7);
        }

        return null;
    };

    useEffect(() => {
        if (selectedTable) {
            fetchGnssData(selectedTable.companyId, selectedTable.gns.sid, selectedTable.startTime, selectedTable.endTime);
        }
    }, [selectedTable]);

    const mapConHeight = window.innerHeight >= 700 ? 760 : window.innerHeight;

    const calcBounds = (givenBounds, lat, lng) => {
        if (Number.isNaN(lat) || Number.isNaN(lng)) return;
        if (givenBounds.top === 0) givenBounds.top = lng;
        if (givenBounds.bottom === 0) givenBounds.bottom = lng;
        if (givenBounds.left === 0) givenBounds.left = lat;
        if (givenBounds.right === 0) givenBounds.right = lat;

        givenBounds.top = Math.max(givenBounds.top, lng);
        givenBounds.left = Math.min(givenBounds.left, lat);
        givenBounds.bottom = Math.min(givenBounds.bottom, lng);
        givenBounds.right = Math.max(givenBounds.right, lat);
    };

    const makeTrackArray = (trackRes) => {
        if (trackRes) {
            var retObj = { top: 0, left: 0, bottom: 0, right: 0, length: trackRes.length, data_map: trackRes, data: [] };
            for (var i = 0; i < trackRes.length; i++) {
                calcBounds(retObj, trackRes[i].longitude, trackRes[i].latitude);
                retObj.data[i] = [trackRes[i].longitude, trackRes[i].latitude];
            }
            return retObj;
        } else {
            return false;
        }
    };

    const convertDate = (data) => Moment(data).format('yyyy-MM-DD HH:mm:ss');

    const fetchGnssData = (companyId, sensorId, sd, ed) => {
        var fetchURL = Constant.REQ_URI + '/companies/' + companyId + '/gnss/' + sensorId + '/data';
        fetchURL += '?sd=' + encodeURI(convertDate(sd)) + '&ed=' + encodeURI(convertDate(ed));
        fetch(fetchURL, { method: 'GET', headers: { 'Content-type': 'application/json' } })
            .then((res) => {
                if (!res.ok) throw Error('서버응답 : ' + res.statusText + '(' + res.status + ')');
                return res.json();
            })
            .then((resJson) => {
                var polylines = [];
                for (let index = 0; index < resJson.length; index++) {
                    polylines[index] = [resJson[index].latitude, resJson[index].longitude];
                }
                var ta = makeTrackArray(resJson);
                setMapData({ polyline: polylines, bounds: ta, markerAngle: [37.4695777893, 126.8578186035], data: resJson });
                if (polylines.length > 0) {
                    setBounds([[ta.top, ta.left], [ta.bottom, ta.right]]);
                }
            })
            .catch(function (error) {
                console.log('comm', 'serverResponse', error.message);
            });
    };

    return (
        <div 
            className="h-full w-full"
            style={{ maxHeight: mapConHeight, minHeight: '100%', minWidth: '100%' }}
        >
            <MapContainer
                style={{ width: '100%', height: 465 }}
                center={[37.4695777893, 126.8578186035]}
                zoom={9}
                scrollWheelZoom={true}
            >
                <Maps />
                <PolylineRender mapData={mapData} />
                <TileLayer
                    attribution='&amp;copy <a href="http://www.vworld.kr/v4po_prcint_a001.do">vworld</a>'
                    url={Constant.VWORLD_URL}
                />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
