import PropTypes from 'prop-types';

// material-ui
import { Stack, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// material-icon
import { MenuOpen, Menu } from '@mui/icons-material';

// project import
import Logo from '../../../../components/Logo';
import DrawerHeaderStyled from './DrawerHeaderStyled';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open, handleDrawerToggle }) => {
    const theme = useTheme();

    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={open}>
            <Stack direction="row" spacing={3}>
                <Logo />
                <IconButton disableRipple aria-label="open drawer" onClick={handleDrawerToggle}>
                    {!open ? <Menu /> : <MenuOpen />}
                </IconButton>
            </Stack>
        </DrawerHeaderStyled>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool,
    handleDrawerToggle: PropTypes.func
};

export default DrawerHeader;
