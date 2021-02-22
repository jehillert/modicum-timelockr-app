// TODO: add isListening action
// TODO: explore BLE "beacon" to avoid having to open app and/or turn on bluetooth
import { createSlice } from '@reduxjs/toolkit';
◆
const initialState = {
    bluetoothStatusCode: '',
    serviceStatus: 'disconnected',
    startStatus: '',
    stopStatus: '',
    startError: null,
    stopError: null,
    isScanning: null,
    scanningError: null,
    serviceError: null,
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
        startServiceFailure(state, { payload: error = {} }) {
            state.startStatus = 'failure';
            state.startError = error;
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
        stopServiceFailure(state, { payload: error = {} }) {
            state.stopStatus = 'failure';
            state.stopError = error;
        },
        // ERRORS
        setServiceError(state, { payload }) {
            state.serviceError = payload;
        },
        // STOP CHANNELS
        stopServiceChannel() {},
        stopDeviceChannel() {},
        // BLUETOOTH
        updateBluetoothStatus(state, { payload }) {
            state.bluetoothStatusCode = payload.bluetoothStatusCode;
        },
        startScanning() {},
        startScanningSuccess(state) {
            state.isScanning = true;
        },
        stopScanning() {},
        stopScanningSuccess(state) {
            state.isScanning = false;
        },
        setScanningError(state, { payload: err }) {
            state.scanningError = err;
        },
        // MISCELLANEOUS
        startEventChannels() {},
    },
});

export const {
    setScanningError,
    startScanningSuccess,
    stopScanningSuccess,
    startEventChannels,
    startScanning,
    startService,
    startServiceFailure,
    startServiceSuccess,
    setServiceError,
    stopDeviceChannel,
    stopScanning,
    stopService,
    stopServiceChannel,
    stopServiceFailure,
    stopServiceSuccess,
    updateBluetoothStatus,
} = serviceSlice.actions;
export default serviceSlice.reducer;
