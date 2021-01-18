import { createSlice } from '@reduxjs/toolkit';
import { requestUnlock } from '@noke-api';
import { NokeAndroid } from '@noke';

const initialState = {
    unlockCmd: null,
    success: false,
    loading: false,
    error: null,
};

const unlockRequestSlice = createSlice({
    name: 'unlockRequest',
    initialState,
    reducers: {
        requestUnlockStart(state) {
            state.loading = true;
            state.error = null;
        },
        requestUnlockSuccess(state, { payload }) {
            state.unlockCmd = payload;
            state.loading = false;
            state.error = null;
        },
        requestUnlockFailure(state, { payload }) {
            state.loading = false;
            state.error = payload;
        },
    },
});

export const { requestUnlockStart, requestUnlockSuccess, requestUnlockFailure } = unlockRequestSlice.actions;

export default unlockRequestSlice.reducer;

export const fetchUnlock = (requestPayload = null) => async (dispatch, getState) => {
    const { activeLockId, locks } = getState().nokeDevices;
    const { mac, session, email } = requestPayload ? requestPayload : locks[activeLockId];

    try {
        dispatch(requestUnlockStart());
        const { data } = await requestUnlock(mac, session, email);
        const { commands } = data;
        // add isSuccess here and in java, or "status"
        const isSuccess = NokeAndroid.sendCommands(commands);
        dispatch(requestUnlockSuccess(isSuccess));
    } catch (err) {
        dispatch(requestUnlockFailure(err));
    }
};
