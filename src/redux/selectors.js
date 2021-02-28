export const getActiveLockId = state => state?.devices?.activeLockId;
export const getActiveMac = state => state?.devices?.locks[getActiveLockId(state)]?.mac || '';
export const getActiveName = state => state?.devices?.locks[getActiveLockId(state)]?.name || '';
export const getServiceStatus = state => state?.service?.serviceStatus || '';
export const getServiceConnected = state => getServiceStatus(state) === 'connected';
export const getSession = state => state?.devices?.locks[getActiveLockId(state)]?.session || '';
