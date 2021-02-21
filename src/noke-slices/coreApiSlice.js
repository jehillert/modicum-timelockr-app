// TODO: Sets the session of the lock after connecting.  Session is only valid for the duration that the lock is connected
// ADD CANCELLATION
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestUnlock, requestUnshackle } from '@noke-api';
import { NokeAndroid } from '@noke';
import { getSession } from '@selectors';

const fetchLockCommand = (apiActionType, apiCall) =>
    createAsyncThunk(apiActionType, async (payload, { getState }) => {
        const { mac } = payload;
        const session = getSession(getState());
        const res = await apiCall({
            ...payload,
            session,
        });
        const commands = res.data.data.commands;
        await NokeAndroid.sendCommands(mac, commands);
        return commands;
    });

export const fetchUnlock = fetchLockCommand('unlock/requestStatus', requestUnlock)
export const fetchUnshackle = fetchLockCommand('unshackle/requestStatus', requestUnshackle)

const coreApiSlice = createSlice({
    name: 'coreApi',
    initialState: {
        commands: null,
        loading: 'idle',
        error: null,
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                action => [fetchUnlock.pending, fetchUnshackle.pending].includes(action.type),
                (state, action) => {
                    if (state.loading === 'idle') {
                        state.loading = 'pending';
                        state.currentRequestId = action.meta.requestId;
                    }
                },
            )
            .addMatcher(
                action => [fetchUnlock.fulfilled, fetchUnshackle.fulfilled].includes(action.type),
                (state, action) => {
                    const { requestId } = action.meta;
                    const commands = JSON.parse(action.payload);
                    if (state.loading === 'pending' && state.currentRequestId === requestId) {
                        state.loading = 'idle';
                        state.commands = commands;
                        state.currentRequestId = undefined;
                    }
                },
            )
            .addMatcher(
                action => [fetchUnlock.rejected, fetchUnshackle.rejected].includes(action.type),
                (state, action) => {
                    const { requestId } = action.meta;
                    if (state.loading === 'pending' && state.currentRequestId === requestId) {
                        state.loading = 'idle';
                        state.error = action.error;
                        state.currentRequestId = undefined;
                    }
                },
            );
    },
});

export default coreApiSlice.reducer;
