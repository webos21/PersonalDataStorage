import React, { useState, useRef, forwardRef, ReactNode, FC } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
import NestedMenuItem from './NestedMenuItem2';

interface DropdownProps {
    trigger: ReactNode;
    menu: ReactNode[];
    keepOpen?: boolean;
    isOpen?: Element | null;
    onOpen?: (element: Element | null) => void;
    minWidth?: number;
}

export const Dropdown: FC<DropdownProps> = forwardRef(
    ({ trigger, menu, keepOpen: keepOpenGlobal, isOpen: controlledIsOpen, onOpen: onControlledOpen, minWidth }, ref) => {
        const [isInternalOpen, setInternalOpen] = useState<Element | null>(null);

        const isOpen = controlledIsOpen || isInternalOpen;

        let anchorRef = useRef<HTMLElement | null>(null);
        if (ref) {
            anchorRef = ref as React.MutableRefObject<HTMLElement | null>;
        }

        const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();

            if (menu.length) {
                onControlledOpen ? onControlledOpen(event.currentTarget) : setInternalOpen(event.currentTarget);
            }
        };

        const handleClose = (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();

            if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
                return;
            }

            handleForceClose();
        };

        const handleForceClose = () => {
            onControlledOpen ? onControlledOpen(null) : setInternalOpen(null);
        };

        const renderMenu: any = (menuItem: ReactNode, index: number) => {
            if (!React.isValidElement(menuItem)) return null;

            const { keepOpen: keepOpenLocal, ...props } = menuItem.props;

            let extraProps = {};
            if (props.menu) {
                extraProps = {
                    parentMenuOpen: isOpen
                };
            }

            return React.cloneElement(menuItem, {
                ...props,
                key: index,
                ...extraProps,
                onClick: (event: React.MouseEvent<HTMLElement>) => {
                    event.stopPropagation();

                    if (!keepOpenGlobal && !keepOpenLocal) {
                        handleClose(event);
                    }

                    if (props.onClick) {
                        props.onClick(event);
                    }
                },
                children: props.menu ? React.Children.map(props.menu, renderMenu) : props.children
            });
        };

        return (
            <>
                {React.cloneElement(trigger as React.ReactElement, {
                    onClick: isOpen ? handleForceClose : handleOpen,
                    ref: anchorRef
                })}

                <Menu PaperProps={{ sx: { minWidth: minWidth ?? 0 } }} anchorEl={isOpen} open={!!isOpen} onClose={handleClose}>
                    {menu.map(renderMenu)}
                </Menu>
            </>
        );
    }
);

export const DropdownMenuItem: FC = styled(MenuItem)`
    display: flex;
    justify-content: space-between !important;

    & > svg {
        margin-left: 32px;
    }
`;

// NestedMenuItem의 TypeScript 타입 정의에 맞게 수정이 필요할 수 있습니다.
export const DropdownNestedMenuItem: FC = styled(NestedMenuItem)`
    display: flex;
    justify-content: space-between !important;

    & > svg {
        margin-left: 32px;
    }
`;
