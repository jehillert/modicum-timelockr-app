// TODO: Determine if you really need defaults in this file given initial state set elsewhere.
export const getAppState = state => state?.system.appState || 'background';
export const getFocusState = state => state?.system.focusState || 'blur';
export const getHasNetAccess = state => state?.system.hasNetAccess;
export const getMemoryUse = state => state?.system.memoryUse || 'unavailable';
export const getActiveLockId = state => state?.devices?.activeLockId;
export const getActiveMac = state => state?.devices?.locks[getActiveLockId(state)]?.mac || '';
export const getActiveName = state => state?.devices?.locks[getActiveLockId(state)]?.name || '';
export const getServiceStatus = state => state?.service?.serviceStatus || '';
export const getServiceConnected = state => getServiceStatus(state) === 'connected';
export const getSession = state => state?.devices?.locks[getActiveLockId(state)]?.session || '';
export const getSystemColorScheme = state => state?.settings?.systemColorScheme || null;
export const getThemeModePref = state => state?.settings?.themeModePref || 'system';
export const getThemeMode = state => {
    const { systemColorScheme = 'light', themeModePref = 'system' } = state?.settings;
    return themeModePref === 'system' ? systemColorScheme : themeModePref;
};
