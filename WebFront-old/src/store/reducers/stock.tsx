import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Helper from '../../utils';

export interface Stock {
    id: number;
    company: string;
    accountName: string;
}

export interface StockState {
    dataSync: boolean;
    pending: boolean;
    stocks: Stock[];
    error: string | null;
}

const initialState: StockState = {
    dataSync: false,
    pending: false,
    stocks: [],
    error: null,
};

export const stockFetch = createAsyncThunk('stock/fetch', async () => {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/stock' : '/pds/v1/stock';
    const response = await fetch(REQ_URI, {
        method: 'GET',
        headers: Helper.auth.makeAuthHeader(),
    });
    if (!response.ok) throw new Error('서버응답 : ' + response.statusText);
    const resJson = await response.json();
    return resJson.data;
});

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        stockClear: (state) => {
            state.stocks = [];
            state.dataSync = false;
        },
        stockFetchOk: (state, action: PayloadAction<Stock[]>) => {
            state.stocks = action.payload;
            state.dataSync = true;
            state.pending = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(stockFetch.pending, (state) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(stockFetch.fulfilled, (state, action) => {
                state.stocks = action.payload;
                state.dataSync = true;
                state.pending = false;
            })
            .addCase(stockFetch.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message || 'Failed to fetch';
            });
    }
});

export const { stockClear, stockFetchOk } = stockSlice.actions;
export const getStocks = (state: { stock: StockState }) => state.stock.stocks;
export default stockSlice.reducer;