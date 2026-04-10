import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// project import
import Drawer from './Drawer';
import Header from './Header';

// redux
import { isDrawerOpened, openDrawer } from '../../store/reducers/menu';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const drawerOpen = useSelector(isDrawerOpened);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(drawerOpen);
    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };

    return (
        <div className="flex w-full">
            <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
            <main className="w-full flex-grow p-4 sm:p-6">
                <div className="h-16" /> {/* Placeholder for Toolbar */}
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
