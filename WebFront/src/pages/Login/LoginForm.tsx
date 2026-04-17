// library
import { useState } from 'react';
import { useNavigate } from 'react-router';

// in-project
import Cipher from '@/shared//utils2/Cipher';
import { useAuthStore } from '@/shared/stores';

// in-package
import api from './api';

const LoginForm = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setLoading(true);

        const formInput = new FormData(e.target);

        let base64Result = Cipher.encrypt(formInput.get('pbpwd'));
        const formData = new FormData();

        formData.append('pbpwd', base64Result);

        try {
            const response = await api.login(formData);
            console.log(response.data);
            const { ckey, cval } = response.data.auth;
            setAuth(ckey, cval);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error?.errorDescription || '로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-600 pb-2">Sign In to your PersonalDataStorage</p>
            <div>
                <label className="block text-sm font-medium mb-1">비밀번호</label>
                <input
                    name="pbpwd"
                    type="password"
                    placeholder="비밀번호"
                    className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
                    required
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            <button type="submit" className="w-[30%] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
