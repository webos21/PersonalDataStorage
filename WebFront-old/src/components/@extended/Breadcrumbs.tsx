import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// project imports

interface MenuItem {
    id: string;
    title: string;
    type: 'item' | 'group' | 'collapse';
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
}

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ navigation, title, ...others }: BreadcrumbsProps) => {
    const location = useLocation();
    const [main, setMain] = useState();
    const [item, setItem] = useState();

    // set active item state
    const getCollapse = (menu) => {
        if (menu.children) {
            menu.children.filter((collapse) => {
                if (collapse.type && collapse.type === 'collapse') {
                    getCollapse(collapse);
                } else if (collapse.type && collapse.type === 'item') {
                    if (location.pathname === collapse.url) {
                        setMain(menu);
                        setItem(collapse);
                    }
                }
                return false;
            });
        }
    };

    useEffect(() => {
        navigation?.items?.map((menu) => {
            if (menu.type && menu.type === 'group') {
                getCollapse(menu);
            }
            return false;
        });
    });

    // only used for component demo breadcrumbs
    if (location.pathname === '/breadcrumbs') {
        location.pathname = '/dashboard/analytics';
    }

    let mainContent;
    let itemContent;
    let breadcrumbContent = <div />;
    let itemTitle = '';

    // collapse item
    if (main && main.type === 'collapse') {
        mainContent = (
            <Link to={document.location.pathname} className="text-gray-500 no-underline text-sm font-medium">
                {main.title}
            </Link>
        );
    }

    // items
    if (item && item.type === 'item') {
        itemTitle = item.title;
        itemContent = (
            <span className="text-gray-900 text-sm font-semibold">
                {itemTitle}
            </span>
        );

        // main
        if (item.breadcrumbs !== false) {
            breadcrumbContent = (
                <div className="mb-6 bg-transparent" {...others}>
                    <div className="flex flex-col gap-2">
                        <nav aria-label="breadcrumb">
                            <ol className="flex items-center space-x-2 text-sm">
                                <li>
                                    <Link to="/" className="text-gray-500 no-underline font-medium">
                                        Home
                                    </Link>
                                </li>
                                <li className="text-gray-400">/</li>
                                {mainContent && <li>{mainContent}</li>}
                                {mainContent && <li className="text-gray-400">/</li>}
                                <li>{itemContent}</li>
                            </ol>
                        </nav>
                        {title && (
                            <h5 className="text-xl font-bold mt-2">{item.title}</h5>
                        )}
                    </div>
                </div>
            );
        }
    }

    return breadcrumbContent;
};

export default Breadcrumbs;
