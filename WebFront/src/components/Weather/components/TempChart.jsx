import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const TempChart = ({ data }) => {
    const theme = useTheme();
    const [tempData, setTempData] = useState([]);

    useEffect(() => {
        let xlabel = [];
        let dtemp = { name: '온도', data: [] };
        let chartTitle = {
            text: '일일 온도 변화',
            align: 'left'
        };
        // data.hourly.time.forEach((data) => {
        //     console.log('날짜 데이터 자른거 확인', data);
        //     if(data.slice(-5) = )
        //     xlabel[xlabel.length] = data;
        // });
        // data.hourly.temperature_2m.forEach((data) => {
        //     dtemp.data[dtemp.data.length] = data;
        // });

        data.hourly.time.forEach((datetime, index) => {
            // 날짜와 시간을 분리
            const datePart = datetime.split('T')[0]; // 예를 들어, "2023-10-10 12:00:00" => "2023-10-10"

            // 오늘 날짜 생성
            const today = new Date();
            const todayStr = today.toISOString().split('T')[0]; // 현재 날짜의 문자열을 얻는다 ("2023-10-10")

            // 데이터의 날짜와 오늘 날짜를 비교
            if (datePart === todayStr) {
                // 동일한 날짜의 데이터만 사용
                xlabel.push(datetime);
                dtemp.data.push(data.hourly.temperature_2m[index]);
            }
        });
        let sdf = [];

        sdf.push(dtemp);

        setOptions({ ...options, title: chartTitle, xaxis: { categories: xlabel } });
        setTempData(sdf);
    }, [data]);
    const areaChartOptions = {
        theme: {
            mode: theme.palette.mode
        },
        chart: {
            type: 'area',
            stacked: false,
            toolbar: {
                autoSelected: 'zoom',
                show: true
            }
        },
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
            tooltip: { enabled: false }
        }
    };

    const [options, setOptions] = useState(areaChartOptions);

    return (
        <>
            <ReactApexChart options={options} series={tempData} type="area" width={900} height={335} />
        </>
    );
};

export default TempChart;
