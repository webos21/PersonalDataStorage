import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import Constant from '../../utils/Constant';
import moment from 'moment';
import { formatDateTime } from '../../utils/Formatter';

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ showSettingBtn = false, selectedTable }) => {
    const [isModal, setIsmodal] = useState(false);
    const [lowTemperature, setLowTemperature] = useState(0);
    const [highTemperature, setHighTemperature] = useState(0);
    const [sensorData, setSensorData] = useState([]);
    const [TempLowTem, setTempLowTem] = useState(0);
    const [TempHighTem, setTempHighTem] = useState(0);
    const areaChartOptions = {
        title: {
            text: '센서',
            align: 'left'
        },
        chart: {
            type: 'line',
            animation: {
                enabled: false,
                animateGradually: {
                    enabled: false,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: false,
                    speed: 350
                }
            },
            stacked: false,
            toolbar: {
                autoSelected: 'zoom',
                show: true
            }
        },
        colors: ['#2E93fA', '#808B96'],
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
                    y: 8,
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
                        text: '상품 최고 온도 '
                    }
                },
                {
                    y: 2,
                    borderColor: '#ff0000',
                    label: {
                        borderColor: '#00E396',
                        offsetX: -10,
                        offsetY: 20,
                        style: {
                            color: '#fff',
                            background: '#00E396'
                        },
                        text: '상품 최저 온도 '
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
        yaxis: [
            {
                type: 'numeric',
                tooltip: { enabled: false },
                tickAmount: 4,
                min: 0,
                max: 10,
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: '#2E93fA'
                },
                labels: {
                    style: {
                        colors: '#2E93fA'
                    }
                },
                title: {
                    text: 'Temperature',
                    style: {
                        color: '#2E93fA'
                    }
                }
            }
        ]
    };
    const [options, setOptions] = useState(areaChartOptions);
    const convertDate = (data) => {
        return moment(data).format('yyyy-MM-DD HH:mm:ss');
    };

    useEffect(() => {
        if (selectedTable) {
            fetchSensorList(selectedTable);
        }
    }, [selectedTable]);

    const fetchSensorList = (data) => {
        var fetchURL = Constant.REQ_URI + '/companies/' + data.companyId + '/orders/' + data.orderId + '/sensors';
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
            .then((json) => {
                if (json.length == 1) {
                    fetchSensorData(data.companyId, [json[0].sensorId], data.startTime, data.endTime); //2개일경우도 생각
                }
                if (json.length > 1) {
                    let sensorIdArray = json.map((m) => m.sensorId);
                    fetchSensorData(data.companyId, sensorIdArray, data.startTime, data.endTime);
                }
            });
    };

    const separateBySid = (data) => {
        const map = new Map();
        for (const obj of data) {
            const sid = obj.sid;
            if (!map.has(sid)) {
                map.set(sid, []);
            }
            map.get(sid).push(obj);
        }
        return Array.from(map.values());
    };

    const separateSidName = (data) => {
        const list = new Set();
        for (const obj of data) {
            obj.map((m) => list.add(m.sid));
        }
        return Array.from(list);
    };
    const noSensorData = (chartTitle) => {
        setOptions({
            ...options,
            // series: [dtemp, maxTemp],
            title: chartTitle,
            annotations: {
                yaxis: [
                    {
                        tickAmount: 4,
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
        setSensorData([]);
    };

    const setChartData = (sortedBySidArray) => {
        const senorNameList = separateSidName(sortedBySidArray).join(', ');
        let chartTitle = {
            text: '센서 : ' + senorNameList,
            align: 'left'
        };
        let sdf = [];
        if (sortedBySidArray.length == 0) {
            noSensorData(chartTitle);
        }
        sortedBySidArray.forEach((dataList) => {
            let xlabel = [];
            let dtemp = { name: '온도', type: 'line', colors: ['red'], data: [] };
            setData(dataList, xlabel, dtemp, sdf, chartTitle);
        });
    };

    const setData = (dataList, xlabel, dtemp, sdf, chartTitle) => {
        if (dataList.length == 0) {
            noSensorData(chartTitle);
        }
        if (dataList.length > 0) {
            haveSensorData(dataList, xlabel, dtemp, sdf, chartTitle);
        }
    };

    const haveSensorData = (dataList, xlabel, dtemp, sdf, chartTitle) => {
        dataList.forEach((sd, index) => {
            xlabel[xlabel.length] = formatDateTime(new Date(sd.time));
            dtemp.data[dtemp.data.length] = sd.temperature;
        });
        sdf.push(dtemp);
        setOptions({
            ...options,
            title: chartTitle,
            xaxis: { categories: xlabel },
            annotations: {
                yaxis: [
                    {
                        y: selectedTable.tempHigh,
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
                            text: '상품 최고 온도 : ' + selectedTable?.tempHigh ?? '-'
                        }
                    },
                    {
                        y: selectedTable.tempLow,
                        borderColor: '#ff0000',
                        label: {
                            borderColor: '#00E396',
                            offsetX: -10,
                            offsetY: 20,
                            style: {
                                color: '#fff',
                                background: '#00E396'
                            },
                            text: '상품 최저 온도 : ' + selectedTable?.tempLow ?? '-'
                        }
                    }
                ]
            }
        });
        setSensorData(sdf);
    };

    const fetchSensorData = (companyId, sensorId, sd, ed) => {
        let fetchURL = Constant.REQ_URI;
        if (sensorId.length == 1) {
            fetchURL += '/companies/' + companyId + '/sensors/' + sensorId[0] + '/data';
        }
        if (sensorId.length > 1) {
            fetchURL += '/companies/' + companyId + '/sensors/' + sensorId + '/data';
        }
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
                        console.log('401 Error!!!');
                    }
                    throw Error('서버응답 : ' + res.statusText + '(' + res.status + ')');
                }
                return res.json();
            })
            .then((resJson) => {
                const sortedBySidArray = separateBySid(resJson);
                setChartData(sortedBySidArray);
            });
    };

    return (
        <>
            <ReactApexChart options={options} series={sensorData} type="line" height={450} />
            {showSettingBtn && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="inherit" size="small" onClick={() => setIsmodal(true)}>
                        온도설정
                    </Button>

                    <Modal
                        open={isModal}
                        onClose={() => setIsmodal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Box sx={{ minWidth: 250, minHeight: 250, backgroundColor: 'white', borderRadius: 1 }}>
                            <Typography id="modal-modal-title" variant="h3" sx={{ p: 1 }}>
                                온도 설정
                            </Typography>
                            <form>
                                <Box id="modal-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                    <TextField
                                        id="text"
                                        type="text"
                                        variant="outlined"
                                        label={'최고 온도'}
                                        defaultValue={highTemperature}
                                        onChange={(e) => {
                                            setTempHighTem(e.target.value);
                                        }}
                                        size="small"
                                        inputProps={{
                                            style: {
                                                width: '200px'
                                            }
                                        }}
                                    />
                                </Box>
                                <Box id="modal-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                    <TextField
                                        id="text"
                                        type="text"
                                        variant="outlined"
                                        label={'최저 온도'}
                                        defaultValue={lowTemperature}
                                        size="small"
                                        onChange={(e) => {
                                            setTempLowTem(e.target.value);
                                        }}
                                        inputProps={{
                                            style: {
                                                width: '200px'
                                            }
                                        }}
                                    />
                                </Box>
                                <Box sx={{ mt: 7, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            setIsmodal(false);
                                        }}
                                    >
                                        취소
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setHighTemperature(TempHighTem);
                                            setLowTemperature(TempLowTem);
                                            setIsmodal(false);
                                        }}
                                    >
                                        확인
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Modal>
                </div>
            )}
        </>
    );
};

IncomeAreaChart.propTypes = {
    slot: PropTypes.string
};

export default IncomeAreaChart;
