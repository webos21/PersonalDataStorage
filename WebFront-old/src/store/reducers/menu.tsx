// types
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuState {
    openItem: string[];
    openComponent: string;
    drawerOpen: boolean;
    componentDrawerOpen: boolean;
}

// initial state
const initialState: MenuState = {
    openItem: localStorage.getItem('menu.openItem') ? JSON.parse(localStorage.getItem('menu.openItem')!) : ['home'],
    openComponent: 'buttons',
    drawerOpen: localStorage.getItem('menu.drawerOpen') === 'true',
    componentDrawerOpen: localStorage.getItem('menu.componentDrawerOpen') === 'true'
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action: PayloadAction<{ openItem: string[] }>) {
            state.openItem = action.payload.openItem;
            localStorage.setItem('menu.openItem', JSON.stringify(state.openItem));
        },

        activeComponent(state, action: PayloadAction<{ openComponent: string }>) {
            state.openComponent = action.payload.openComponent;
        },

        openDrawer(state, action: PayloadAction<{ drawerOpen: boolean }>) {
            state.drawerOpen = action.payload.drawerOpen;
            localStorage.setItem('menu.drawerOpen', String(state.drawerOpen));
        },

        openComponentDrawer(state, action: PayloadAction<{ componentDrawerOpen: boolean }>) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen;
            localStorage.setItem('menu.componentDrawerOpen', String(state.componentDrawerOpen));
        }
    }
});

export const { activeItem, activeComponent, openDrawer, openComponentDrawer } = menu.actions;

export const isDrawerOpened = (state: any) => state.menu.drawerOpen;

export default menu.reducer;
