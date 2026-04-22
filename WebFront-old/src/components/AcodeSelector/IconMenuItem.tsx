import { forwardRef, ReactNode } from 'react';

interface IconMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export const IconMenuItem = forwardRef<HTMLButtonElement, IconMenuItemProps>(
    function IconMenuItem(
        { label, leftIcon, rightIcon, children, className = '', ...restProps }, 
        ref
    ) {
        return (
            <button 
                ref={ref} 
                className={`flex w-full items-center justify-between px-1 py-2 text-left transition-colors hover:bg-gray-100 disabled:opacity-50 ${className}`}
                {...restProps}
            >
                <div className="flex items-center">
                    {leftIcon && <span className="mr-2">{leftIcon}</span>}
                    {label && <span className="px-2 text-left">{label}</span>}
                </div>
                {rightIcon && <span className="ml-2">{rightIcon}</span>}
                {children}
            </button>
        );
    }
);
