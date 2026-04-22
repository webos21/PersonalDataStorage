import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Helper from '../../utils';

export interface RegularPay {
    id: number;
    title: string;
}

export interface RpayState {
    dataSync: boolean;
    pending: boolean;
    rpays: RegularPay[];
    error: string | null;
}

const initialState: RpayState = {
    dataSync: false,
    pending: false,
    rpays: [],
    error: null,
};

export const rpayFetch = createAsyncThunk('rpay/fetch', async () => {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/regularPay' : '/pds/v1/regularPay';
    const response = await fetch(REQ_URI, {
        method: 'GET',
        headers: Helper.auth.makeAuthHeader(),
    });
    if (!response.ok) throw new Error('서버응답 : ' + response.statusText);
    const resJson = await response.json();
    return resJson.data;
});

const rpaySlice = createSlice({
    name: 'rpay',
    initialState,
    reducers: {
        rpayClear: (state) => {
            state.rpays = [];
            state.dataSync = false;
        },
        rpayFetchOk: (state, action: PayloadAction<RegularPay[]>) => {
            state.rpays = action.payload;
            state.dataSync = true;
            state.pending = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(rpayFetch.pending, (state) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(rpayFetch.fulfilled, (state, action) => {
                state.rpays = action.payload;
                state.dataSync = true;
                state.pending = false;
            })
            .addCase(rpayFetch.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message || 'Failed to fetch';
            });
    }
});

export const { rpayClear, rpayFetchOk } = rpaySlice.actions;
export const getRegularPay = (state: { rpay: RpayState }) => state.rpay.rpays;
export default rpaySlice.reducer;