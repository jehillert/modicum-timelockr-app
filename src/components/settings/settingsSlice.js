import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        isDarkMode: false,
        systemColorScheme: null,
    },
    reducers: {
        setIsDarkMode(state, { payload: newIsDarkMode = false }) {
            state.isDarkMode = newIsDarkMode;
        },
        setSystemColorScheme(state, { payload: currentSystemColorScheme = null }) {
            state.systemColorScheme = currentSystemColorScheme;
        },
    },
});

export const { setSystemColorScheme, setIsDarkMode } = settingsSlice.actions;

export default settingsSlice.reducer;
