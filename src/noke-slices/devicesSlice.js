// TODO: make a map fo eventName and eventStatusName
// TODO: onDiscovered is false when stop scanning
// TODO: fixing error handling:
//       > try using matchers from redux toolkit; (for instance, cannot connect to device unless one is active)
//       > removing errors from sagas;
//       > having standard message that tells user to check error that came in with onError event
//       > test that your errors actually work
//       > as far as state is concerned, consider having lockError, serviceError, and that is it.  maybe concat.
//         > onError maybe event can have it's own channel and set the appropriate errors.
// TODO: figure out what you want to do with isDiscovered when scanning stops. propably move state change to startScanningSuccess and stopScanningSuccess and remove setIsScanning
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

export const deviceEventActions = Object.keys(nokeDeviceEvents).reduce((accumulator, eventName) => {
    accumulator[eventName] = createAction(nokeDeviceEvents[eventName]);
    return accumulator;
}, {});

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
        connectDevice(state) {
            state.lockTaskError = null;
        },
        connectDeviceSuccess() {},
        connectDeviceFailure(state, { payload: err }) {
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
    },
    extraReducers: builder => {
        builder.addMatcher(
            action => Object.values(nokeDeviceEvents).includes(action.type),
            (state, { type, payload: data }) => {
                const { locks } = state;
                const { mac = '' } = data;
                const id = removeColons(mac);

                const eventStatusName = getStatusFromEventAction(type);
                let eventStatus = {
                    [eventStatusName]: true,
                };

                if (eventStatusName === 'isDisconnected') {
                    eventStatus = { isConnected: false };
                }

                if (Object.keys(locks).includes(id)) {
                    locks[id] = {
                        ...locks[id],
                        ...data,
                        ...eventStatus,
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
    connectDevice,
    connectDeviceSuccess,
    connectDeviceFailure,
    removeDevice,
    removeDeviceSuccess,
    removeDeviceFailure,
    updateDevice,
} = devicesSlice.actions;

export default devicesSlice.reducer;
