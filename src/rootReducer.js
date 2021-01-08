import { combineReducers } from '@reduxjs/toolkit';
import nokeReducer from './services/noke-service/nokeSlice';

const rootReducer = combineReducers({
    unlock: nokeReducer,
});

export default rootReducer;
