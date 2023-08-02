import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ navigation, title, divider, ...others }) => {
    const location = useLocation();
    const [main, setMain] = useState();
    const [item, setItem] = useState();

    // set active item state
    const getCollapse = (menu) => {
        // console.log('getCollapse menu : ', menu);
        if (menu.children) {
            menu.children.forEach((collapse) => {
                if (collapse.children) {
                    collapse.children.forEach((child) => {
                        if (child.type && (child.type === 'item' || 'collapse-item')) {
                            if (location.pathname === child.url) {
                                // console.log('child : ', child, ' location.pathname : ', location.pathname);
                                setMain(menu);
                                setItem(child);
                                return;
                            }
                        }
                    });
                }
                if (collapse.type && (collapse.type === 'item' || 'collapse-item')) {
                    if (location.pathname === collapse.url) {
                        // console.log('collapse : ', collapse, ' location.pathname : ', location.pathname);
                        setMain(menu);
                        setItem(collapse);
                        return;
                    }
                }
            });
        } else {
            if (menu && menu.type === 'item' && location.pathname === menu.url) {
                // console.log('No Children menu : ', menu);
                setMain(menu);
                setItem(menu);
            }
        }
    };

    useEffect(() => {
        navigation?.items?.map((menu) => {
            if (menu.type && (menu.type === 'group' || 'collapse-group')) {
                // console.log('useEffect menu: ', menu);
                getCollapse(menu);
            }
            return false;
        });
    });

    // only used for component demo breadcrumbs
    if (location.pathname === '/breadcrumbs') {
        location.pathname = '/dashboard/analytics';
    }

    let mainContent;
    let itemContent;
    let breadcrumbContent = <Typography />;
    let itemTitle = '';

    // collapse item
    if (main && (main.type === 'group' || 'collapse-group')) {
        const ItemIcon = main.icon;
        mainContent = <ItemIcon style={{ fontSize: '1.5rem', color: 'black' }} />;
    }
    // collapse item
    if (main && main.type === 'item') {
        const ItemIcon = item.icon;
        mainContent = <ItemIcon style={{ fontSize: '1.5rem', color: 'black' }} />;
    }

    // items
    if (item && (item.type === 'item' || 'collapse-item')) {
        itemTitle = item.title;
        itemContent = (
            <Typography variant="h4" color="black">
                {itemTitle}
            </Typography>
        );

        // main
        breadcrumbContent = (
            <Box {...others}>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0.7}>
                    <Stack direction="row" alignItems="center" gap={1} sx={{ pt: 1 }}>
                        {mainContent}
                        {itemContent}
                    </Stack>
                    {divider && <Grid item>-</Grid>}
                    {title && (
                        <Grid item sx={{ mt: 2 }}>
                            <Typography variant="h2">{item.title}</Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>
        );
    }

    return breadcrumbContent;
};

Breadcrumbs.propTypes = {
    navigation: PropTypes.object,
    title: PropTypes.bool,
    divider: PropTypes.bool
};

export default Breadcrumbs;
