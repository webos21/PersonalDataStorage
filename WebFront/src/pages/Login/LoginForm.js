import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// material-ui
import LockIcon from '@mui/icons-material/Lock';
import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    Stack,
    Typography
} from '@mui/material';

// project
import Cipher from '../../utils/Cipher';

// redux
import { authFailure, authRequest, authReset, authSuccess, getAuthError, setUserInfo } from '../../store/reducers/auth';

const AuthDebugLog = () => {};
// const AuthDebugLog = console.log;

const TEST_PORT = ':28080';
const REQ_URI = process.env.NODE_ENV !== 'production' ? '//' + window.location.hostname + TEST_PORT + '/pds/v1/auth' : '/pds/v1/auth';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authError = useSelector(getAuthError);

    const validationSchema = Yup.object().shape({
        pbpwd: Yup.string().max(64, '비밀번호는 최대 64자까지 입니다.').required('비밀번호는 필수 입력입니다.')
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: yupResolver(validationSchema),
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    const onSubmit = (data, e) => {
        let pwdValue = e.target.pbpwd.value;
        AuthDebugLog('pwdValue:', pwdValue);

        let base64Result = Cipher.encrypt(pwdValue);

        const formData = new FormData();
        formData.append('pbpwd', base64Result);

        dispatch(authRequest());

        let p1 = fetch(REQ_URI, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
            .then((res) => {
                if (!res.ok) {
                    AuthDebugLog('Result is NOK!!!');
                    let err = {
                        type: 'ServerResponse',
                        message: '서버응답 : ' + res.statusText + '(' + res.status + ')'
                    };
                    dispatch(authFailure({ error: err }));
                    return {};
                }
                AuthDebugLog('Result is OK!!!');
                return res.json();
            })
            .then((resJson) => {
                AuthDebugLog(resJson.result);
                if (resJson.auth && resJson.auth.ckey && resJson.auth.cval) {
                    dispatch(
                        setUserInfo({
                            userInfo: {
                                email: 'test@syszone.kr',
                                user: 'test',
                                preferredUsername: '테스터',
                                groups: ['Tester', 'access-account'],
                                createAt: new Date().getTime(),
                                expireOn: new Date().getTime() + 600000,
                                accessToken: 'INVALID-TEST-TOKEN',
                                idToken: 'INVALID-TEST-TOKEN',
                                refreshToken: 'INVALID-TEST-TOKEN'
                            }
                        })
                    );
                    dispatch(authSuccess(resJson));
                    navigate('/');
                    return resJson;
                }
            })
            .catch((error) => {
                console.warn('Auth Exception', error);
                dispatch(authFailure({ error: error }));
            });

        AuthDebugLog('p1 : ', p1);
    };

    if (!errors.pbpwd && authError && authError.message) {
        setError('pbpwd', { type: 'ServerResponse', message: authError.message });
        dispatch(authReset());
    }

    return (
        <Paper elevation={0} sx={{ padding: 0, width: '100%' }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
                <Typography variant="h1">Login</Typography>
                <Typography>Sign In to your PersonalDataStorage</Typography>
                <FormControl fullWidth>
                    <InputLabel htmlFor="pbpwd" error={Boolean(errors.id)}>
                        비밀번호
                    </InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="pbpwd"
                        type="password"
                        error={Boolean(errors.pbpwd)}
                        {...register('pbpwd', { required: true, maxLength: 64 })}
                        placeholder="비밀번호"
                        startAdornment={
                            <InputAdornment position="start">
                                <LockIcon fontSize="small" />
                            </InputAdornment>
                        }
                    />
                    {errors.pbpwd && (
                        <FormHelperText id="fht-pbpwd" error>
                            {errors.pbpwd?.message}
                        </FormHelperText>
                    )}
                </FormControl>
                <Divider />
                <Button type="submit" variant="contained" color="primary" sx={{ width: '30%' }}>
                    Login
                </Button>
            </Stack>
        </Paper>
    );
};

export default LoginForm;
