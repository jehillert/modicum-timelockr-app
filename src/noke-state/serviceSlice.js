import { createSlice } from '@reduxjs/toolkit';
import { NokeAndroid } from '@noke';

const initialState = {
    serviceConnected: false,
    isScanning: null,
    scanningError: null,
};

const serviceSlice = createSlice({
    name: 'SERVICE',
    initialState,
    reducers: {
        setServiceConnected(state, { payload: serviceConnected }) {
            state.serviceConnected = serviceConnected;
        },
        setIsScanning(state, { payload: isScanning }) {
            state.isScanning = isScanning;
        },
        setScanningError(state, { payload: err }) {
            state.scanningError = err;
        },
    },
});

export const { setServiceConnected, setIsScanning, setScanningError } = serviceSlice.actions;
export default serviceSlice.reducer;

export const startScanning = () => async (dispatch, getState) => {
    try {
        const { serviceConnected = null } = getState().service;
        if (serviceConnected) {
            const { isScanning } = await NokeAndroid.startScanning();
            return dispatch(setIsScanning(isScanning));
        }
    } catch (err) {
        dispatch(setScanningError(err));
    }
};

export const stopScanning = () => async (dispatch, getState) => {
    try {
        const { serviceConnected = null } = getState().service;
        if (serviceConnected) {
            const { isScanning } = await NokeAndroid.stopScanning();
            return dispatch(setIsScanning(isScanning));
        }
    } catch (err) {
        dispatch(setScanningError(err));
    }
};
