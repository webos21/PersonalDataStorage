// material-ui
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

// project import
import config from '../../../config';

const openedMixin = (theme) => ({
    width: config.layout.drawerWidth,
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    borderRight: 'none',
    boxShadow: 'none'
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: theme.palette.common.white,
    width: 0,
    borderRight: 'none',
    boxShadow: 'none'
    // boxShadow: theme.customShadows.z1
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: config.layout.drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
    })
}));

export default MiniDrawerStyled;
