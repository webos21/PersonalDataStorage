import { useMemo, useRef, useState } from 'react';

// project import
import MainCard from '../../../../components/MainCard';
import Transitions from '../../../../components/Transitions';

// assets

const Notification = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const handleToggle = () => setOpen((prev) => !prev);
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };

    return (
        <div className="relative flex-shrink-0 ml-2">
            <button
                onClick={handleToggle}
                ref={anchorRef}
                className="p-2 rounded-full hover:bg-gray-200"
            >
                <div className="relative">
                    <NotificationsOutlined />
                    <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] rounded-full px-1">4</span>
                </div>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50">
                    <MainCard title="Notification" className="p-0">
                        <div className="p-4 border-t">
                            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer">
                                <div className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center">G</div>
                                <div className="flex-grow">
                                    <p className="text-sm">Cristina danny's birthday today.</p>
                                    <span className="text-xs text-gray-500">2 min ago</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer">
                                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">M</div>
                                <div className="flex-grow">
                                    <p className="text-sm">Aida Burg commented your post.</p>
                                    <span className="text-xs text-gray-500">5 August</span>
                                </div>
                            </div>
                            <button onClick={handleToggle} className="w-full p-3 text-center text-blue-600 text-sm">View All</button>
                        </div>
                    </MainCard>
                </div>
            )}
        </div>
    );
};

export default Notification;
