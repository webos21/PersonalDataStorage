// project import
import Logo from '../../../../components/Logo';

// icons (placeholder replacements)
const MenuIcon = () => <span>☰</span>;
const MenuOpenIcon = () => <span>☷</span>;

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open, handleDrawerToggle }) => {
    return (
        <div className={`flex items-center px-4 h-16 ${open ? 'justify-between' : 'justify-center'}`}>
            <div className="flex items-center gap-3">
                {open && <Logo />}
            </div>
            <button
                onClick={handleDrawerToggle}
                className="p-2 text-gray-600 opacity-30 hover:opacity-100"
            >
                {!open ? <MenuIcon /> : <MenuOpenIcon />}
            </button>
        </div>
    );
};

export default DrawerHeader;
