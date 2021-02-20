// TODO: make a map fo eventName and eventStatusName
// TODO: onDiscovered is false when stop scanning
import { createAction, createSlice } from '@reduxjs/toolkit';
import { getStatusFromEventAction, removeColons } from '@utilities';
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
            state.lockTaskError = null;
        },
        addDeviceSuccess(state) {
            if (!state.lockIds.includes(state.activeLockId)) {
                state.lockIds.push(state.activeLockId);
            }
        },
        addDeviceFailure(state, { payload: err }) {
            state.lockTaskError = err;
        },
        removeDevice(state) {
            state.lockTaskError = null;
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
            (state, { type, payload: data }) => {
                const { locks } = state;
                const { mac = '' } = data;
                const id = removeColons(mac);
                const eventStatusName = getStatusFromEventAction(type);

                if (Object.keys(locks).includes(id)) {
                    locks[id] = {
                        ...locks[id],
                        ...data,
                        [eventStatusName]: true,
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
