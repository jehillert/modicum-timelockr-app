import { combineReducers } from '@reduxjs/toolkit';
import unlockRequestReducer from './unlockRequestSlice';
import devicesReducer from './devicesSlice';

const rootReducer = combineReducers({
    unlockRequestReducer,
    devicesReducer,
});

export default rootReducer;
