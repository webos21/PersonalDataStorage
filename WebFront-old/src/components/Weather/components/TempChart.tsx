import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const TempChart = ({ data }) => {
    const [tempData, setTempData] = useState([]);
    const [options, setOptions] = useState({});

    useEffect(() => {
        let xlabel = [];
        let dtemp = { name: '온도', data: [] };
        
        data.hourly.time.forEach((datetime, index) => {
            const datePart = datetime.split('T')[0];
            const todayStr = new Date().toISOString().split('T')[0];

            if (datePart === todayStr) {
                xlabel.push(datetime);
                dtemp.data.push(data.hourly.temperature_2m[index]);
            }
        });

        setOptions({
            chart: { type: 'area', stacked: false, toolbar: { show: true } },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 2 },
            xaxis: { type: 'datetime', categories: xlabel },
            title: { text: '일일 온도 변화', align: 'left' }
        });
        setTempData([dtemp]);
    }, [data]);

    return (
        <ReactApexChart options={options} series={tempData} type="area" width="100%" height={335} />
    );
};

export default TempChart;
