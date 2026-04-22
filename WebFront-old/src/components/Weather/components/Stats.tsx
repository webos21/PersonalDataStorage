const Stats = ({ data }) => {
    return (
        <div className="flex justify-between pb-4 w-full md:w-1/2 border-t md:border-t-0 border-b md:border-b-0 mb-0 md:mb-4 pb-0 md:pb-0 md:border-l border-white/50">
            <div className="ml-3">
                <div className="mt-4 text-[1.44rem]">{Math.round(data.daily.temperature_2m_max[0])}&deg;</div>
                <div>최고기온</div>
                <div className="mt-4 text-[1.44rem]">{Math.round(data.daily.temperature_2m_min[0])}&deg;</div>
                <div>최저기온</div>
            </div>
            <div>
                <div className="mt-4 text-[1.44rem]">{Math.round(data.current_weather.windspeed)}mph</div>
                <div>풍속</div>
                <div className="mt-4 text-[1.44rem]">{Math.round(data.daily.rain_sum[0])}</div>
                <div>강수량</div>
            </div>
            <div>
                <div className="mt-4 text-[1.44rem]">{data.daily.sunrise[0].slice(-5)}</div>
                <div>일출</div>
                <div className="mt-4 text-[1.44rem]">{data.daily.sunset[0].slice(-5)}</div>
                <div>일몰</div>
            </div>
        </div>
    );
};

export default Stats;
