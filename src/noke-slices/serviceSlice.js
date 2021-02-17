import { createSlice } from '@reduxjs/toolkit';
import { NokeAndroid } from '@noke';

const initialState = {
    serviceStatus: 'disconnected',
    startStatus: '',
    stopStatus: '',
    startError: null,
    stopError: null,
    isScanning: null,
    scanningError: null,
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        startService(state) {
            state.serviceStatus = 'connecting';
            state.startStatus = 'loading';
            state.startError = null;
        },
        startServiceSuccess(state) {
            state.serviceStatus = 'connected';
            state.startStatus = 'success';
        },
        startServiceFailure(state, { payload: startError = {} }) {
            state.startStatus = 'failure';
            state.startError = startError;
        },
        stopService(state) {
            state.serviceStatus = 'connecting';
            state.stopStatus = 'loading';
            state.stopError = null;
        },
        stopServiceSuccess(state) {
            state.serviceStatus = 'connected';
            state.stopStatus = 'success';
        },
        stopServiceFailure(state, { payload: stopError = {} }) {
            state.stopStatus = 'failure';
            state.stopError = startError;
        },
        setIsScanning(state, { payload: isScanning }) {
            state.isScanning = isScanning;
        },
        startScanning(state) {
            state.isScanning = true;
        },
        stopScanning(state) {
            state.isScanning = false;
        },
        setScanningError(state, { payload: err }) {
            state.scanningError = err;
        },
    },
});

export const {
    startService,
    startServiceSuccess,
    stopService,
    stopServiceSuccess,
    setIsScanning,
    startScanning,
    stopScanning,
    setScanningError,
} = serviceSlice.actions;
export default serviceSlice.reducer;

export const startScanningThunk = () => async (dispatch, getState) => {
    try {
        const { serviceConnected = null } = getState().service;
        if (serviceConnected) {
            const { isScanning } = await NokeAndroid.startScanning();
            return isScanning && dispatch(startScanning());
        }
    } catch (err) {
        dispatch(setScanningError(err));
    }
};

export const stopScanningThunk = () => async (dispatch, getState) => {
    try {
        const { serviceConnected = null } = getState().service;
        if (serviceConnected) {
            const { isScanning } = await NokeAndroid.stopScanning();
            return !isScanning && dispatch(stopScanning());
        }
    } catch (err) {
        dispatch(setScanningError(err));
    }
};
