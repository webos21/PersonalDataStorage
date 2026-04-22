import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

interface NavItemProps {
    item: {
        id: string;
        title: string;
        url?: string;
        target?: boolean;
        external?: boolean;
        disabled?: boolean;
        chip?: any;
    };
    level: number;
}

const NavItem = ({ item, level }: NavItemProps) => {
    const menu = useSelector((state: any) => state.menu);
    const { drawerOpen, openItem } = menu;

    const isSelected = openItem.findIndex((id: string) => id === item.id) > -1;

    const baseClass = 'flex items-center w-full px-4 py-2 transition-colors z-[1201]';
    const selectedClass = isSelected ? 'border-r-2 border-orange-500 bg-slate-700 text-orange-300' : 'text-slate-200 hover:bg-slate-700/60';
    const paddingClass = drawerOpen ? `pl-${level * 7}` : 'pl-1.5';

    const content = (
        <button
            className={`${baseClass} ${selectedClass} ${paddingClass}`}
            disabled={item.disabled}
        >
            <span className={`text-sm ${isSelected ? 'text-orange-300' : 'text-slate-200'}`}>
                {item.title}
            </span>
            {item.chip && (
                <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${item.chip.color === 'primary' ? 'bg-blue-100 text-blue-800' : 'bg-slate-600 text-slate-100'}`}>
                    {item.chip.label}
                </span>
            )}
        </button>
    );

    if (item.external) {
        return (
            <a href={item.url} target={item.target ? '_blank' : '_self'} rel="noreferrer" className="block">
                {content}
            </a>
        );
    }

    return (
        <Link to={item.url || '#'} className="block">
            {content}
        </Link>
    );
};

export default NavItem;
