import React, { forwardRef } from 'react';

interface IconMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    label?: string;
    className?: string;
    disabled?: boolean;
}

const IconMenuItem = forwardRef<HTMLButtonElement, IconMenuItemProps>(
    ({ leftIcon, rightIcon, label, className = '', disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`flex items-center justify-between w-full px-2 py-2 hover:bg-gray-100 disabled:opacity-50 ${className}`}
                disabled={disabled}
                {...props}
            >
                <div className="flex items-center">
                    {leftIcon && <span className="mr-2">{leftIcon}</span>}
                    <span className="px-2 text-left">{label}</span>
                </div>
                {rightIcon && <span className="ml-2">{rightIcon}</span>}
            </button>
        );
    }
);

IconMenuItem.displayName = 'IconMenuItem';
export { IconMenuItem };