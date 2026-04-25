// library
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { FormEvent } from 'react';

// in-project
import Cipher from '@/shared//utils/Cipher';
import { useAccountCatalogStore, useAuthStore } from '@/shared/stores';

// in-package
import api from './api';

const LoginForm = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setAuth } = useAuthStore();
    const syncAccountCatalog = useAccountCatalogStore((s) => s.syncCatalog);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError('');
        setLoading(true);

        const formInput = new FormData(e.currentTarget);

        let base64Result = Cipher.encrypt(formInput.get('pbpwd'));
        const formData = new FormData();

        formData.append('pbpwd', base64Result);

        try {
            const response = await api.login(formData);
            console.log(response.data);
            const { ckey, cval } = response.data.auth;
            setAuth(ckey, cval);
            await syncAccountCatalog(true);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error?.errorDescription || '로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Login</h1>
            <p className="pb-1 text-sm text-zinc-600 sm:text-base">Sign In to your PersonalDataStorage</p>
            <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700">비밀번호</label>
                <input
                    name="pbpwd"
                    type="password"
                    placeholder="비밀번호"
                    autoComplete="current-password"
                    className={`h-11 w-full rounded-lg border px-3 text-base outline-none transition focus:ring-2 focus:ring-blue-500/30 ${
                        error ? 'border-red-500' : 'border-zinc-300'
                    }`}
                    required
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            <button
                type="submit"
                disabled={loading}
                className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[140px]"
            >
                {loading ? '로그인 중...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;
