import { useEffect, useState } from 'react';

const AlarmAnimation = () => {
    const [count, setCount] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div id="badge" className="relative flex items-center justify-center">
            <div className="relative animate-[pulse_1.5s_ease-in-out_1] bg-blue-500 text-white rounded-full p-2">
                {count}
                <div className="absolute inset-0 animate-[ping_1.5s_ease-in-out_1] bg-blue-500 rounded-full opacity-50"></div>
            </div>
        </div>
    );
};

export default AlarmAnimation;
