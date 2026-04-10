import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Helper from '../../utils';

export interface Card {
    id: number;
    company: string;
    cardName: string;
    // 필요한 다른 필드 추가
}

export interface CardState {
    dataSync: boolean;
    pending: boolean;
    cards: Card[];
    error: string | null;
}

const initialState: CardState = {
    dataSync: false,
    pending: false,
    cards: [],
    error: null,
};

export const cardFetch = createAsyncThunk('card/fetch', async () => {
    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/card' : '/pds/v1/card';
    const response = await fetch(REQ_URI, {
        method: 'GET',
        headers: Helper.auth.makeAuthHeader(),
    });
    if (!response.ok) throw new Error('서버응답 : ' + response.statusText);
    const resJson = await response.json();
    return resJson.data;
});

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        cardClear: (state) => {
            state.cards = [];
            state.dataSync = false;
        },
        cardFetchOk: (state, action: PayloadAction<Card[]>) => {
            state.cards = action.payload;
            state.dataSync = true;
            state.pending = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(cardFetch.pending, (state) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(cardFetch.fulfilled, (state, action) => {
                state.cards = action.payload;
                state.dataSync = true;
                state.pending = false;
            })
            .addCase(cardFetch.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message || 'Failed to fetch';
            });
    }
});

export const { cardClear, cardFetchOk } = cardSlice.actions;
export const getCards = (state: { card: CardState }) => state.card.cards;
export default cardSlice.reducer;