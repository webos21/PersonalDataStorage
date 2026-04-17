import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Helper from '../../utils';

export interface Bank {
    id: number;
    bankName: string;
    accountName: string;
    // 필요한 다른 필드 추가
}

export interface BankState {
    dataSync: boolean;
    pending: boolean;
    banks: Bank[];
    error: string | null;
}

const initialState: BankState = {
    dataSync: false,
    pending: false,
    banks: [],
    error: null,
};

export const bankFetch = createAsyncThunk('bank/fetch', async () => {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/bank' : '/pds/v1/bank';
    const response = await fetch(REQ_URI, {
        method: 'GET',
        headers: Helper.auth.makeAuthHeader(),
    });
    if (!response.ok) throw new Error('서버응답 : ' + response.statusText);
    const resJson = await response.json();
    return resJson.data;
});

const bankSlice = createSlice({
    name: 'bank',
    initialState,
    reducers: {
        bankClear: (state) => {
            state.banks = [];
            state.dataSync = false;
        },
        bankFetchOk: (state, action: PayloadAction<Bank[]>) => {
            state.banks = action.payload;
            state.dataSync = true;
            state.pending = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(bankFetch.pending, (state) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(bankFetch.fulfilled, (state, action) => {
                state.banks = action.payload;
                state.dataSync = true;
                state.pending = false;
            })
            .addCase(bankFetch.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message || 'Failed to fetch';
            });
    }
});

export const { bankClear, bankFetchOk } = bankSlice.actions;
export const getBanks = (state: { bank: BankState }) => state.bank.banks;
export default bankSlice.reducer;