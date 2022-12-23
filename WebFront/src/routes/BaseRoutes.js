import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// render - pages
const Checking = Loadable(lazy(() => import('../pages/checking')));

// ==============================|| AUTH ROUTING ||============================== //

const BaseRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/checking',
            element: <Checking />
        }
    ]
};

export default BaseRoutes;
