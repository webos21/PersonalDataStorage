// project import
import HeaderContent from './HeaderContent';

// icons (placeholder replacements for icons-material)
const MenuIcon = () => <span>☰</span>;
const MenuOpenIcon = () => <span>☷</span>;

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle, isDesktop, drawerWidth }) => {
    
    // common header
    const mainHeader = (
        <div className="flex h-16 w-full items-center px-4">
            {!isDesktop && !open && (
                <button
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    className="p-2 mr-2 text-gray-600 opacity-30 hover:opacity-100"
                >
                    {!open ? <MenuIcon /> : <MenuOpenIcon />}
                </button>
            )}
            <div className="flex-grow">
                <HeaderContent />
            </div>
        </div>
    );

    return (
        <header className="fixed top-0 right-0 z-40 border-b bg-white/95 backdrop-blur" style={{ left: drawerWidth }}>
            {mainHeader}
        </header>
    );
};

export default Header;
