// icons (placeholder replacements)
const MenuIcon = () => <span>☰</span>;
const MenuOpenIcon = () => <span>☷</span>;

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open, handleDrawerToggle }) => {
    return (
        <div className={`flex h-16 items-center border-b border-slate-700 px-4 ${open ? 'justify-between' : 'justify-center'}`}>
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-orange-400">SynergyLo</span>
                {open && <span className="text-[10px] text-slate-400">Fleet Management System</span>}
            </div>
            <button
                onClick={handleDrawerToggle}
                className="p-2 text-slate-300 opacity-60 hover:opacity-100"
            >
                {!open ? <MenuIcon /> : <MenuOpenIcon />}
            </button>
        </div>
    );
};

export default DrawerHeader;
