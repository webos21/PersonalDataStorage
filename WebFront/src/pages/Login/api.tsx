import ApiClient from '@/shared/api/ApiClient';

const LoginApi = {
    login: (formData) =>
        ApiClient.post('/auth', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
};

export default LoginApi;
