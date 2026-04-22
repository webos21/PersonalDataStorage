import { useEffect, useRef, useState } from 'react';

// project import
import Profile from './Profile';

// assets

// ==============================|| HEADER CONTENT - MOBILE ||============================== //

const MobileSection = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (anchorRef.current && !anchorRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
        <div ref={anchorRef} className="relative ml-1 flex-shrink-0">
            <button
                type="button"
                aria-label="Open profile menu"
                onClick={() => setOpen((prevOpen) => !prevOpen)}
                className={`rounded-full px-2 py-1 text-lg leading-none transition-colors ${
                    open ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
                ⋯
            </button>

            {open && (
                <div className="absolute right-0 top-full z-50 mt-2 w-[320px] max-w-[90vw] rounded-lg bg-white p-3 shadow-lg">
                    <Profile />
                </div>
            )}
        </div>
    );
};

export default MobileSection;
