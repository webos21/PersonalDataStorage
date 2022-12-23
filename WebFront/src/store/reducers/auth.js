// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    hasUserInfo: localStorage.getItem('auth.userInfo') ? true : false,
    userInfo: localStorage.getItem('auth.userInfo') ? JSON.parse(localStorage.getItem('auth.userInfo')) : null
};

// ==============================|| SLICE - MENU ||============================== //

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.hasUserInfo = true;
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

export const { setUserInfo, removeUserInfo } = auth.actions;

export const isLogin = (state) => state.auth.hasUserInfo;
export const getUserInfo = (state) => state.auth.userInfo;

export default auth.reducer;
