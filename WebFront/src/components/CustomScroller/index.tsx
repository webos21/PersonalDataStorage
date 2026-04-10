import { forwardRef, ReactNode, HTMLAttributes } from 'react';

import useCustomScroller from './useCustomScroller.jsx';

import styles from './index.module.css';

interface CustomScrollerProps extends HTMLAttributes<HTMLDivElement> {
    scrollDisabled?: boolean;
    className?: string;
    innerClassName?: string;
    children: ReactNode;
}

const cx = (...args: any[]) => args.filter(Boolean).join(' ');

const CustomScroller = forwardRef<HTMLDivElement, CustomScrollerProps>(
    ({ scrollDisabled, className, innerClassName, children, ...props }, ref) => {
        const [wrapperProps, scrollerProps, trackProps] = useCustomScroller(children, ref, { disabled: scrollDisabled });

        return (
            <div className={cx(className, styles.main)} {...props}>
                <div className={styles.wrapper} {...wrapperProps}>
                    <div className={cx(innerClassName, styles.inner)} {...scrollerProps}>
                        {children}
                    </div>
                </div>
                <div className={styles.track} {...trackProps} />
            </div>
        );
    }
);

CustomScroller.displayName = 'CustomScroller';

CustomScroller.displayName = 'CustomScroller';

export default CustomScroller;
