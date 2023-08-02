import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// material-ui
import { Box, List, Typography, Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ChevronRight, ExpandMore } from '@mui/icons-material';

// project import
import NavItem from './NavItem';
import { useState } from 'react';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const menu = useSelector((state) => state.menu);
    const { drawerOpen } = menu;
    const [open, setOpen] = useState(false);
    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

    const navCollapse = item.children?.map((menuItem) => {
        switch (menuItem.type) {
            case 'collapse-group':
                return <NavGroup key={menuItem.id} item={menuItem} level={menuItem.level} />;
            case 'group':
                return <NavGroup key={menuItem.id} item={menuItem} level={menuItem.level} />;
            case 'item-group':
                return (
                    <Typography key={menuItem.id} variant="caption" display="block" sx={{ width: 1.0, mt: 2, pl: 3, bgcolor: '#fafafa' }}>
                        {menuItem.title}
                    </Typography>
                );
            case 'collapse-item':
                return <NavItem key={menuItem.id} item={menuItem} level={menuItem.level} />;
            case 'item':
                return <NavItem key={menuItem.id} item={menuItem} level={menuItem.level} />;
            case 'divide-group':
                return (
                    <Box key={menuItem.id} sx={{ pl: 3, mb: 1.5, mt: 1.5 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            {menuItem.title}
                        </Typography>
                    </Box>
                );
            default:
                return (
                    <Typography key={menuItem.id} variant="h6" color="error" align="center">
                        Fix - Group Collapse or Items
                    </Typography>
                );
        }
    });

    return (
        <>
            {item.type === 'collapse-group' ? (
                <List subheader={item.title && drawerOpen && <Box sx={{ pl: 3 }}></Box>}>
                    <ListItemButton onClick={() => setOpen(!open)}>
                        <ListItemIcon>{itemIcon}</ListItemIcon>
                        <ListItemText primary={item.title} primaryTypographyProps={{ style: { fontWeight: 'normal', fontSize: '13px' } }} />
                        {open ? <ExpandMore fontSize="1.15em" color="grey" /> : <ChevronRight fontSize="1.15em" color="grey" />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {navCollapse}
                        </List>
                    </Collapse>
                </List>
            ) : item.type === 'none-group' ? (
                <List
                    subheader={
                        item.title && drawerOpen && <></>
                        // && (
                        //     <Box sx={{ pl: 3, mb: 1.5 }}>
                        //         <Typography variant="subtitle2" color="textSecondary">
                        //             {item.title}
                        //         </Typography>
                        //         {/* only available in paid version */}
                        //     </Box>
                        // )
                    }
                    sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
                >
                    {navCollapse}
                </List>
            ) : (
                <List
                    subheader={
                        item.title &&
                        drawerOpen && (
                            <Box sx={{ pl: 3, ml: 2.0 }}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {item.title}
                                </Typography>
                                {/* only available in paid version */}
                            </Box>
                        )
                    }
                    sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
                >
                    {navCollapse}
                </List>
            )}
        </>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
