import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// project
import Cipher from '../../utils/Cipher';

// redux
import { authFailure, authRequest, authReset, authSuccess, getAuthError, setUserInfo } from '../../store/reducers/auth';

const REQ_URI = process.env.NODE_ENV !== 'production' ? '//' + window.location.hostname + ':28080/pds/v1/auth' : '/pds/v1/auth';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authError = useSelector(getAuthError);

    const validationSchema = Yup.object().shape({
        pbpwd: Yup.string().max(64, '비밀번호는 최대 64자까지 입니다.').required('비밀번호는 필수 입력입니다.')
    });

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data, e) => {
        let base64Result = Cipher.encrypt(data.pbpwd);
        const formData = new FormData();
        formData.append('pbpwd', base64Result);

        dispatch(authRequest());

        fetch(REQ_URI, { method: 'POST', body: formData, credentials: 'include' })
            .then(res => {
                if (!res.ok) {
                    dispatch(authFailure({ error: { message: '서버응답 : ' + res.statusText } }));
                    return {};
                }
                return res.json();
            })
            .then(resJson => {
                if (resJson.auth?.ckey && resJson.auth?.cval) {
                    dispatch(setUserInfo({ userInfo: { preferredUsername: '테스터' } }));
                    dispatch(authSuccess(resJson));
                    navigate('/');
                }
            })
            .catch(error => dispatch(authFailure({ error })));
    };

    if (!errors.pbpwd && authError?.message) {
        setError('pbpwd', { message: authError.message });
        dispatch(authReset());
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-600 pb-2">Sign In to your PersonalDataStorage</p>
            <div>
                <label className="block text-sm font-medium mb-1">비밀번호</label>
                <input 
                    type="password" 
                    {...register('pbpwd')} 
                    placeholder="비밀번호" 
                    className={`w-full p-2 border rounded ${errors.pbpwd ? 'border-red-500' : 'border-gray-300'}`} 
                />
                {errors.pbpwd && <p className="text-red-500 text-xs mt-1">{errors.pbpwd.message}</p>}
            </div>
            <button type="submit" className="w-[30%] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
        </form>
    );
};

export default LoginForm;
