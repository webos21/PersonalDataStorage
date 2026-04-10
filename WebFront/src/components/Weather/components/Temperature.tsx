import { useEffect, useState } from 'react';

const Temperature = ({ data, wmoCode, description }) => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState(null);

    useEffect(() => {
        const code = wmoCode ? wmoCode : '01d';
        import(`./openweathermap/${code}.svg`)
            .then((module) => {
                setImage(module.default);
                setText(description);
            })
            .catch((error) => {
                console.error('Failed to load image module', error);
            });
    }, [wmoCode]);

    return (
        <div className="flex items-center mt-1 w-full md:w-1/2">
            <div className="flex-grow-[1.25] text-center flex items-center justify-center">
                <div className="w-[10.5em] scale-[1.5]">
                    <img src={image} alt="" className="opacity-200 saturate-[400%]" />
                </div>
            </div>
            <div className="flex-grow text-center flex flex-col justify-center">
                <div className="text-[5.25rem] font-light">{Math.round(data.current_weather.temperature)}&deg;</div>
                <div className="mt-[-0.5em] ml-[-0.6em] text-center text-[1.125rem]">{text}</div>
            </div>
        </div>
    );
};

export default Temperature;
