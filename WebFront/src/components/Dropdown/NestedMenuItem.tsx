// react
import {
    ElementType,
    forwardRef,
    HTMLAttributes,
    RefAttributes,
    ReactNode,
    useImperativeHandle,
    useRef,
    useState
} from 'react';

// material-ui
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem, {MenuItemProps} from '@mui/material/MenuItem';
import ArrowRight from '@mui/icons-material/ArrowRight';

export type NestedMenuItemProps = Omit<MenuItemProps, 'button'> & {
    parentMenuOpen: boolean;
    component?: ElementType;
    label?: string;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
    children?: ReactNode;
    className?: string;
    tabIndex?: number;
    disabled?: boolean;
    ContainerProps?: HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement | null>;
    MenuProps?: Partial<Omit<MenuProps, 'children'>>;
    button?: true | undefined;
};

const NestedMenuItem = forwardRef<HTMLLIElement | null, NestedMenuItemProps>(function NestedMenuItem(props, ref) {
    const {
        parentMenuOpen,
        label,
        rightIcon = <ArrowRight style={{ fontSize: 16 }} />,
        keepOpen,
        children,
        customTheme,
        className,
        tabIndex: tabIndexProp,
        ContainerProps: ContainerPropsProp = {},
        MenuProps?: Partial<Omit<MenuProps, 'children'>>;
        rightAnchored,
        ...MenuItemProps
    } = props;

    const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp;

    const menuItemRef = useRef<HTMLLIElement | null>(null);
    useImperativeHandle(ref, () => menuItemRef.current);

    const containerRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(containerRefProp, () => containerRef.current);

    const menuContainerRef = useRef<HTMLDivElement | null>(null);

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsSubMenuOpen(true);

        if (ContainerProps?.onMouseEnter) {
            ContainerProps.onMouseEnter(event);
        }
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsSubMenuOpen(false);

        if (ContainerProps?.onMouseLeave) {
            ContainerProps.onMouseLeave(event);
        }
    };

    const isSubmenuFocused = () => {
        const active = containerRef.current?.ownerDocument?.activeElement;

        for (const child of menuContainerRef.current?.children ?? []) {
            if (child === active) {
                return true;
            }
        }
        return false;
    };

    const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
        if (event.target === containerRef.current) {
            setIsSubMenuOpen(true);
        }

        if (ContainerProps?.onFocus) {
            ContainerProps.onFocus(event);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            return;
        }

        if (isSubmenuFocused()) {
            event.stopPropagation();
        }

        const active = containerRef.current?.ownerDocument?.activeElement;

        if (event.key === 'ArrowLeft' && isSubmenuFocused()) {
            containerRef.current?.focus();
        }

        if (event.key === 'ArrowRight' && event.target === containerRef.current && event.target === active) {
            const firstChild = menuContainerRef.current?.children[0] as HTMLElement;
            firstChild?.focus();
        }
    };

    const open = isSubMenuOpen && parentMenuOpen;

    let tabIndex;
    if (!props.disabled) {
        tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
    }

    return (
        <div
            {...ContainerProps}
            ref={containerRef}
            onFocus={handleFocus}
            tabIndex={tabIndex}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
        >
            <MenuItem {...MenuItemProps} data-open={!!open || undefined} className={className} ref={menuItemRef} keepOpen={keepOpen}>
                {label}
                <div style={{ flexGrow: 1 }} />
                {rightIcon}
            </MenuItem>
            <Menu
                hideBackdrop
                style={{ pointerEvents: 'none' }}
                anchorEl={menuItemRef.current}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: rightAnchored ? 'left' : 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: rightAnchored ? 'right' : 'left'
                }}
                PaperProps={{ style: customTheme }} // Replace 'any' with appropriate type
                open={!!open}
                autoFocus={false}
                disableAutoFocus
                disableEnforceFocus
                onClose={() => {
                    setIsSubMenuOpen(false);
                }}
            >
                <div ref={menuContainerRef} style={{ pointerEvents: 'auto' }}>
                    {children}
                </div>
            </Menu>
        </div>
    );
});

export default NestedMenuItem2;
