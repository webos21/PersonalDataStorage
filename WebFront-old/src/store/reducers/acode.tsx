// types
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Acode {
    id: number;
    title: string;
}

export interface AcodeState {
    dataSync: boolean;
    pending: boolean;
    acodes: Acode[] | null;
    error: any;
}

// initial state
const initialState: AcodeState = {
    dataSync: !!localStorage.getItem('acode.data'),
    pending: false,
    acodes: localStorage.getItem('acode.data') ? JSON.parse(localStorage.getItem('acode.data')!) : [],
    error: null
};

// ==============================|| SLICE - ACODE ||============================== //

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

        acodeSuccess(state, action: PayloadAction<{ acodes: Acode[] }>) {
            state.dataSync = true;
            state.pending = false;
            state.acodes = action.payload.acodes;
            state.error = null;

            localStorage.setItem('acode.data', JSON.stringify(action.payload.acodes));
        },

        acodeFailure(state, action: PayloadAction<{ error: any }>) {
            state.dataSync = false;
            state.pending = false;
            state.acodes = null;
            state.error = action.payload.error;

            localStorage.removeItem('acode.data');
        }
    }
});

export const { acodeClear, acodeRequest, acodeSuccess, acodeFailure } = acode.actions;

export const isDataSync = (state: { acode: AcodeState }) => state.acode.dataSync;
export const getAcodeStatus = (state: { acode: AcodeState }) => state.acode.pending;
export const getAcodeError = (state: { acode: AcodeState }) => state.acode.error;
export const getAcodes = (state: { acode: AcodeState }) => state.acode.acodes;

export default acode.reducer;
