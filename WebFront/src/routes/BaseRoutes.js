import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// render - pages
const Checking = Loadable(lazy(() => import('../pages/checking')));
const Login = Loadable(lazy(() => import('../pages/Login')));

// ==============================|| AUTH ROUTING ||============================== //

const BaseRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <Login />
        }
    ]
};

export default BaseRoutes;
