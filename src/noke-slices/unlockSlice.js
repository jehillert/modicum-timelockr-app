import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestUnlock } from '@noke-api';
import { NokeAndroid } from '@noke';

export const fetchUnlock = createAsyncThunk('unlock/requestStatus', async (payload, thunkAPI) => {
    const { mac } = payload;
    const res = await requestUnlock(payload);
    const commands = res.data.data.commands;
    await NokeAndroid.sendCommands(mac, commands);
    return commands;
});

const unlockSlice = createSlice({
    name: 'unlock',
    initialState: {
        commands: null,
        loading: 'idle',
        error: null,
    },
    reducers: {
        unlock() {}
    },
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

export const { unlock } = unlockSlice.actions;

export default unlockSlice.reducer;
