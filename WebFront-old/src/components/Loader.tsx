import React from 'react';

// ==============================|| Loader ||============================== //

const Loader: React.FC = () => (
    <div className="fixed top-0 left-0 z-[2001] w-full">
        <div className="w-full bg-gray-200 h-1">
            <div className="bg-blue-600 h-1 animate-pulse" style={{ width: '100%' }}></div>
        </div>
    </div>
);

export default Loader;
