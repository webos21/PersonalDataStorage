import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainCard from './MainCard';

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
                        if (child.type && (child.type === 'item' || 'collapse-item')) {
                            if (location.pathname === child.url) {
                                setMain(menu);
                                setItem(child);
                            }
                        }
                    });
                }
                if (collapse.type && (collapse.type === 'item' || 'collapse-item')) {
                    if (location.pathname === collapse.url) {
                        setMain(menu);
                        setItem(collapse);
                    }
                }
            });
        } else if (menu && menu.type === 'item' && location.pathname === menu.url) {
            setMain(menu);
            setItem(menu);
        }
    };

    useEffect(() => {
        navigation?.items?.forEach((menu) => {
            if (menu.type && (menu.type === 'group' || 'collapse-group' || 'item')) {
                getCollapse(menu);
            }
        });
    }, [navigation, location.pathname]);

    let mainContent;
    let itemContent;
    let breadcrumbContent = <div />;

    if (main && (main.type === 'collapse' || 'group' || 'collapse-group')) {
        mainContent = (
            <Link to={document.location.pathname} className="text-gray-500 no-underline text-sm font-medium">
                {main.title}
            </Link>
        );
    }

    if (item && (item.type === 'item' || 'collapse-item')) {
        itemContent = <span className="text-gray-900 text-sm font-semibold">{item.title}</span>;

        if (item.breadcrumbs !== false) {
            breadcrumbContent = (
                <MainCard {...others} className="mb-6 p-4">
                    <div className="flex flex-col gap-2">
                        <nav aria-label="breadcrumb">
                            <ol className="flex items-center space-x-2 text-sm">
                                <li>
                                    <Link to="/" className="text-gray-500 no-underline font-medium">Home</Link>
                                </li>
                                <li className="text-gray-400">/</li>
                                {mainContent && <li>{mainContent}</li>}
                                {mainContent && <li className="text-gray-400">/</li>}
                                <li>{itemContent}</li>
                            </ol>
                        </nav>
                        {title && <h2 className="text-2xl font-bold mt-2">{item.title}</h2>}
                    </div>
                </MainCard>
            );
        } else {
            breadcrumbContent = <div className="w-full ml-1" />;
        }
    }

    return breadcrumbContent;
};

export default Breadcrumbs;
