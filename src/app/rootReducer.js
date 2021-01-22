import { combineReducers } from '@reduxjs/toolkit';
import { devicesReducer, serviceReducer, unlockReducer, unshackleReducer } from '@noke-state';

const rootReducer = combineReducers({
    unlock: unlockReducer,
    unshackle: unshackleReducer,
    devices: devicesReducer,
    service: serviceReducer,
});

export default rootReducer;
