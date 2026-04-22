import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Constant from '../../utils/Constant';
import moment from 'moment';
import { formatDateTime } from '../../utils/Formatter';

const IncomeAreaChart = ({ showSettingBtn = false, selectedTable }) => {
    const [isModal, setIsmodal] = useState(false);
    const [lowTemperature, setLowTemperature] = useState(0);
    const [highTemperature, setHighTemperature] = useState(0);
    const [sensorData, setSensorData] = useState([]);
    const [TempLowTem, setTempLowTem] = useState(0);
    const [TempHighTem, setTempHighTem] = useState(0);
    const [options, setOptions] = useState({
        title: { text: '센서', align: 'left' },
        chart: { type: 'line', toolbar: { show: true } },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: { type: 'datetime' },
        yaxis: [{ type: 'numeric', title: { text: 'Temperature' } }]
    });

    const convertDate = (data) => moment(data).format('yyyy-MM-DD HH:mm:ss');

    useEffect(() => {
        if (selectedTable) {
            fetchSensorList(selectedTable);
        }
    }, [selectedTable]);

    const fetchSensorList = (data) => {
        var fetchURL = Constant.REQ_URI + '/companies/' + data.companyId + '/orders/' + data.orderId + '/sensors';
        fetch(fetchURL, { method: 'GET', headers: { 'Content-type': 'application/json' } })
            .then(res => res.json())
            .then((json) => {
                let sensorIdArray = json.map((m) => m.sensorId);
                fetchSensorData(data.companyId, sensorIdArray, data.startTime, data.endTime);
            });
    };

    const separateBySid = (data) => {
        const map = new Map();
        for (const obj of data) {
            const sid = obj.sid;
            if (!map.has(sid)) map.set(sid, []);
            map.get(sid).push(obj);
        }
        return Array.from(map.values());
    };

    const separateSidName = (data) => {
        const list = new Set();
        for (const obj of data) {
            obj.forEach((m) => list.add(m.sid));
        }
        return Array.from(list);
    };

    const noSensorData = (chartTitle) => {
        setOptions(prev => ({
            ...prev,
            title: chartTitle,
            annotations: { yaxis: [{ y: 5, label: { text: '온도 기록 없음' } }] }
        }));
        setSensorData([]);
    };

    const setChartData = (sortedBySidArray) => {
        const senorNameList = separateSidName(sortedBySidArray).join(', ');
        let chartTitle = { text: '센서 : ' + senorNameList, align: 'left' };
        let sdf = [];
        if (sortedBySidArray.length === 0) noSensorData(chartTitle);
        sortedBySidArray.forEach((dataList) => {
            let xlabel = [];
            let dtemp = { name: '온도', type: 'line', data: [] };
            haveSensorData(dataList, xlabel, dtemp, sdf, chartTitle);
        });
    };

    const haveSensorData = (dataList, xlabel, dtemp, sdf, chartTitle) => {
        dataList.forEach((sd) => {
            xlabel.push(formatDateTime(new Date(sd.time)));
            dtemp.data.push(sd.temperature);
        });
        sdf.push(dtemp);
        setOptions(prev => ({
            ...prev,
            title: chartTitle,
            xaxis: { categories: xlabel },
            annotations: {
                yaxis: [
                    { y: selectedTable.tempHigh, label: { text: '상품 최고 온도 : ' + (selectedTable?.tempHigh ?? '-') } },
                    { y: selectedTable.tempLow, label: { text: '상품 최저 온도 : ' + (selectedTable?.tempLow ?? '-') } }
                ]
            }
        }));
        setSensorData(sdf);
    };

    const fetchSensorData = (companyId, sensorId, sd, ed) => {
        let fetchURL = Constant.REQ_URI + '/companies/' + companyId + '/sensors/' + sensorId + '/data';
        fetchURL += '?sd=' + encodeURI(convertDate(sd)) + '&ed=' + encodeURI(convertDate(ed));
        fetch(fetchURL, { method: 'GET', headers: { 'Content-type': 'application/json' } })
            .then(res => res.json())
            .then(resJson => setChartData(separateBySid(resJson)));
    };

    return (
        <div className="flex flex-col">
            <ReactApexChart options={options} series={sensorData} type="line" height={450} />
            {showSettingBtn && (
                <div className="flex justify-end mt-2">
                    <button onClick={() => setIsmodal(true)} className="px-4 py-2 bg-gray-200 rounded text-sm font-medium">온도설정</button>
                    {isModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg w-[250px]">
                                <h3 className="text-xl font-bold mb-4">온도 설정</h3>
                                <div className="space-y-4">
                                    <input type="text" placeholder="최고 온도" defaultValue={highTemperature} onChange={(e) => setTempHighTem(e.target.value)} className="w-full p-2 border rounded" />
                                    <input type="text" placeholder="최저 온도" defaultValue={lowTemperature} onChange={(e) => setTempLowTem(e.target.value)} className="w-full p-2 border rounded" />
                                </div>
                                <div className="flex justify-between mt-6">
                                    <button onClick={() => setIsmodal(false)} className="px-4 py-2 bg-gray-500 text-white rounded">취소</button>
                                    <button onClick={() => { setHighTemperature(TempHighTem); setLowTemperature(TempLowTem); setIsmodal(false); }} className="px-4 py-2 bg-blue-600 text-white rounded">확인</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default IncomeAreaChart;
