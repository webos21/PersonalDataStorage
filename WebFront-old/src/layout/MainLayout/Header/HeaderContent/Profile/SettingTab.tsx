import { useState } from 'react';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <ul className="space-y-1">
            <li>
                <button
                    type="button"
                    className={`flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm ${selectedIndex === 0 ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <span className="w-5 text-center text-gray-500">?</span>
                    <span>Support</span>
                </button>
            </li>
            <li>
                <button
                    type="button"
                    className={`flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm ${selectedIndex === 1 ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <span className="w-5 text-center text-gray-500">⚙</span>
                    <span>Account Settings</span>
                </button>
            </li>
            <li>
                <button
                    type="button"
                    className={`flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm ${selectedIndex === 2 ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <span className="w-5 text-center text-gray-500">🔒</span>
                    <span>Privacy Center</span>
                </button>
            </li>
            <li>
                <button
                    type="button"
                    className={`flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm ${selectedIndex === 3 ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <span className="w-5 text-center text-gray-500">✉</span>
                    <span>Feedback</span>
                </button>
            </li>
            <li>
                <button
                    type="button"
                    className={`flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm ${selectedIndex === 4 ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    onClick={(event) => handleListItemClick(event, 4)}
                >
                    <span className="w-5 text-center text-gray-500">☰</span>
                    <span>History</span>
                </button>
            </li>
        </ul>
    );
};

export default SettingTab;
