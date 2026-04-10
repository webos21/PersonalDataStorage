import { useEffect, useState } from 'react';
import LocationAndDate from './components/LocationAndDate';
import Stats from './components/Stats';
import TempChart from './components/TempChart';
import Temperature from './components/Temperature';

const Weather = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);
    const [city, setCity] = useState(null);
    const [wmoCode, setWmoCode] = useState(null);
    const [description, setDescription] = useState(null);

    const getUserLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    getCityName(latitude, longitude);
                },
                () => {
                    setError('Unable to retrieve your location');
                }
            );
        }
    };

    const getCityName = async (latitude, longitude) => {
        try {
            const apiKey = 'e2fbb44ffe544d92a89c97eec37333e3';
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
            const data = await response.json();
            setCity(data.results[0].components.city);
        } catch (error) {
            setError('Unable to retrieve city name');
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        if (location) {
            getCityName(location.latitude, location.longitude);

            const fetchData = async () => {
                try {
                    const response = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,rain,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,windspeed_10m_max&current_weather=true&windspeed_unit=mph&timezone=Asia/Seoul`
                    );

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setData(data);
                    setLoading(false);
                } catch (error) {
                    setError('Error fetching data. Please try again later.');
                    setLoading(false);
                }
            };
            const fetchCodeData = async () => {
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=189271b827844bff7388350c44848615&units=metric`
                    );

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setWmoCode(data.weather[0].icon);
                    setDescription(data.weather[0].main);
                } catch (error) {
                    setError('Error fetching data. Please try again later.');
                    setLoading(false);
                }
            };
            fetchCodeData();
            fetchData();
        }
    }, [location]);

    return (
        <div className="flex flex-wrap w-[900px]">
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : (
                <>
                    <LocationAndDate data={data.current_weather.time.slice(0, 10)} city={city} />
                    <Temperature data={data} wmoCode={wmoCode} description={description} />
                    <Stats data={data} />

                    <div className="flex-grow w-full">
                        <TempChart data={data} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Weather;
