// library
import axios from 'axios';

// in-project
import { useAuthStore } from '@/shared/stores';
import logger from '@/shared/utils/logger';

/**
 * React-Query Client 설정
 * - baseURL: API 서버 주소 (개발/운영 환경에 따라 자동 설정)
 * - timeout: 요청 타임아웃 (5초)
 * - headers: 기본 요청 헤더 (JSON)
 */
const ApiClient = axios.create({
    baseURL: !import.meta.env.PROD ? '//' + window.location.hostname + ':28080/pds/v1' : '/pds/v1',
    timeout: 5000
});

/**
 * Request interceptor: 모든 요청에 인증 헤더 자동 추가
 * - authKey/authVal이 존재하면 헤더에 추가
 * - 요청 실패 시 에러 로깅
 */
ApiClient.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Basic ${btoa('username:password')}`;

        const authKey = useAuthStore.getState().authKey;
        const authVal = useAuthStore.getState().authVal;
        if (authKey && authVal) {
            config.headers[authKey] = authVal;
        }
        return config;
    },
    (error) => {
        logger.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

/**
 * Response interceptor: 401 Unauthorized 응답 처리
 * - 401 응답이면서 로그인 요청이 아닌 경우 자동 로그아웃 처리
 * - 에러 로깅
 */
ApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const originalRequest = error.config;

        logger.error(`API Response Error [${status}]:`, error.message);

        if (status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/auth/login')) {
            logger.warn('Unauthorized access detected. Logging out.');
            useAuthStore.getState().logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default ApiClient;
