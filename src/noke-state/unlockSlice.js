import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestUnlock } from '@noke-api';
import { NokeAndroid } from '@noke';

export const fetchUnlock = createAsyncThunk('unlock/requestStatus', async (payload, thunkAPI) => {
    // const { activeLockId, locks } = thunkAPI.getState().devices;
    const res = await requestUnlock(payload);
    // const isSuccess = NokeAndroid.sendCommands(response.data.commands);
    console.log(JSON.stringify(res.data.data.commands, undefined, 2));
    const commands = res.data.data.commands;
    return commands;
});

const unlockSlice = createSlice({
    name: 'unlock',
    initialState: {
        commands: null,
        loading: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchUnlock.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
                state.currentRequestId = action.meta.requestId;
            }
        },
        [fetchUnlock.fulfilled]: (state, action) => {
            const { requestId } = action.meta;
            const commands = JSON.parse(action.payload);
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle';
                state.commands = commands;
                state.currentRequestId = undefined;
            }
        },
        [fetchUnlock.rejected]: (state, action) => {
            const { requestId } = action.meta;
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle';
                state.error = action.error;
                state.currentRequestId = undefined;
            }
        },
    },
});

// export const {  } = unlockSlice.actions;

export default unlockSlice.reducer;
