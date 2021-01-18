import { combineReducers } from '@reduxjs/toolkit';
// import devicesReducer from './devicesSlice';
import { devicesReducer, unlockRequestReducer } from '@noke-state';

const rootReducer = combineReducers({
    unlockRequestReducer,
    devicesReducer,
});

export default rootReducer;
