import React, { useState, useRef } from 'react';
import { nestedMenuItemsFromObject } from './nestedMenuItemsFromObject';
import { ChevronDown } from '../icons/ChevronDown';
import { MenuItemData } from '../definitions';

interface NestedDropdownProps {
    children?: React.ReactNode;
    menuItemsData?: MenuItemData;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

export const NestedDropdown = React.forwardRef<HTMLDivElement, NestedDropdownProps>(function NestedDropdown(props, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { menuItemsData: data, onClick, className = '', ...rest } = props;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpen(!isOpen);
        onClick && onClick(e);
    };

    const handleClose = () => setIsOpen(false);

    const menuItems = nestedMenuItemsFromObject({
        menuItemsData: data?.items ?? [],
        isOpen: isOpen,
        handleClose
    });

    return (
        <div ref={ref || containerRef} className={`relative inline-block ${className}`} {...rest}>
            <button 
                onClick={handleClick}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
                {data?.label ?? 'Menu'}
                <span className="ml-2"><ChevronDown /></span>
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 z-50 min-w-[200px] bg-white border border-gray-200 shadow-xl rounded-md">
                    {menuItems}
                </div>
            )}
        </div>
    );
});
