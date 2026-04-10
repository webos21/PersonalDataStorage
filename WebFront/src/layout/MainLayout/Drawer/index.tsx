import { useMemo } from 'react';

// project import
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import config from '../../../config';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

const MainDrawer = ({ open, handleDrawerToggle }) => {
    const drawerContent = useMemo(() => <DrawerContent />, []);
    const drawerHeader = useMemo(() => <DrawerHeader open={open} handleDrawerToggle={handleDrawerToggle} />, [open, handleDrawerToggle]);

    // Tailwind-based drawer styles
    const drawerClass = open 
        ? `fixed inset-y-0 left-0 z-50 w-[${config.layout.drawerWidth}px] bg-white transition-transform transform translate-x-0` 
        : `fixed inset-y-0 left-0 z-50 w-20 bg-white transition-transform transform -translate-x-full`;

    return (
        <nav className="flex-shrink-0" aria-label="mailbox folders">
            {/* Sidebar for desktop/mobile */}
            <div className={drawerClass}>
                {drawerHeader}
                {drawerContent}
            </div>
            
            {/* Overlay for mobile drawer */}
            {open && (
                <div 
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={handleDrawerToggle}
                />
            )}
        </nav>
    );
};

export default MainDrawer;
