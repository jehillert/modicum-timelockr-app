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
            state.stopError = stopError;
        },
        setIsScanning(state, { payload: isScanning = null }) {
            state.isScanning = isScanning;
        },
        startScanning(state) {},
        stopScanning(state) {},
        setScanningError(state, { payload: err }) {
            state.scanningError = err;
        },
    },
});

export const {
    startService,
    startServiceSuccess,
    startServiceFailure,
    stopService,
    stopServiceSuccess,
    stopServiceFailure,
    setIsScanning,
    startScanning,
    stopScanning,
    setScanningError,
} = serviceSlice.actions;
export default serviceSlice.reducer;
