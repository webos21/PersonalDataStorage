import React, { ReactElement, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface ScrollTopProps {
    children?: ReactElement | null;
}

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

const ScrollTop: React.FC<ScrollTopProps> = ({ children }) => {
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathname]);

    return children || null;
};

export default ScrollTop;
