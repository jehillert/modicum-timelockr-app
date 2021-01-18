import { createSlice } from '@reduxjs/toolkit';
import { NokeAndroid } from '@noke';
import { isValidMac, removeColons } from '@utilities';
import isEqual from 'lodash.isequal';

const initialState = {
    activeLockId: null,
    discovered: {},
    locks: {},
};

// create class for the locks, this is a good place to use oop
// think of just having one set of lockdata,each member having "connected", "discovered", "added" statuses
// also make java getters, to prevent errors.  When a device is added, the full array of added devices should be returned.
const devicesSlice = createSlice({
    name: 'devices',
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
        updateDevices(state, { payload }) {
            const { locks } = state;
            const { id, lockData } = payload;

            if (!isEqual(locks[id], lockData[id])) {
                locks[id] = {
                    ...locks[id],
                    ...lockData,
                };
            }

            state.activeLockId = id;
        },
        setConnectionState(state, { payload }) {
            const { mac } = payload;
            const id = removeColons(mac);
        },
    },
});

export const { addDevice, removeDevice, setConnectionState, updateDeviceState } = devicesSlice.actions;
export default devicesSlice.reducer;

const NO_LOCK_REFERENCE_ERROR = 'Must provide valid mac address or "activeLockId" must reference enumerated lock.';
const NO_MAC_ERROR = 'Argument "lockData" does not contain a valid mac address.';

const resolveDeviceChange = (actionCallback, nokeCallback, selectedMac = '') => async (dispatch, getState) => {
    try {
        const { locks, activeId = '' } = getState()?.devicesReducer;
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
            console.error(`Native call to ${nokeCallback.name} has failed.`);
        }
    }
};

export const addNokeDevice = selectedMac => {
    resolveDeviceChange(addDevice, NokeAndroid.addNokeDevice, selectedMac);
};

export const removeNokeDevice = selectedMac => async (dispatch, getState) => {
    resolveDeviceChange(removeDevice, NokeAndroid.removeNokeDevice, selectedMac);
};

export const updateNokeDevice = lockData => async (dispatch, getState) => {
    try {
        const { mac = '' } = lockData;
        const id = removeColons(mac);

        if (mac) {
            dispatch(updateDeviceState(id, lockData));
        } else {
            throw `Error in call to updateNokeDevice()\n${NO_MAC_ERROR} ${JSON.stringify(lockData, undefined, 2)}`;
        }
    } catch (err) {
        console.error(err);
    }
};

export const setNokeConnectionState = connectionState => dispatch => {
    dispatch(setConnectionState(connectionState));
};
