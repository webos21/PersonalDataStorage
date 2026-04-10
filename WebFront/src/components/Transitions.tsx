import { forwardRef, ReactNode } from 'react';

export interface TransitionsProps {
    children?: ReactNode;
    type?: 'grow' | 'fade' | 'collapse' | 'slide' | 'zoom';
    position?: 'top-left' | 'top-right' | 'top' | 'bottom-left' | 'bottom-right' | 'bottom';
}

const Transitions = forwardRef<HTMLDivElement, TransitionsProps>(
    ({ children, type = 'grow', ...others }, ref) => {
        const transitionClass = type === 'fade' 
            ? 'transition-opacity duration-300 opacity-100' 
            : 'transition-transform duration-300 scale-100';

        return (
            <div ref={ref} className={transitionClass} {...others}>
                {children}
            </div>
        );
    }
);

Transitions.displayName = 'Transitions';

export default Transitions;
