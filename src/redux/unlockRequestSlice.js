import { createSlice } from '@reduxjs/toolkit';
import { requestUnlock } from 'noke-api';

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

export const {
    requestUnlockStart,
    requestUnlockSuccess,
    requestUnlockFailure,
} = unlockRequestSlice.actions;

export default unlockRequestSlice.reducer;

export const fetchUnlock = (mac, session, email) => async dispatch => {
    console.log(`%c███████████████████████████████████████████████████████████████████████████████`, 'color: darkred; background-color: gold');
    try {
        dispatch(requestUnlockStart());
        const reqResult = await requestUnlock(mac, session, email);
        dispatch(requestUnlockSuccess(reqResult));
    } catch (err) {
        dispatch(requestUnlockFailure(err));
    }
};
