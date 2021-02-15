import { combineReducers } from '@reduxjs/toolkit';
import { devicesReducer, serviceReducer, unlockReducer, unshackleReducer } from '@noke-state';

const rootReducer = combineReducers({
    devices: devicesReducer,
    service: serviceReducer,
    unlock: unlockReducer,
    unshackle: unshackleReducer,
});

export default rootReducer;
