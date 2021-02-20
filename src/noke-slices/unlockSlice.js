// ADD CANCELLATION
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestUnlock } from '@noke-api';
import { NokeAndroid } from '@noke';
import { getSession } from '@selectors';

export const fetchUnlock = createAsyncThunk('unlock/requestStatus', async (payload, { getState }) => {
    const { mac } = payload;
    const session = getSession(getState());
    const res = await requestUnlock({
        ...payload,
        session,
    });
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

export default unlockSlice.reducer;
