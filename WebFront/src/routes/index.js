import PropTypes from 'prop-types';
import { useRoutes } from 'react-router-dom';

// project import
import BaseRoutes from './BaseRoutes';
import LayoutRoutes from './LayoutRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const ThemeRoutes = ({ locationArgs }) => {
    return useRoutes([LayoutRoutes, BaseRoutes], locationArgs);
};

ThemeRoutes.propTypes = {
    locationArgs: PropTypes.string
};

export default ThemeRoutes;
