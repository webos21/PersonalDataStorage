import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Helper from '../../utils';

export interface Insurance {
    id: number;
    company: string;
    product: string;
}

export interface InsuranceState {
    dataSync: boolean;
    pending: boolean;
    insures: Insurance[];
    error: string | null;
}

const initialState: InsuranceState = {
    dataSync: false,
    pending: false,
    insures: [],
    error: null,
};

export const insureFetch = createAsyncThunk('insure/fetch', async () => {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/insurance' : '/pds/v1/insurance';
    const response = await fetch(REQ_URI, {
        method: 'GET',
        headers: Helper.auth.makeAuthHeader(),
    });
    if (!response.ok) throw new Error('서버응답 : ' + response.statusText);
    const resJson = await response.json();
    return resJson.data;
});

const insureSlice = createSlice({
    name: 'insure',
    initialState,
    reducers: {
        insureClear: (state) => {
            state.insures = [];
            state.dataSync = false;
        },
        insureFetchOk: (state, action: PayloadAction<Insurance[]>) => {
            state.insures = action.payload;
            state.dataSync = true;
            state.pending = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(insureFetch.pending, (state) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(insureFetch.fulfilled, (state, action) => {
                state.insures = action.payload;
                state.dataSync = true;
                state.pending = false;
            })
            .addCase(insureFetch.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message || 'Failed to fetch';
            });
    }
});

export const { insureClear, insureFetchOk } = insureSlice.actions;
export const getInsurances = (state: { insure: InsuranceState }) => state.insure.insures;
export default insureSlice.reducer;