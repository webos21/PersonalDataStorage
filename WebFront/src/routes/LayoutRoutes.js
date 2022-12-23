import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';

// render - pages
const Home = Loadable(lazy(() => import('../pages/home')));
const Test = Loadable(lazy(() => import('../pages/test')));

// ==============================|| MAIN ROUTING ||============================== //

const LayoutRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/test',
            element: <Test />
        }
    ]
};

export default LayoutRoutes;
