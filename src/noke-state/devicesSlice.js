import { createSlice } from '@reduxjs/toolkit';
import { NokeAndroid } from '@noke';
import { isValidMac, removeColons } from '@utilities';

const NO_LOCK_REFERENCE_ERROR = 'Must provide valid mac address or "activeLockId" must reference enumerated lock.';

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

const devicesSlice = createSlice({
    name: 'devices',
    initialState: {
        activeLockId: null,
        added: [],
        locks: {},
    },
    reducers: {
        addDevice(state, { payload: id }) {
            const { added } = state;
            if (!added.includes(id)) {
                added.push(id);
                state.activeLockId = id;
            }
        },
        removeDevice(state, { payload: id }) {
            state.added = state.added.filter(val => val !== id);
            state.activeLockId = state.added.length ? state.added[0] : null;
        },
        updateDevice: {
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
        },
    },
});

export const { addDevice, removeDevice, updateDevice } = devicesSlice.actions;
export default devicesSlice.reducer;

export const addNokeDevice = id => async (dispatch, getState) => {
    try {
        const { name, mac } = getState()?.devices?.locks[id];
        if (isValidMac(mac)) {
            const { isAdded } = await NokeAndroid.addNokeDevice({ mac, name });
            if (isAdded) {
                return dispatch(addDevice(id));
            }
        } else {
            throw NO_LOCK_REFERENCE_ERROR;
        }
    } catch (err) {
        console.error(err);
    }
};

export const removeNokeDevice = id => async (dispatch, getState) => {
    try {
        const { mac } = getState()?.devices?.locks[id];
        if (isValidMac(mac)) {
            const isAdded = await NokeAndroid.removeNokeDevice(mac);
            if (isAdded) {
                return dispatch(removeDevice(id));
            }
        } else {
            throw NO_LOCK_REFERENCE_ERROR;
        }
    } catch (err) {
        console.error(err);
    }
};
