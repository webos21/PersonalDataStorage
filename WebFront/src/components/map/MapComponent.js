// library import
import Moment from 'moment';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, SVGOverlay, TileLayer, useMap } from 'react-leaflet';
import '../../assets/leaflet/leaflet.css';
import CarImage from '../../assets/images/cars/car-normal.png';
// material-ui
import { Grid } from '@mui/material';

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
    const [sInfo, setSInfo] = useState([]);
    const [selectedRow, setSelectedRow] = useState();
    const [viewList, setViewList] = useState({ orderList: 'none', sensor: 'none' });
    const [bounds, setBounds] = useState();
    const gns = deliveryData.map((m) => m.gns);
    const [selectCar, setSelectCar] = useState();

    const Maps = () => {
        const map = useMap();
        if (bounds !== undefined) {
            // console.log(bounds);
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
    // console.log('height : ', mapConHeight);

    const calcBounds = (givenBounds, lat, lng) => {
        if (Number.isNaN(lat) || Number.isNaN(lng)) {
            // cs('NaN is found!!!!');
            return;
        }
        if (givenBounds.top === 0) {
            givenBounds.top = lng;
        }
        if (givenBounds.bottom === 0) {
            givenBounds.bottom = lng;
        }
        if (givenBounds.left === 0) {
            givenBounds.left = lat;
        }
        if (givenBounds.right === 0) {
            givenBounds.right = lat;
        }

        givenBounds.top = Math.max(givenBounds.top, lng);
        givenBounds.left = Math.min(givenBounds.left, lat);

        givenBounds.bottom = Math.min(givenBounds.bottom, lng);
        givenBounds.right = Math.max(givenBounds.right, lat);
    };

    const makeTrackArray = (trackRes) => {
        // console.log('res >> ', trackRes);
        if (trackRes) {
            var retObj = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                length: trackRes.length,
                data_map: trackRes,
                data: []
            };

            for (var i = 0; i < trackRes.length; i++) {
                calcBounds(retObj, trackRes[i].longitude, trackRes[i].latitude);
                retObj.data[i] = [trackRes[i].longitude, trackRes[i].latitude];
            }
            return retObj;
        } else {
            return false;
        }
    };

    const convertDate = (data) => {
        return Moment(data).format('yyyy-MM-DD HH:mm:ss');
    };

    const fetchSensorList = (row) => {
        var fetchURL = Constant.REQ_URI + '/service/wwd/companies/' + row.orderCompanyId + '/orders/' + encodeURI(row.id) + '/sensors';
        fetch(fetchURL, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        // window.location = '/#/logout';
                        console.log('401 Error!!!');
                    }
                    throw Error('서버응답 : ' + res.statusText + '(' + res.status + ')');
                }
                return res.json();
            })
            .then((resJson) => {
                // console.log('fetchSensorList Data : ', resJson);
                setSInfo(resJson);
                // console.log('row ', row);
                // convertSensorList(resJson);
                fetchGnssData(row.orderCompanyId, resJson[0].gnssId, row.tsStart, row.tsEnd);
            })
            .catch(function (error) {
                console.log('comm', 'serverResponse', error.message);
            });
        const json = Instance.getFetch(fetchURL); //TODO:TEST
        console.log('testjson!!', json);
    };

    const fetchGnssData = (companyId, sensorId, sd, ed) => {
        var fetchURL = Constant.REQ_URI + '/companies/' + companyId + '/gnss/' + sensorId + '/data';
        fetchURL += '?sd=' + encodeURI(convertDate(sd)) + '&ed=' + encodeURI(convertDate(ed));
        fetch(fetchURL, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        // window.location = '/#/logout';
                        console.log('401 Error!!!');
                    }
                    throw Error('서버응답 : ' + res.statusText + '(' + res.status + ')');
                }
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
                    setBounds([
                        [ta.top, ta.left],
                        [ta.bottom, ta.right]
                    ]);
                }
                // props.modalHandle(false);
                // props.callbackFromParent(resJson);
            })
            .catch(function (error) {
                console.log('comm', 'serverResponse', error.message);
            });
    };

    // const dataFromParent = (row) => {
    //     // console.log(row.orderCompanyId, row.id);
    //     fetchSensorList(row);
    //     setSelectedRow(row);
    //     setViewList({ ...viewList, sensor: 'block' });
    // };

    return (
        <>
            <Grid
                item
                style={{
                    maxHeight: mapConHeight,
                    minHeight: '100%',
                    minWidth: '100%'
                }}
            >
                <MapContainer
                    style={{ width: '100%', height: 465 }}
                    center={[37.4695777893, 126.8578186035]}
                    zoom={9}
                    scrollWheelZoom={true}
                >
                    <Maps />

                    {/* {!selectedTable &&
                        gns.map((m) => {
                            if (m.latitude && m.longitude) {
                                return (
                                    <Marker position={[m.latitude, m.longitude]} icon={carIcon} key={uniqueId()}>
                                        <Popup>
                                            {`센서번호 : ${m.sid}`} <br /> Easily customizable.
                                        </Popup>
                                    </Marker>
                                );
                            }
                        })} */}
                    <PolylineRender mapData={mapData} />
                    <TileLayer
                        attribution='&amp;copy <a href="http://www.vworld.kr/v4po_prcint_a001.do">vworld</a>'
                        url={Constant.VWORLD_URL}
                    />
                </MapContainer>
            </Grid>
        </>
    );
};

export default MapComponent;
