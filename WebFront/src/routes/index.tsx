import { useRoutes } from 'react-router-dom';

// project import
import BaseRoutes from './BaseRoutes';
import LayoutRoutes from './LayoutRoutes';

interface ThemeRoutesProps {
    locationArgs?: string;
}

// ==============================|| ROUTING RENDER ||============================== //

const ThemeRoutes = ({ locationArgs }: ThemeRoutesProps) => {
    return useRoutes([LayoutRoutes, BaseRoutes], locationArgs);
};

export default ThemeRoutes;
