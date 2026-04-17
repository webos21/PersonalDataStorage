import React, { useState, forwardRef, useRef, MouseEvent } from 'react';
import { nestedMenuItemsFromObject } from './nestedMenuItemsFromObject';
import { MenuItemData } from '../definitions';

export interface ContextMenuProps {
    children?: React.ReactNode;
    menuItems?: React.ReactNode[];
    menuItemsData?: MenuItemData[];
}

interface Position {
    top: number;
    left: number;
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(({ children, menuItems, menuItemsData }, ref) => {
    const wrapperRef = (ref as React.MutableRefObject<HTMLDivElement>) ?? useRef<HTMLDivElement>(null);
    const [menuPosition, setMenuPosition] = useState<Position | null>(null);
    const [mouseDownPosition, setMouseDownPosition] = useState<Position | null>(null);

    const handleItemClick = () => setMenuPosition(null);

    const handleMouseDown = (e: MouseEvent) => {
        if (menuPosition !== null) setMenuPosition(null);
        if (e.button !== 2) return;

        const wrapperBounds = wrapperRef.current?.getBoundingClientRect();
        if (!wrapperBounds ||
            e.clientX < wrapperBounds.left ||
            e.clientX > wrapperBounds.right ||
            e.clientY < wrapperBounds.top ||
            e.clientY > wrapperBounds.bottom
        ) return;

        setMouseDownPosition({ top: e.clientY, left: e.clientX });
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (mouseDownPosition === null) return;
        if (mouseDownPosition.top === e.clientY && mouseDownPosition.left === e.clientX) {
            setMenuPosition({ top: e.clientY, left: e.clientX });
        }
    };

    const menuContents = menuItems ?? (menuItemsData && nestedMenuItemsFromObject({
        menuItemsData,
        isOpen: !!menuPosition,
        handleClose: handleItemClick
    }));

    return (
        <div ref={wrapperRef} onContextMenu={(e) => e.preventDefault()} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            {menuPosition && (
                <div 
                    className="fixed z-50 bg-white border border-gray-200 shadow-xl rounded-md py-1"
                    style={{ top: menuPosition.top, left: menuPosition.left }}
                    onClick={() => setMenuPosition(null)}
                >
                    {menuContents}
                </div>
            )}
            {children}
        </div>
    );
});

ContextMenu.displayName = 'ContextMenu';
export { ContextMenu };