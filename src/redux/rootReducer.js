import { combineReducers } from '@reduxjs/toolkit';
import unlockRequestReducer from 'reducers/unlockRequestSlice';
import devicesReducer from 'reducers/devicesSlice';

const rootReducer = combineReducers({
    unlockRequestReducer,
    devices: devicesReducer,
});

export default rootReducer;
