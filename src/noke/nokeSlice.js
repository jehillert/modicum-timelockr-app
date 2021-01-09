import { createSlice } from '@reduxjs/toolkit';
import { requestUnlock } from 'api';

const initialState = {
    dummy: 'empty',
    success: false,
    loading: false,
    error: null,
};

const unlock = createSlice({
    name: 'unlock',
    initialState,
    reducers: {
        requestUnlockStart(state) {
            state.loading = true;
            state.error = null;
        },
        requestUnlockSuccess(state, action) {
            const { razzleDazzle } = action.payload;
            state.dummy = razzleDazzle;
            state.loading = false;
            state.error = null;
        },
        requestUnlockFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// const reducer:
export const { requestUnlockStart, requestUnlockSuccess, requestUnlockFailure } = unlock.actions;
export default unlock.reducer;

export const fetchUnlock = () => async dispatch => {
    try {
        dispatch(requestUnlockStart());
        const Unlock = await requestUnlock(/* arguments */);
        dispatch(requestUnlockSuccess(/* arguments */));
    } catch (err) {
        dispatch(requestUnlockFailure(err));
    }
};
