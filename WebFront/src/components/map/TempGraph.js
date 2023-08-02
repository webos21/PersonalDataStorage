import Moment from 'moment';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// ==============================|| Pouch TABLE - FetchData ||============================== //

const TEST_PORT = ':18082';
const REQ_URI = process.env.NODE_ENV !== 'production' ? '//' + window.location.hostname + TEST_PORT + '/api/v1/tb' : '/api/v1/tb';

const TempGraph = (props) => {
    const { row, sIndex, dataFromParent } = props;
    const areaChartOptions = {
        chart: {
            type: 'line',
            stacked: false,
            toolbar: {
                autoSelected: 'zoom',
                show: true
            }
        },
        colors: ['#00ff00'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        grid: {
            strokeDashArray: 0
        },
        tooltip: {
            theme: 'light',
            x: {
                format: 'yyyy-MM-dd HH:mm'
            }
        },
        annotations: {
            yaxis: [
                {
                    y: row.productTH,
                    borderColor: '#ff0000',
                    label: {
                        borderColor: '#00E396',
                        position: 'left',
                        offsetX: 100,
                        offsetY: -10,
                        style: {
                            color: '#fff',
                            background: '#00E396'
                        },
                        text: '상품 최고 온도 ' + row.productTH
                    }
                },
                {
                    y: row.productTL,
                    borderColor: '#ff0000',
                    label: {
                        borderColor: '#00E396',
                        offsetY: 20,
                        style: {
                            color: '#fff',
                            background: '#00E396'
                        },
                        text: '상품 최저 온도 ' + row.productTL
                    }
                }
            ]
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false,
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'yyyy-MM',
                    day: 'yyyy-MM-dd',
                    hour: 'HH:mm'
                }
            },
            tooltip: { enabled: false }
        },
        yaxis: {
            type: 'numeric',
            tooltip: { enabled: false },
            tickAmount: 4,
            min: row.productTL - 2,
            max: row.productTH + 2
        }
    };

    const [options, setOptions] = useState(areaChartOptions);
    const [sensorData, setSensorData] = useState([]);

    const formatDateTime = (dateVal) => {
        // console.log('formatDateTime-0', dateVal);
        let yyyy = dateVal.getFullYear();
        let MM = String(dateVal.getMonth() + 1).padStart(2, '0');
        let dd = String(dateVal.getDate()).padStart(2, '0');
        let HH = String(dateVal.getHours()).padStart(2, '0');
        let mm = String(dateVal.getMinutes()).padStart(2, '0');
        let dateStr = yyyy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm;
        // console.log('formatDateTime-1', dateStr);
        return dateStr;
    };

    useEffect(() => {
        fetchSensorData(dataFromParent.orderCompanyId, row.sensorId, dataFromParent.tsStart, dataFromParent.tsEnd);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const convertDate = (data) => {
        return Moment(data).format('yyyy-MM-DD HH:mm:ss');
    };

    const fetchSensorData = (companyId, sensorId, sd, ed) => {
        var fetchURL = REQ_URI + '/service/tb/companies/' + companyId + '/sensors/' + sensorId + '/data';
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
                console.log('Sensor Data : ', resJson);
                let chartTitle = {
                    text: '센서' + (sIndex + 1) + ' : ' + row.sensorId,
                    align: 'left',
                    style: {
                        fontSize: '12px',
                        fontWeight: 800
                    }
                };
                if (resJson.length > 0) {
                    let xlabel = [];
                    let dtemp = { name: '온도', type: 'line', colors: ['green'], data: [] };

                    resJson.forEach((sd, index) => {
                        xlabel[xlabel.length] = formatDateTime(new Date(sd.time));
                        dtemp.data[dtemp.data.length] = sd.temperature;
                    });
                    let sdf = [];
                    // sdf.push(maxTemp);
                    sdf.push(dtemp);
                    // sdf.push(minTemp);
                    setOptions({
                        ...options,
                        // series: [dtemp, maxTemp],
                        title: chartTitle,
                        xaxis: { categories: xlabel }
                    });
                    setSensorData(sdf);
                } else {
                    setOptions({
                        ...options,
                        // series: [dtemp, maxTemp],
                        title: chartTitle,
                        annotations: {
                            yaxis: [
                                {
                                    y: 5,
                                    // borderColor: '#ff0000',
                                    label: {
                                        position: 'left',
                                        offsetX: 250,
                                        offsetY: -10,
                                        style: {
                                            color: '#fff',
                                            fontSize: '15px',
                                            background: '#ff0000'
                                        },
                                        text: '온도 기록 없음'
                                    }
                                }
                            ]
                        }
                    });
                }
            })
            .catch(function (error) {
                console.log('comm', 'serverResponse', error.message);
            });
    };

    return <ReactApexChart options={options} series={sensorData} width="100%" height={250} />;
};

export default TempGraph;
