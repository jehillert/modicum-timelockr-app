// TODO: add isListening action
import { createSlice } from '@reduxjs/toolkit';

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
        // START SERVICE
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
        // STOP SERVICE
        stopService(state) {
            state.serviceStatus = 'disconnecting';
            state.stopStatus = 'loading';
            state.stopError = null;
        },
        stopServiceSuccess(state) {
            state.serviceStatus = 'disconnected';
            state.stopStatus = 'success';
        },
        stopServiceFailure(state, { payload: stopError = {} }) {
            state.stopStatus = 'failure';
            state.stopError = stopError;
        },
        // STOP CHANNELS
        stopServiceChannel() {},
        stopDeviceChannel() {},
        // BLUETOOTH SCANNING
        setIsScanning(state, { payload: isScanning = null }) {
            state.isScanning = isScanning;
        },
        startScanning() {},
        stopScanning() {},
        setScanningError(state, { payload: err }) {
            state.scanningError = err;
        },
        // MISCELLANEOUS
        startEventChannels() {},
    },
});

export const {
    setIsScanning,
    setScanningError,
    startEventChannels,
    startScanning,
    startService,
    startServiceFailure,
    startServiceSuccess,
    stopDeviceChannel,
    stopScanning,
    stopService,
    stopServiceChannel,
    stopServiceFailure,
    stopServiceSuccess,
} = serviceSlice.actions;
export default serviceSlice.reducer;
