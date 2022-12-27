// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    dataSync: localStorage.getItem('aclass.data') ? true : false,
    pending: false,
    aclasses: localStorage.getItem('aclass.data') ? JSON.parse(localStorage.getItem('aclass.data')) : [],
    error: null
};

// ==============================|| SLICE - MENU ||============================== //

const aclass = createSlice({
    name: 'aclass',
    initialState,
    reducers: {
        aclassClear(state) {
            state.dataSync = false;
            state.pending = false;
            state.aclasses = null;
            state.error = null;

            localStorage.removeItem('aclass.data');
        },

        aclassRequest(state) {
            state.pending = true;
        },

        aclassSuccess(state, action) {
            state.dataSync = true;
            state.pending = false;
            state.aclasses = action.payload.aclasses;
            state.error = null;

            localStorage.setItem('aclass.data', JSON.stringify(action.payload.aclasses));
        },

        aclassFailure(state, action) {
            state.dataSync = false;
            state.pending = false;
            state.aclasses = null;
            state.error = action.payload.error;

            localStorage.removeItem('aclass.data');
        }
    }
});

export const { aclassClear, aclassRequest, aclassSuccess, aclassFailure } = aclass.actions;

export const isDataSync = (state) => state.aclass.dataSync;
export const getAclassStatus = (state) => state.aclass.status;
export const getAclassError = (state) => state.aclass.error;
export const getAclasses = (state) => state.aclass.aclasses;

export default aclass.reducer;
