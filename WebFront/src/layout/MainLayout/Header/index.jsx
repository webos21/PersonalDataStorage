import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';

// material-icon
import { MenuOpen, Menu } from '@mui/icons-material';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    // common header
    const mainHeader = (
        <Toolbar>
            {!open && (
                <IconButton
                    disableRipple
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    edge="start"
                    color="secondary"
                    sx={{
                        color: theme.palette.common.grayDark,
                        opacity: 0.3,
                        bgcolor: open ?? theme.palette.common.white,
                        ml: { xs: 0, lg: -2 }
                    }}
                >
                    {!open ? <Menu /> : <MenuOpen />}
                </IconButton>
            )}
            <HeaderContent />
        </Toolbar>
    );

    // app-bar params
    const appBar = {
        position: 'fixed',
        color: 'transparent', // origin : inherit
        elevation: 0
    };

    return (
        <>
            {!matchDownMD ? (
                <AppBarStyled open={open} {...appBar}>
                    {mainHeader}
                </AppBarStyled>
            ) : (
                <AppBar {...appBar}>{mainHeader}</AppBar>
            )}
        </>
    );
};

Header.propTypes = {
    open: PropTypes.bool,
    handleDrawerToggle: PropTypes.func
};

export default Header;
