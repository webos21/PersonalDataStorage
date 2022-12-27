// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    status: null,
    error: null,
    logOn: localStorage.getItem('aclass.key') && localStorage.getItem('aclass.val') ? true : false,
    aclassKey: localStorage.getItem('aclass.key'),
    aclassVal: localStorage.getItem('aclass.val'),
    userInfo: localStorage.getItem('aclass.userInfo') ? JSON.parse(localStorage.getItem('aclass.userInfo')) : null
};

// ==============================|| SLICE - MENU ||============================== //

const aclass = createSlice({
    name: 'aclass',
    initialState,
    reducers: {
        aclassReset(state) {
            state.status = null;
            state.error = null;
            state.logOn = localStorage.getItem('aclass.val') ? true : false;
            state.aclassKey = localStorage.getItem('aclass.key');
            state.aclassVal = localStorage.getItem('aclass.val');
        },

        aclassRequest(state) {
            state.status = 'LOGIN_REQ';
        },

        aclassSuccess(state, action) {
            state.status = 'LOGIN_OK';
            state.error = null;
            state.logOn = true;
            state.aclassKey = action.payload.aclass.ckey;
            state.aclassVal = action.payload.aclass.cval;

            console.log('aclassSuccess', action.payload);

            localStorage.setItem('aclass.key', action.payload.aclass.ckey);
            localStorage.setItem('aclass.val', action.payload.aclass.cval);
        },

        aclassFailure(state, action) {
            state.status = 'LOGIN_ERROR';
            state.error = action.payload.error;
            state.logOn = false;
            state.aclassKey = null;
            state.aclassVal = null;

            localStorage.removeItem('aclass.key');
            localStorage.removeItem('aclass.val');
        },

        aclassLogout(state) {
            state.status = null;
            state.error = null;
            state.logOn = false;
            state.aclassKey = null;
            state.aclassVal = null;

            localStorage.removeItem('aclass.key');
            localStorage.removeItem('aclass.val');
        },

        setUserInfo(state, action) {
            console.log('setUserInfo', action.payload.userInfo);

            state.userInfo = action.payload.userInfo;
            localStorage.setItem('aclass.userInfo', JSON.stringify(state.userInfo));
        }
    }
});

export const { aclassReset, aclassRequest, aclassSuccess, aclassFailure, aclassLogout, setUserInfo } = aclass.actions;

export const isLogOn = (state) => state.aclass.logOn;
export const getaclassStatus = (state) => state.aclass.status;
export const getaclassError = (state) => state.aclass.error;
export const getUserInfo = (state) => state.aclass.userInfo;

export default aclass.reducer;
