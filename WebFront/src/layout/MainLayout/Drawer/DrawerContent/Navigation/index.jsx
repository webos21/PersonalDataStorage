// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavItemRoot from './NavItemRoot';
import NavGroup from './NavGroup';
import menuItem from '../../../../../menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
    const navGroups = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            case 'collapse-group':
                return <NavGroup key={item.id} item={item} />;
            case 'none-group':
                return <NavGroup key={item.id} item={item} />;
            case 'item':
                return <NavItemRoot key={item.id} item={item} />;
            case 'none-navi':
                return;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Fix - Navigation Group
                    </Typography>
                );
        }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
