import { createAction, createSlice } from '@reduxjs/toolkit';
import { removeColons } from '@utilities';
import { nokeDeviceEvents } from '@constants';

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

export const deviceEventActionCreators = Object.keys(nokeDeviceEvents).reduce((accumulator, eventName) => {
    accumulator[eventName] = createAction(nokeDeviceEvents[eventName]);
    return accumulator;
}, {})

console.log(Object.values(nokeDeviceEvents))

// DEVICE SLICE
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
            state.lockTaskStatus = `${state.activeLockId}/Add: FAILURE`;
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
            state.lockTaskStatus = `${state.activeLockId}/Remove: FAILURE`;
            state.lockTaskError = err;
        },
        discoverAddDevice() {},
    },
    extraReducers: builder => {
        builder.addMatcher(
            // TODO: use the eventName instead of transmitting over the bridge to set properties like isDiscovered
            action => Object.values(nokeDeviceEvents).includes(action.type),
            (state, { payload: data }) => {
                const { locks } = state;
                const { mac = '' } = data;
                const id = removeColons(mac);

                if (Object.keys(locks).includes(id)) {
                    locks[id] = {
                        ...locks[id],
                        ...data,
                    };
                } else {
                    locks[id] = getNewLock(data);
                }
                state.activeLockId = id;
            },
        );
    },
});

export const {
    addDevice,
    addDeviceSuccess,
    addDeviceFailure,
    discoverAddDevice,
    removeDevice,
    removeDeviceSuccess,
    removeDeviceFailure,
    updateDevice,
} = devicesSlice.actions;

export default devicesSlice.reducer;
