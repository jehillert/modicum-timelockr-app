export const getActiveLockId = state => state?.devices?.activeLockId;
export const getMac = state => state?.devices?.locks[getActiveLockId(state)]?.mac || '';
export const getServiceStatus = state => {
    console.log(`%cstate%c: %c${JSON.stringify(state, undefined, 2)}%c;`, 'color: orange; text-decoration: underline;', 'color: hotpink', 'color: white', 'color: hotpink');
    console.log(`%cstate.service: ${JSON.stringify(state.service, undefined, 2)};`, 'color: darkred; background-color: gold');
    return state?.service?.serviceStatus || 'disconnected';
}
// export const getServiceStatus = state => state?.service?.serviceStatus || 'disconnected';
// export const getServiceStatus = state => state?.serviceStatus || 'disconnected';
export const getServiceConnected = state => getServiceStatus(state) === 'connected';
export const getSession = state => state?.devices?.locks[getActiveLockId(state)]?.session || '';
