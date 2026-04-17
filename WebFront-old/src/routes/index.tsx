import { useRoutes } from 'react-router-dom';

// project import
import BaseRoutes from './BaseRoutes';
import LayoutRoutes from './LayoutRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const ThemeRoutes = () => {
    return useRoutes([LayoutRoutes, BaseRoutes]);
};

export default ThemeRoutes;
