import { combineReducers } from '@reduxjs/toolkit';
import { coreApiReducer, devicesReducer, serviceReducer } from '@noke-slices';
import { settingsReducer } from '@settings';
import { systemReducer } from '@system';

const rootReducer = combineReducers({
    system: systemReducer,
    coreApi: coreApiReducer,
    devices: devicesReducer,
    service: serviceReducer,
    settings: settingsReducer,
});

export default rootReducer;
