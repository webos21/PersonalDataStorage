// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    mode: localStorage.getItem('theme.mode') ? localStorage.getItem('theme.mode') : 'light'
};

// ==============================|| SLICE - MENU ||============================== //

const themeReducer = createSlice({
    name: 'themeReducer',
    initialState,
    reducers: {
        setThemeMode(state, action) {
            state.mode = action.payload.mode;
            localStorage.setItem('theme.mode', state.mode);
        }
    }
});

export const { setThemeMode } = themeReducer.actions;

export const themeMode = (state) => {
    return state.themeReducer.mode;
};

export default themeReducer.reducer;
