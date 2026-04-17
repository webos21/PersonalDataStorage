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
    const drawerWidth = open ? config.layout.drawerWidth : 80;
    const drawerClass = open
        ? 'fixed bottom-0 left-0 top-0 z-50 translate-x-0 border-r border-slate-700 bg-[#1f2127] text-slate-200 transition-transform duration-200'
        : 'fixed bottom-0 left-0 top-0 z-50 -translate-x-full border-r border-slate-700 bg-[#1f2127] text-slate-200 transition-transform duration-200';

    return (
        <nav className="flex-shrink-0" aria-label="mailbox folders">
            <div className={drawerClass}>
                <div style={{ width: drawerWidth }} className="h-full overflow-hidden">
                    {drawerHeader}
                    <div className="h-[calc(100%-4rem)] overflow-hidden">
                        {drawerContent}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 border-t border-slate-700 bg-[#1b1d23] px-3 py-3">
                        <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs text-white">H</div>
                            <div className="min-w-0">
                                <p className="truncate text-xs font-semibold text-slate-200">syszone</p>
                                <p className="truncate text-[10px] text-slate-400">시스템관리자</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
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
