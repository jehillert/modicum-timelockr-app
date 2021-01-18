import { createSlice } from '@reduxjs/toolkit';
import { NokeAndroid } from '@noke';
import { isValidMac, removeColons } from '@utilities';

const initialState = {
    activeLockId: null,
    discovered: {},
    locks: {},
};

const getNewLock = data => ({
    mac: '',
    name: '',
    session: '',
    hwVersion: '',
    isAdded: null,
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
    name: 'nokeDevices',
    initialState,
    reducers: {
        addDevice(state, { payload: id }) {
            state.locks[id].isAdded = true;
            state.activeLockId = id;
        },
        removeDevice(state, { mac = null }) {
            const id = mac ? removeColons(mac) : state.activeLockId;

            state.locks = Object.keys(state.locks).reduce((newLocks, lockId) => {
                if (lockId !== id) {
                    newLocks[lockId] = [lockId];
                }
                return newLocks;
            }, {});
        },
        updateDevice(state, { payload: lockData }) {
            const { locks } = state;
            const { id } = lockData;

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
    },
});

export const { addDevice, removeDevice, updateDevice } = devicesSlice.actions;
export default devicesSlice.reducer;

const NO_LOCK_REFERENCE_ERROR = 'Must provide valid mac address or "activeLockId" must reference enumerated lock.';
const NO_MAC_ERROR = 'Argument "lockData" does not contain a valid mac address.';

const resolveDeviceChange = async (actionCallback, nokeCallback, dispatch, getState, selectedMac = '') => {
    try {
        const { locks, activeId = '' } = getState()?.nokeDevices;
        const mac = selectedMac || locks[activeId].mac || '';
        const isSuccess = await nokeCallback(mac);

        if (isValidMac(mac) && isSuccess) {
            const id = removeColons(mac);
            dispatch(actionCallback(id));
        } else {
            throw { isSuccess, isValidMac: isValidMac(mac) };
        }
    } catch ({ isSuccess, mac }) {
        console.log(`Error in call to resolveDeviceChange().`);
        if (!isValidMac(mac)) {
            console.error(NO_LOCK_REFERENCE_ERROR);
        }
        if (!isSuccess) {
            console.error(`Native call to addDevice/removeDevice has failed.`);
        }
    }
};

export const addNokeDevice = selectedMac => async (dispatch, getState) => {
    resolveDeviceChange(addDevice, NokeAndroid.addNokeDevice, dispatch, getState, selectedMac);
};

export const removeNokeDevice = selectedMac => async (dispatch, getState) => {
    resolveDeviceChange(removeDevice, NokeAndroid.removeNokeDevice, selectedMac);
};

export const updateDeviceState = lockData => async (dispatch, getState) => {
    try {
        const { mac = '' } = lockData;
        const id = removeColons(mac);
        console.log(JSON.stringify(lockData, undefined, 2));
        if (mac) {
            dispatch(updateDevice({ id, ...lockData }));
        } else {
            throw `Error in call to updateDeviceState()\n${NO_MAC_ERROR} ${JSON.stringify(lockData, undefined, 2)}`;
        }
    } catch (err) {
        console.error(err);
    }
};
