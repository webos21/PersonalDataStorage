import { useTheme } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, useMediaQuery } from '@mui/material';

const SearchButton = ({ onClick, sx, visibleText }) => {
    const theme = useTheme();
    const matchDownXS = useMediaQuery(theme.breakpoints.down('xs'));
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    const getText = () => {
        if (visibleText.xs !== '' && matchDownXS) {
            return visibleText.sx;
        }
        if (visibleText.sm !== '' && matchDownSM) {
            return visibleText.sm;
        }
        if (visibleText.md !== '' && matchDownMD) {
            return visibleText.md;
        }
        if (visibleText.default) {
            return visibleText.default;
        }
        return '';
    };
    return (
        <Box
            sx={[
                {
                    width: 50,
                    height: 50,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    color: 'white',
                    // ml: 1,
                    borderRadius: 2,
                    transition: 'background-color 0.3s',
                    '&:hover': {
                        backgroundColor: '#0069d8',
                        color: 'white'
                    },
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
                },
                sx
            ]}
            onClick={() => {
                if (onClick) onClick();
            }}
        >
            <SearchIcon />
            {getText()}
        </Box>
    );
};

export default SearchButton;
