import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface MenuItem {
    id: string;
    title: string;
    type: 'item' | 'group' | 'collapse' | 'collapse-item' | 'none-navi';
    url?: string;
    icon?: any;
    children?: MenuItem[];
    breadcrumbs?: boolean;
}

interface Navigation {
    items: MenuItem[];
}

interface BreadcrumbsProps {
    navigation: Navigation;
    title?: boolean;
    divider?: boolean;
}

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ navigation, title, divider, ...others }: BreadcrumbsProps) => {
    const location = useLocation();
    const [main, setMain] = useState();
    const [item, setItem] = useState();

    const getCollapse = (menu) => {
        if (menu.children) {
            menu.children.forEach((collapse) => {
                if (collapse.children) {
                    collapse.children.forEach((child) => {
                        if (child.type && (child.type === 'item' || 'collapse-item' || 'none-navi')) {
                            if (location.pathname === child.url) {
                                setMain(menu);
                                setItem(child);
                                return;
                            }
                        }
                    });
                }
                if (collapse.type && (collapse.type === 'item' || 'collapse-item' || 'none-navi')) {
                    if (location.pathname === collapse.url) {
                        setMain(menu);
                        setItem(collapse);
                        return;
                    }
                }
            });
        } else {
            if (menu && (menu.type === 'item' || 'none-navi') && location.pathname === menu.url) {
                setMain(menu);
                setItem(menu);
            }
        }
    };

    useEffect(() => {
        navigation?.items?.forEach((menu) => {
            if (menu.type && (menu.type === 'group' || 'collapse-group')) {
                getCollapse(menu);
            }
        });
    }, [navigation, location.pathname]);

    let mainContent;
    let itemContent;
    let breadcrumbContent = <div />;

    if (main) {
        const ItemIcon = main.icon;
        mainContent = <ItemIcon className="text-xl text-gray-900" />;
    }

    if (item) {
        itemContent = <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>;

        breadcrumbContent = (
            <div {...others} className="p-1">
                <div className="flex flex-col gap-1 items-start">
                    <div className="flex items-center gap-2 pt-1">
                        {mainContent}
                        {itemContent}
                    </div>
                    {divider && <div>-</div>}
                    {title && <h2 className="text-3xl font-bold mt-2">{item.title}</h2>}
                </div>
            </div>
        );
    }

    return breadcrumbContent;
};

export default Breadcrumbs;
