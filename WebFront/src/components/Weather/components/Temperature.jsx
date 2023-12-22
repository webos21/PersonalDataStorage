import { Box } from '@mui/material';
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
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '0.25em', width: { xs: '100%', md: '50%' } }}>
            <Box sx={{ flexGrow: 1.25, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    sx={{
                        width: '10.5em',
                        transform: 'scale(1.5)'
                    }}
                >
                    <img src={image} alt="" style={{ opacity: '2', filter: ' saturate(400%)' }} />
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ fontSize: '5.25em', fontWeight: 300 }}>{Math.round(data.current_weather.temperature)}&deg;</Box>
                <Box sx={{ mt: '-0.5em', ml: '-0.6em', textAlign: 'center', fontSize: '1.125em' }}>{text}</Box>
            </Box>
        </Box>
    );
};

export default Temperature;
