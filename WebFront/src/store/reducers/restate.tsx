import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Helper from '../../utils';

export interface RealEstate {
    id: number;
    estateType: string;
    title: string;
}

export interface RealEstateState {
    dataSync: boolean;
    pending: boolean;
    restates: RealEstate[];
    error: string | null;
}

const initialState: RealEstateState = {
    dataSync: false,
    pending: false,
    restates: [],
    error: null,
};

export const restateFetch = createAsyncThunk('restate/fetch', async () => {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/realestate' : '/pds/v1/realestate';
    const response = await fetch(REQ_URI, {
        method: 'GET',
        headers: Helper.auth.makeAuthHeader(),
    });
    if (!response.ok) throw new Error('서버응답 : ' + response.statusText);
    const resJson = await response.json();
    return resJson.data;
});

const restateSlice = createSlice({
    name: 'restate',
    initialState,
    reducers: {
        restateClear: (state) => {
            state.restates = [];
            state.dataSync = false;
        },
        restateFetchOk: (state, action: PayloadAction<RealEstate[]>) => {
            state.restates = action.payload;
            state.dataSync = true;
            state.pending = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(restateFetch.pending, (state) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(restateFetch.fulfilled, (state, action) => {
                state.restates = action.payload;
                state.dataSync = true;
                state.pending = false;
            })
            .addCase(restateFetch.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message || 'Failed to fetch';
            });
    }
});

export const { restateClear, restateFetchOk } = restateSlice.actions;
export const getRealEstates = (state: { restate: RealEstateState }) => state.restate.restates;
export default restateSlice.reducer;