import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// project import
import MainCard from '../../../../../components/MainCard';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';

// assets
import avatar1 from '../../../../../assets/images/users/avatar-1.png';

// redux
import { authLogout, getUserInfo, removeUserInfo } from '../../../../../store/reducers/auth';

const Profile = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState(0);
    const userInfo = useSelector(getUserInfo);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(removeUserInfo());
        dispatch(authLogout());
        navigate('/logout');
    };

    return (
        <div className="relative ml-2">
            <button
                className={`p-1 rounded ${open ? 'bg-gray-200' : ''}`}
                onClick={() => setOpen(!open)}
            >
                <img src={avatar1} alt="profile" className="w-10 h-10 rounded-full" />
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-lg z-50">
                    <MainCard className="p-0">
                        <div className="p-4 border-b flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <img src={avatar1} alt="profile" className="w-8 h-8 rounded-full" />
                                <div>
                                    <p className="font-bold">{userInfo.preferredUsername}</p>
                                    <p className="text-xs text-gray-500">{userInfo.groups?.[0]}</p>
                                </div>
                            </div>
                            <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-600">
                                ⇦
                            </button>
                        </div>
                        <div className="flex border-b">
                            <button className={`flex-1 py-3 text-sm ${tab === 0 ? 'border-b-2 border-blue-600 text-blue-600' : ''}`} onClick={() => setTab(0)}>
                                <span className="mr-2">👤</span> Profile
                            </button>
                            <button className={`flex-1 py-3 text-sm ${tab === 1 ? 'border-b-2 border-blue-600 text-blue-600' : ''}`} onClick={() => setTab(1)}>
                                <span className="mr-2">⚙</span> Setting
                            </button>
                        </div>
                        <div className="p-4">
                            {tab === 0 ? <ProfileTab handleLogout={handleLogout} /> : <SettingTab />}
                        </div>
                    </MainCard>
                </div>
            )}
        </div>
    );
};

export default Profile;
