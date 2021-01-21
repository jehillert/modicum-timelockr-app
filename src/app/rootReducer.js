import { combineReducers } from '@reduxjs/toolkit';
import { devicesReducer, unlockReducer } from '@noke-state';

const rootReducer = combineReducers({
    unlock: unlockReducer,
    devices: devicesReducer,
});

export default rootReducer;
