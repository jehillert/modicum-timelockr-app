import { combineReducers } from '@reduxjs/toolkit';
import { devicesReducer, serviceReducer, coreApiReducer } from '@noke-slices';

const rootReducer = combineReducers({
    devices: devicesReducer,
    service: serviceReducer,
    coreApi: coreApiReducer,
});

export default rootReducer;
