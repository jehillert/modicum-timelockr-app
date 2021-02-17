import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestUnshackle } from '@noke-api';
import { NokeAndroid } from '@noke';

export const fetchUnshackle = createAsyncThunk('unshackle/requestStatus', async (payload, thunkAPI) => {
    const { mac } = payload;
    const res = await requestUnshackle(payload);
    const commands = res.data.data.commands;
    await NokeAndroid.sendCommands(mac, commands);
    return commands;
});

const unshackleSlice = createSlice({
    name: 'unshackle',
    initialState: {
        commands: null,
        loading: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchUnshackle.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
                state.currentRequestId = action.meta.requestId;
            }
        },
        [fetchUnshackle.fulfilled]: (state, action) => {
            const { requestId } = action.meta;
            const commands = JSON.parse(action.payload);
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle';
                state.commands = commands;
                state.currentRequestId = undefined;
            }
        },
        [fetchUnshackle.rejected]: (state, action) => {
            const { requestId } = action.meta;
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle';
                state.error = action.error;
                state.currentRequestId = undefined;
            }
        },
    },
});

export default unshackleSlice.reducer;
