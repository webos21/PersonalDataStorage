import { useSelector } from 'react-redux';
import { useState } from 'react';

// project import
import NavItem from './NavItem';

const NavGroup = ({ item, level = 1 }) => {
    const menu = useSelector((state: any) => state.menu);
    const { drawerOpen } = menu;
    const [open, setOpen] = useState(false);
    
    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon className={drawerOpen ? 'text-base' : 'text-xl'} /> : null;

    const navCollapse = item.children?.map((menuItem: any) => {
        switch (menuItem.type) {
            case 'collapse-group':
            case 'group':
                return <NavGroup key={menuItem.id} item={menuItem} level={menuItem.level || level + 1} />;
            case 'item-group':
                return (
                    <div key={menuItem.id} className="w-full mt-4 pl-6 text-xs text-gray-500 font-semibold uppercase">
                        {menuItem.title}
                    </div>
                );
            case 'collapse-item':
            case 'item':
                return <NavItem key={menuItem.id} item={menuItem} level={menuItem.level || level + 1} />;
            case 'divide-group':
                return (
                    <div key={menuItem.id} className="pl-6 my-4 text-xs font-semibold text-gray-500">
                        {menuItem.title}
                    </div>
                );
            default:
                return (
                    <div key={menuItem.id} className="text-center text-red-500 text-sm">
                        Fix - Group Collapse or Items
                    </div>
                );
        }
    });

    return (
        <div className="w-full">
            {item.type === 'collapse-group' ? (
                <div className="flex flex-col">
                    <button 
                        onClick={() => setOpen(!open)}
                        className="flex items-center w-full p-4 hover:bg-gray-100"
                    >
                        {itemIcon && <span className="mr-3">{itemIcon}</span>}
                        <span className="text-sm">{item.title}</span>
                        <span className="ml-auto">
                            {open ? '▼' : '▶'}
                        </span>
                    </button>
                    {open && <div className="flex flex-col">{navCollapse}</div>}
                </div>
            ) : (
                <div className={`mb-3 ${drawerOpen ? 'pl-6' : 'pl-0'}`}>
                    {item.title && drawerOpen && (
                        <div className="text-xs font-semibold text-gray-500 mb-2">{item.title}</div>
                    )}
                    {navCollapse}
                </div>
            )}
        </div>
    );
};

export default NavGroup;