import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NokeAndroid } from 'noke';
import { removeColons } from 'utilities';

const initialState = {
    activeLockId: null,
    discovered: {},
    locks: {},
};

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        addLock(state, { payload: lockData }) {
            const { mac } = lockData;
            const id = removeColons(mac);
            state.locks[id] = { ...lockData };
            state.activeLockId = id;
        },
        removeLock(state, { mac = null }) {
            const id = mac ? removeColons(mac) : state.activeLockId;
            state.locks[id] = null;
        },
        setDiscovered(state, { payload }) {
            const discovered = { ...payload };
            state.discovered = discovered;
        },
        updateLock(state, { payload }) {
            const { mac } = payload;
            const id = removeColons(mac);
            state.locks[id] = {
                ...state.locks[id],
                ...payload,
            };
            state.activeLockId = id;
        },
    },
});

export const { addLock, removeLock, setDiscovered, updateLock } = devicesSlice.actions;
export default devicesSlice.reducer;

export const addNokeDevice = (givenLockData = null) => async (dispatch, getState) => {
    try {
        const { discovered } = getState()?.devicesReducer;
        const lockData = givenLockData ? givenLockData : discovered;
        if (!lockData) {
            throw 'There is no lock data to add';
        }

        const isSuccess = await NokeAndroid.addNokeDevice(lockData);
        if (isSuccess) {
            dispatch(addLock(lockData));
        } else {
            throw 'Native call to NokeAndroid.addNokeDevice() failed.';
        }
    } catch (err) {
        console.error(err);
    }
};

export const removeNokeDevice = (mac = null) => async (dispatch, getState) => {
    try {
        const m = mac || getState()?.devicesReducer?.discovered;
        const isSuccess = await NokeAndroid.removeNokeDevice(m);
        if (isSuccess) {
            dispatch(removeLock(m));
        } else {
            console.error('Lock was not removed');
        }
    } catch (err) {
        console.error(err);
    }
};

export const setDiscoveredDevice = data => dispatch => {
    dispatch(setDiscovered(data));
};

export const updateNokeDevice = data => async dispatch => {
    try {
        dispatch(updateLock(data));
    } catch (err) {
        console.error(err);
    }
};
