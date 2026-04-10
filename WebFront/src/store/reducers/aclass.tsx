// types
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Aclass {
    id: number;
    title: string;
}

export interface AclassState {
    dataSync: boolean;
    pending: boolean;
    aclasses: Aclass[] | null;
    error: any;
}

// initial state
const initialState: AclassState = {
    dataSync: !!localStorage.getItem('aclass.data'),
    pending: false,
    aclasses: localStorage.getItem('aclass.data') ? JSON.parse(localStorage.getItem('aclass.data')!) : [],
    error: null
};

// ==============================|| SLICE - ACLASS ||============================== //

const aclass = createSlice({
    name: 'aclass',
    initialState,
    reducers: {
        aclassClear(state) {
            state.dataSync = false;
            state.pending = false;
            state.aclasses = null;
            state.error = null;

            localStorage.removeItem('aclass.data');
        },

        aclassRequest(state) {
            state.pending = true;
        },

        aclassSuccess(state, action: PayloadAction<{ aclasses: Aclass[] }>) {
            state.dataSync = true;
            state.pending = false;
            state.aclasses = action.payload.aclasses;
            state.error = null;

            localStorage.setItem('aclass.data', JSON.stringify(action.payload.aclasses));
        },

        aclassFailure(state, action: PayloadAction<{ error: any }>) {
            state.dataSync = false;
            state.pending = false;
            state.aclasses = null;
            state.error = action.payload.error;

            localStorage.removeItem('aclass.data');
        }
    }
});

export const { aclassClear, aclassRequest, aclassSuccess, aclassFailure } = aclass.actions;

export const isDataSync = (state: { aclass: AclassState }) => state.aclass.dataSync;
export const getAclassStatus = (state: { aclass: AclassState }) => state.aclass.pending;
export const getAclassError = (state: { aclass: AclassState }) => state.aclass.error;
export const getAclasses = (state: { aclass: AclassState }) => state.aclass.aclasses;

export default aclass.reducer;
