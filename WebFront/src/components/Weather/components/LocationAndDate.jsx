import { Box, Typography } from '@mui/material';

const LocationAndDate = ({ data, city }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ margin: 0, fontSize: '2em', fontWeight: 600 }}>{city}</Box>
            <Typography varient="h6">{data}</Typography>
        </Box>
    );
};

export default LocationAndDate;
