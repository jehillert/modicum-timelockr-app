import { createSlice } from '@reduxjs/toolkit';
import { NokeAndroid } from 'noke';
import { removeColons } from 'utilities';

const initialState = {};

const devices = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        addLock(state, { payload: newLockInfo }) {
            const { mac } = newLockInfo;
            const id = removeColons(mac);
            state[id] = newLockInfo;
        },
        removeLock(state, { payload: mac }) {
            const id = removeColons(mac);
            state[id] = null;
        },
        updateLock(state, { payload }) {
            const { mac } = payload;
            const id = removeColons(mac);
            state[id] = {
                ...state[id],
                ...payload,
            };
        },
    },
});

// const reducer:
export const { addLock, removeLock, updateLock } = devices.actions;
export default devices.reducer;

export const addNokeDevice = lockData => async dispatch => {
    try {
        const isSuccess = await NokeAndroid.addNokeDevice(lockData);
        if (isSuccess) {
            dispatch(addLock(lockData));
        } else {
            console.error('Lock was not added');
        }
    } catch (err) {
        console.error(err);
    }
};

export const removeNokeDevice = mac => async dispatch => {
    try {
        const isSuccess = await NokeAndroid.removeNokeDevice(mac);
        if (isSuccess) {
            dispatch(removeLock(mac));
        } else {
            console.error('Lock was not removed');
        }
    } catch (err) {
        console.error(err);
    }
};


export const updateNokeDevice = data => async dispatch => {
    try {
        dispatch(updateLock(data));
    } catch (err) {
        console.error(err);
    }
};
// name:
// mac:
// battery:
// hwVersion:
// status:
// connectionState:
// lockState:
