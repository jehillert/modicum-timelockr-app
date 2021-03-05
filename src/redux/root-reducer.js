import { combineReducers } from '@reduxjs/toolkit';
import { settingsReducer } from '@slices';
import { coreApiReducer, devicesReducer, serviceReducer } from '@noke';

const rootReducer = combineReducers({
    coreApi: coreApiReducer,
    devices: devicesReducer,
    service: serviceReducer,
    settings: settingsReducer,
});

export default rootReducer;
