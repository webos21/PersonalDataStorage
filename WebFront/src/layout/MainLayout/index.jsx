import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import Drawer from './Drawer';
import Header from './Header';

// redux
import { isDrawerOpened, openDrawer } from '../../store/reducers/menu';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    // eslint-disable-next-line
    const matchDownLG = useMediaQuery(theme.breakpoints.down('md'));
    const drawerOpen = useSelector(isDrawerOpened);
    const dispatch = useDispatch();

    // drawer toggler
    const [open, setOpen] = useState(drawerOpen);
    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };

    useEffect(() => {
        if (matchDownLG) {
            setOpen(true);
            dispatch(openDrawer({ drawerOpen: true }));
        }
    }, [matchDownLG]);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
