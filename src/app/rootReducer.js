import { combineReducers } from '@reduxjs/toolkit';
import { devicesReducer, unlockRequestReducer } from '@noke-state';

const rootReducer = combineReducers({
    unlockRequest: unlockRequestReducer,
    nokeDevices: devicesReducer,
});

export default rootReducer;
