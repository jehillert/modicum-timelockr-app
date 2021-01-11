import { createSlice } from '@reduxjs/toolkit';
import { requestUnlock } from 'noke-api';

const initialState = {
    dummy: 'empty',
    success: false,
    loading: false,
    error: null,
};

const unlockRequest = createSlice({
    name: 'unlockRequest',
    initialState,
    reducers: {
        requestUnlockStart(state) {
            state.loading = true;
            state.error = null;
        },
        requestUnlockSuccess(state, { payload }) {
            const { razzleDazzle } = payload;
            state.dummy = razzleDazzle;
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
} = unlockRequest.actions;

export default unlockRequest.reducer;

export const fetchUnlock = () => async dispatch => {
    try {
        dispatch(requestUnlockStart());
        const Unlock = await requestUnlock(/* arguments */);
        dispatch(requestUnlockSuccess(/* arguments */));
    } catch (err) {
        dispatch(requestUnlockFailure(err));
    }
};
