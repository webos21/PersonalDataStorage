// project import
import NavItemRoot from './NavItemRoot';
import NavGroup from './NavGroup';
import menuItem from '../../../../../menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
    const navGroups = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            case 'collapse-group':
                return <NavGroup key={item.id} item={item} />;
            case 'none-group':
                return <NavGroup key={item.id} item={item} />;
            case 'item':
                return <NavItemRoot key={item.id} item={item} />;
            case 'none-navi':
                return;
            default:
                return (
                    <h6 key={item.id} className="text-center text-red-500 text-sm font-semibold">
                        Fix - Navigation Group
                    </h6>
                );
        }
    });

    return <div className="pt-2">{navGroups}</div>;
};

export default Navigation;
