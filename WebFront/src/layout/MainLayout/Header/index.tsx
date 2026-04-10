// project import
import HeaderContent from './HeaderContent';

// icons (placeholder replacements for icons-material)
const MenuIcon = () => <span>☰</span>;
const MenuOpenIcon = () => <span>☷</span>;

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
    
    // common header
    const mainHeader = (
        <div className="flex items-center w-full px-4 h-16">
            {!open && (
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
        <header className="fixed top-0 left-0 w-full z-40 bg-transparent">
            {mainHeader}
        </header>
    );
};

export default Header;
