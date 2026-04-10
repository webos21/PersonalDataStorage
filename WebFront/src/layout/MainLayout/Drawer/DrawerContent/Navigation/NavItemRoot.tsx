import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// ==============================|| NAVIGATION - LIST ITEM ROOT ||============================== //

interface NavItemRootProps {
    item: {
        id: string;
        title: string;
        url?: string;
        target?: boolean;
        external?: boolean;
        disabled?: boolean;
        icon?: any;
        chip?: any;
    };
    level: number;
}

const NavItemRoot = ({ item, level }: NavItemRootProps) => {
    const menu = useSelector((state: any) => state.menu);
    const { drawerOpen, openItem } = menu;

    const isSelected = openItem.findIndex((id: string) => id === item.id) > -1;
    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon className={drawerOpen ? 'text-base' : 'text-xl'} /> : null;

    const baseClass = "flex items-center w-full px-4 py-2 transition-colors z-[1201]";
    const selectedClass = isSelected ? "border-r-2 border-blue-600 text-blue-600 bg-gray-50" : "text-gray-900";
    
    const content = (
        <button
            className={`${baseClass} ${selectedClass}`}
            disabled={item.disabled}
        >
            {itemIcon && <span className="mr-3">{itemIcon}</span>}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
                <span className={`text-sm ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
                    {item.title}
                </span>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${item.chip.color === 'primary' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200'}`}>
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

export default NavItemRoot;