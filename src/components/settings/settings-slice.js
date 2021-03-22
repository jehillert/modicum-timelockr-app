import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        systemColorScheme: null,
        themeModePref: 'system',
    },
    reducers: {
        setThemeModePref(state, { payload: themeModePref = 'system' }) {
            state.themeModePref = themeModePref;
        },
        setSystemColorScheme(state, { payload: currentSystemColorScheme = 'light' }) {
            state.systemColorScheme = currentSystemColorScheme;
        },
    },
});

export const { actions: settingsActions } = settingsSlice;
export const { setThemeModePref, setSystemColorScheme } = settingsSlice.actions;

export default settingsSlice.reducer;
