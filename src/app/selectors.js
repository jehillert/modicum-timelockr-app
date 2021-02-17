export const getActiveLockId = state => state?.devices?.activeLockId;
export const getMac = state => state?.devices?.locks[getActiveLockId(state)]?.mac || '';
export const getServiceConnected = state => state?.service?.serviceConnected || false;
export const getSession = state => state?.devices?.locks[getActiveLockId(state)]?.session || '';
