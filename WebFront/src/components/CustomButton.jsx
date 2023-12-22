import { Box, Stack, Typography } from '@mui/material';

export const ButtonType = {
    WHITE: 'white',
    BLUE: 'blue'
};

// 일괄등록 개별등록 버튼
const CustomButton = ({ icon, onClick, message, variant }) => {
    let white = {
        display: 'flex',
        height: 45,
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid transparent',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: 5,
        p: '20px',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: 'black',
            color: 'white'
        }
    };
    let blue = {
        display: 'flex',
        height: 45,
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        backgroundColor: '#0069d8',
        color: 'white',
        border: '1px solid transparent',
        borderRadius: 5,
        p: '20px',
        ml: 2
    };

    const setVariant = () => {
        if (variant === 'white') {
            return white;
        }
        if (variant === 'blue') {
            return blue;
        }
        return white; //default
    };

    return (
        <Box
            sx={setVariant()}
            onClick={() => {
                if (onClick) onClick();
            }}
        >
            <Stack direction={'row'}>
                {icon}
                <Typography sx={{ fontsize: 12, ml: icon && 1 }}>{message}</Typography>
            </Stack>
        </Box>
    );
};

export default CustomButton;
