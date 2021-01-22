import { combineReducers } from '@reduxjs/toolkit';
import { devicesReducer, serviceReducer, unlockReducer } from '@noke-state';

const rootReducer = combineReducers({
    unlock: unlockReducer,
    devices: devicesReducer,
    service: serviceReducer,
});

export default rootReducer;
