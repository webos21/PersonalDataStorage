import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// project import
import Drawer from './Drawer';
import Header from './Header';
import config from '../../config';

// redux
import { isDrawerOpened, openDrawer } from '../../store/reducers/menu';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const drawerOpen = useSelector(isDrawerOpened);
    const dispatch = useDispatch();
    const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const onChange = (event) => setIsDesktop(event.matches);
        setIsDesktop(mq.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    const open = isDesktop ? true : drawerOpen;
    const drawerWidth = open ? config.layout.drawerWidth : 0;
    const handleDrawerToggle = () => {
        if (isDesktop) {
            return;
        }
        dispatch(openDrawer({ drawerOpen: !drawerOpen }));
    };

    return (
        <div className="min-h-screen w-full bg-gray-50">
            <Header open={open} handleDrawerToggle={handleDrawerToggle} isDesktop={isDesktop} drawerWidth={drawerWidth} />
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
            <main className="pt-16 transition-all duration-200" style={{ paddingLeft: drawerWidth }}>
                <div className="p-4 sm:p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
