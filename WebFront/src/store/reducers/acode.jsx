// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    dataSync: localStorage.getItem('acode.data') ? true : false,
    pending: false,
    acodes: localStorage.getItem('acode.data') ? JSON.parse(localStorage.getItem('acode.data')) : [],
    error: null
};

// ==============================|| SLICE - MENU ||============================== //

const acode = createSlice({
    name: 'acode',
    initialState,
    reducers: {
        acodeClear(state) {
            state.dataSync = false;
            state.pending = false;
            state.acodes = null;
            state.error = null;

            localStorage.removeItem('acode.data');
        },

        acodeRequest(state) {
            state.pending = true;
        },

        acodeSuccess(state, action) {
            state.dataSync = true;
            state.pending = false;
            state.acodes = action.payload.acodes;
            state.error = null;

            localStorage.setItem('acode.data', JSON.stringify(action.payload.acodes));
        },

        acodeFailure(state, action) {
            state.dataSync = false;
            state.pending = false;
            state.acodes = null;
            state.error = action.payload.error;

            localStorage.removeItem('acode.data');
        }
    }
});

export const { acodeClear, acodeRequest, acodeSuccess, acodeFailure } = acode.actions;

export const isDataSync = (state) => state.acode.dataSync;
export const getAcodeStatus = (state) => state.acode.status;
export const getAcodeError = (state) => state.acode.error;
export const getAcodes = (state) => state.acode.acodes;

export default acode.reducer;
