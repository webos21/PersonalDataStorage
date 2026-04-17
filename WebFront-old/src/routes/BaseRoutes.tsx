import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// render - pages
const Login = Loadable(lazy(() => import('../pages/Login/Login')));
const Logout = Loadable(lazy(() => import('../pages/Logout/Logout')));

// ==============================|| AUTH ROUTING ||============================== //

const BaseRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/logout',
            element: <Logout />
        }
    ]
};

export default BaseRoutes;
