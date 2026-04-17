import { forwardRef, ReactNode, useState, useRef, MouseEvent, FocusEvent, KeyboardEvent } from 'react';
import { IconMenuItem } from './IconMenuItem';

export interface NestedMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    parentMenuOpen: boolean;
    label?: string;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
    children?: ReactNode;
    className?: string;
}

const NestedMenuItem = forwardRef<HTMLButtonElement, NestedMenuItemProps>(
    function NestedMenuItem(
        {
            parentMenuOpen,
            label,
            rightIcon = <span className="text-gray-500">▶</span>,
            leftIcon = null,
            children,
            className = '',
            ...restProps
        },
        ref
    ) {
        const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
        const containerRef = useRef<HTMLDivElement | null>(null);
        const menuContainerRef = useRef<HTMLDivElement | null>(null);

        const handleMouseEnter = () => setIsSubMenuOpen(true);
        const handleMouseLeave = () => setIsSubMenuOpen(false);

        const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Escape') {
                setIsSubMenuOpen(false);
            }
        };

        const open = isSubMenuOpen && parentMenuOpen;

        return (
            <div 
                className={`relative group ${className}`}
                ref={containerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onKeyDown={handleKeyDown}
                role="menuitem"
            >
                <IconMenuItem
                    ref={ref}
                    label={label}
                    leftIcon={leftIcon}
                    rightIcon={rightIcon}
                    {...restProps}
                />
                
                {open && (
                    <div 
                        className="absolute left-full top-0 z-50 min-w-[200px] bg-white border border-gray-200 shadow-xl rounded-md"
                        ref={menuContainerRef}
                    >
                        {children}
                    </div>
                )}
            </div>
        );
    }
);

NestedMenuItem.displayName = 'NestedMenuItem';
export default NestedMenuItem;