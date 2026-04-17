// types
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
    email: string;
    user: string;
    preferredUsername: string;
    groups: string[];
    createAt: number;
    expireOn: number;
    accessToken: string;
    idToken: string;
    refreshToken: string;
}

export interface AuthState {
    status: string | null;
    error: any;
    logOn: boolean;
    authKey: string | null;
    authVal: string | null;
    userInfo: UserInfo | null;
    hasUserInfo?: boolean;
}

// initial state
const initialState: AuthState = {
    status: null,
    error: null,
    logOn: !!(localStorage.getItem('auth.key') && localStorage.getItem('auth.val')),
    authKey: localStorage.getItem('auth.key'),
    authVal: localStorage.getItem('auth.val'),
    userInfo: localStorage.getItem('auth.userInfo') ? JSON.parse(localStorage.getItem('auth.userInfo')!) : null
};

// ==============================|| SLICE - AUTH ||============================== //

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authReset(state) {
            state.status = null;
            state.error = null;
            state.logOn = !!localStorage.getItem('auth.val');
            state.authKey = localStorage.getItem('auth.key');
            state.authVal = localStorage.getItem('auth.val');
        },

        authRequest(state) {
            state.status = 'LOGIN_REQ';
        },

        authSuccess(state, action: PayloadAction<{ auth: { ckey: string; cval: string } }>) {
            state.status = 'LOGIN_OK';
            state.error = null;
            state.logOn = true;
            state.authKey = action.payload.auth.ckey;
            state.authVal = action.payload.auth.cval;

            console.log('authSuccess', action.payload);

            localStorage.setItem('auth.key', action.payload.auth.ckey);
            localStorage.setItem('auth.val', action.payload.auth.cval);
        },

        authFailure(state, action: PayloadAction<{ error: any }>) {
            state.status = 'LOGIN_ERROR';
            state.error = action.payload.error;
            state.logOn = false;
            state.authKey = null;
            state.authVal = null;

            localStorage.removeItem('auth.key');
            localStorage.removeItem('auth.val');
        },

        authLogout(state) {
            state.status = null;
            state.error = null;
            state.logOn = false;
            state.authKey = null;
            state.authVal = null;

            localStorage.removeItem('auth.key');
            localStorage.removeItem('auth.val');
        },

        setUserInfo(state, action: PayloadAction<{ userInfo: UserInfo }>) {
            console.log('setUserInfo', action.payload.userInfo);

            state.userInfo = action.payload.userInfo;
            localStorage.setItem('auth.userInfo', JSON.stringify(state.userInfo));
        },

        removeUserInfo(state) {
            state.hasUserInfo = false;
            state.userInfo = null;
            localStorage.removeItem('auth.userInfo');
        }
    }
});

export const { authReset, authRequest, authSuccess, authFailure, authLogout, setUserInfo, removeUserInfo } = auth.actions;

export const isLogOn = (state: any) => state.auth.logOn;
export const getAuthStatus = (state: any) => state.auth.status;
export const getAuthError = (state: any) => state.auth.error;
export const getUserInfo = (state: any) => state.auth.userInfo;

export default auth.reducer;
