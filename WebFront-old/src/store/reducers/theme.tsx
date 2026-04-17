// types
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
    mode: string;
}

// initial state
const initialState: ThemeState = {
    mode: localStorage.getItem('theme.mode') ? localStorage.getItem('theme.mode')! : 'light'
};

// ==============================|| SLICE - THEME ||============================== //

const themeReducer = createSlice({
    name: 'themeReducer',
    initialState,
    reducers: {
        setThemeMode(state, action: PayloadAction<{ mode: string }>) {
            state.mode = action.payload.mode;
            localStorage.setItem('theme.mode', state.mode);
        }
    }
});

export const { setThemeMode } = themeReducer.actions;

export const themeMode = (state: any) => {
    return state.themeReducer.mode;
};

export default themeReducer.reducer;
