import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// material-ui
import { Avatar, Chip, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item, level }) => {
    const theme = useTheme();
    const menu = useSelector((state) => state.menu);
    const { drawerOpen, openItem } = menu;

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const isSelected = openItem.findIndex((id) => id === item.id) > -1;

    const textColor = 'text.primary';
    const iconSelectedColor = 'primary.main';

    // console.log('NavItem', item, level);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            // onClick={() => {
            //     itemHandler(item.id);
            // }}
            selected={isSelected}
            sx={{
                zIndex: 1201,
                pl: drawerOpen ? `${level * 28}px` : 1.5,
                py: !drawerOpen && level === 1 ? 0.35 : 0.1,
                ...(drawerOpen && {
                    '&:hover': {
                        // bgcolor: 'primary.lighter'
                    },
                    '&.Mui-selected': {
                        borderRight: `2px solid ${theme.palette.primary.main}`,
                        color: iconSelectedColor,
                        '&:hover': {
                            color: iconSelectedColor,
                            bgcolor: 'primary.lighter'
                        }
                    }
                }),
                ...(!drawerOpen && {
                    '&:hover': {
                        bgcolor: 'transparent'
                    },
                    '&.Mui-selected': {
                        '&:hover': {
                            bgcolor: 'transparent'
                        },
                        bgcolor: 'transparent'
                    }
                })
            }}
        >
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
                <ListItemText
                    primary={
                        <Typography variant="h6" sx={{ ml: 1.5, color: isSelected ? iconSelectedColor : textColor, fontSize: 12 }}>
                            {item.title}
                        </Typography>
                    }
                />
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
