import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// project import
import { aclassClear } from '../../store/reducers/aclass';
import { acodeClear } from '../../store/reducers/acode';
import { authLogout, removeUserInfo } from '../../store/reducers/auth';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(aclassClear());
        dispatch(acodeClear());
        dispatch(removeUserInfo());
        dispatch(authLogout());
        navigate('/');
    }, [dispatch]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-[500px] bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-[300px] flex items-center p-10">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Logout...</h1>
                        <h4 className="text-xl font-semibold mb-2">Remove the login information...</h4>
                        <p className="text-gray-600">The page you are looking for is temporarily unavailable.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logout;
