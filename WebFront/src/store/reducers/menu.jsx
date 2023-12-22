// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    openItem: localStorage.getItem('menu.openItem') ? JSON.parse(localStorage.getItem('menu.openItem')) : ['home'],
    openComponent: 'buttons',
    drawerOpen: localStorage.getItem('menu.drawerOpen') === 'true',
    componentDrawerOpen: localStorage.getItem('menu.componentDrawerOpen') === 'true'
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.openItem = action.payload.openItem;
            localStorage.setItem('menu.openItem', JSON.stringify(state.openItem));
        },

        activeComponent(state, action) {
            state.openComponent = action.payload.openComponent;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen;
            localStorage.setItem('menu.drawerOpen', state.drawerOpen);
        },

        openComponentDrawer(state, action) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen;
            localStorage.setItem('menu.componentDrawerOpen', state.componentDrawerOpen);
        }
    }
});

export const { activeItem, activeComponent, openDrawer, openComponentDrawer } = menu.actions;

export const isDrawerOpened = (state) => state.menu.drawerOpen;

export default menu.reducer;
