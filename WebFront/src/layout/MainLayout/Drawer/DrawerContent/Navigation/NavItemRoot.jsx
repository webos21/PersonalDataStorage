import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// material-ui
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import { MODE } from '../../../../../themes/palette';

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

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;
    const isSelected = openItem.findIndex((id) => id === item.id) > -1;
    const textColor = 'text.primary';
    const iconSelectedColor = 'primary.main';
    const transparent = theme.palette.common.transparent;

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            selected={isSelected}
            sx={{
                zIndex: 1201,
                pl: drawerOpen ? `${level * 28}px` : 1.5,
                py: !drawerOpen && level === 1 ? 1 : 0.75,
                ...(drawerOpen && {
                    '&:hover': {
                        bgcolor: theme.palette.background.lighter
                    },
                    '&.Mui-selected': {
                        bgcolor: theme.palette.mode === MODE.LIGHT ? theme.palette.background.lighter : theme.palette.common,
                        borderRight: `2px solid ${theme.palette.primary.main}`,
                        color: iconSelectedColor,
                        '&:hover': {
                            color: iconSelectedColor,
                            bgcolor: theme.palette.background.lighter
                        }
                    }
                }),
                ...(!drawerOpen && {
                    '&:hover': {
                        bgcolor: transparent
                    },
                    '&.Mui-selected': {
                        '&:hover': {
                            bgcolor: transparent
                        },
                        bgcolor: transparent
                    }
                })
            }}
        >
            {itemIcon && (
                <ListItemIcon
                    sx={{
                        minWidth: 28,
                        color: isSelected ? iconSelectedColor : textColor,
                        ...(!drawerOpen && {
                            borderRadius: 1.5,
                            width: 36,
                            height: 24,
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: 'secondary.lighter'
                            }
                        }),
                        ...(!drawerOpen &&
                            isSelected && {
                                bgcolor: transparent,
                                '&:hover': {
                                    bgcolor: transparent
                                }
                            })
                    }}
                >
                    {itemIcon}
                </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
                <ListItemText
                    primary={
                        <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor, fontSize: 12 }}>
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
