import React from 'react';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    component?: React.ElementType;
    sx?: any; // To be replaced by tailwind classes eventually
}

export const Box: React.FC<BoxProps> = ({ component: Component = 'div', sx, children, ...props }) => {
    // Basic mapping of common sx styles to tailwind, as a bridge
    const className = props.className || '';
    return <Component className={`${className}`} {...props}>{children}</Component>;
};
