import { Box } from '@mui/material';

const Stats = ({ data }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pb: '1em',
                width: { xs: '100%', md: '50%' },
                borderTop: { xs: '1px solid rgba(255,255,255,0.5)', md: 'none' },
                borderBottom: { xs: '1px solid rgba(255,255,255,0.5)', md: 'none' },
                marginBottom: { xs: '0', md: '1em' },
                paddingBottom: { xs: 'initial', md: '0' },
                borderLeft: { xs: 'none', md: '1px solid rgba(255,255,255,0.5)' }
            }}
        >
            <Box sx={{ ml: 3 }}>
                <Box sx={{ mt: '1em', fontSize: '1.44em' }}>{Math.round(data.daily.temperature_2m_max[0])}&deg;</Box>
                <Box>최고기온</Box>
                <Box sx={{ mt: '1em', fontSize: '1.44em' }}>{Math.round(data.daily.temperature_2m_min[0])}&deg;</Box>
                <Box>최저기온</Box>
            </Box>
            <Box>
                <Box sx={{ mt: '1em', fontSize: '1.44em' }}>{Math.round(data.current_weather.windspeed)}mph</Box>
                <Box>풍속</Box>
                <Box sx={{ mt: '1em', fontSize: '1.44em' }}>{Math.round(data.daily.rain_sum[0])}</Box>
                <Box>강수량</Box>
            </Box>
            <Box>
                <Box sx={{ mt: '1em', fontSize: '1.44em' }}>{data.daily.sunrise[0].slice(-5)}</Box>
                <Box>일출</Box>

                <Box sx={{ mt: '1em', fontSize: '1.44em' }}>{data.daily.sunset[0].slice(-5)}</Box>
                <Box>일몰</Box>
            </Box>
        </Box>
    );
};

export default Stats;
