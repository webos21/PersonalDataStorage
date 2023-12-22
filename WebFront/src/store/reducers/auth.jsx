// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    status: null,
    error: null,
    logOn: localStorage.getItem('auth.key') && localStorage.getItem('auth.val') ? true : false,
    authKey: localStorage.getItem('auth.key'),
    authVal: localStorage.getItem('auth.val'),
    userInfo: localStorage.getItem('auth.userInfo') ? JSON.parse(localStorage.getItem('auth.userInfo')) : null
};

// ==============================|| SLICE - MENU ||============================== //

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authReset(state) {
            state.status = null;
            state.error = null;
            state.logOn = localStorage.getItem('auth.val') ? true : false;
            state.authKey = localStorage.getItem('auth.key');
            state.authVal = localStorage.getItem('auth.val');
        },

        authRequest(state) {
            state.status = 'LOGIN_REQ';
        },

        authSuccess(state, action) {
            state.status = 'LOGIN_OK';
            state.error = null;
            state.logOn = true;
            state.authKey = action.payload.auth.ckey;
            state.authVal = action.payload.auth.cval;

            console.log('authSuccess', action.payload);

            localStorage.setItem('auth.key', action.payload.auth.ckey);
            localStorage.setItem('auth.val', action.payload.auth.cval);
        },

        authFailure(state, action) {
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

        setUserInfo(state, action) {
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

export const isLogOn = (state) => state.auth.logOn;
export const getAuthStatus = (state) => state.auth.status;
export const getAuthError = (state) => state.auth.error;
export const getUserInfo = (state) => state.auth.userInfo;

export default auth.reducer;
