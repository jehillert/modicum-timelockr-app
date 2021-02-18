// TODO: add isListening action
import { createSlice } from '@reduxjs/toolkit';
import { removeColons } from '@utilities';

const getNewLock = data => ({
    mac: '',
    name: '',
    session: '',
    hwVersion: '',
    battery: null,
    isLocked: null,
    isShutdown: null,
    isSyncing: false,
    didTimeout: false,
    isConnected: false,
    isConnecting: false,
    isDiscovered: false,
    connectionStatusCode: null,
    ...data,
});

const setDeviceData = {
    reducer: (state, { payload }) => {
        const { locks } = state;
        const { id, lockData } = payload;
        if (Object.keys(locks).includes(id)) {
            locks[id] = {
                ...locks[id],
                ...lockData,
            };
        } else {
            locks[id] = getNewLock(lockData);
        }
        state.activeLockId = id;
    },
    prepare: lockData => {
        const { mac = '' } = lockData;
        const id = removeColons(mac);
        return { payload: { id, lockData } };
    },
};

const devicesSlice = createSlice({
    name: 'devices',
    initialState: {
        activeLockId: null,
        lockTaskStatus: '',
        lockTaskError: null,
        lockIds: [],
        locks: {},
    },
    reducers: {
        addDevice(state) {
            state.lockTaskStatus = `${state.activeLockId}/Add: EXECUTING`;
            state.lockTaskError = null;
        },
        addDeviceSuccess(state) {
            if (!state.lockIds.includes(state.activeLockId)) {
                state.lockIds.push(state.activeLockId);
            }
            state.lockTaskStatus = `${state.activeLockId}/Add: SUCCESS`;
        },
        addDeviceFailure(state, { payload: err }) {
            state.lockTaskStatus = `${state.activeLockId}/Add: FAILURE`
            state.lockTaskError = err;
        },
        removeDevice(state) {
            state.lockTaskStatus = `${state.activeLockId}/Remove: EXECUTING`;
        },
        removeDeviceSuccess(state) {
            state.lockIds = state.lockIds.filter(val => val !== state.activeLockId);
            state.lockTaskStatus = `${state.activeLockId}/Remove: SUCCESS`;
            state.activeLockId = state.lockIds.length ? state.lockIds[0] : null;
        },
        removeDeviceFailure(state, { payload: err }) {
            state.lockTaskStatus = `${state.activeLockId}/Remove: FAILURE`
            state.lockTaskError = err;
        },
        discoverDevice: setDeviceData,
        updateDevice: setDeviceData,
    },
});

export const {
    addDevice,
    addDeviceSuccess,
    addDeviceFailure,
    discoverDevice,
    removeDevice,
    removeDeviceSuccess,
    removeDeviceFailure,
    updateDevice,
} = devicesSlice.actions;

export default devicesSlice.reducer;
