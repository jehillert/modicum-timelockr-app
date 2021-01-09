import { combineReducers } from '@reduxjs/toolkit';
import nokeReducer from './noke/nokeSlice';

const rootReducer = combineReducers({
    unlock: nokeReducer,
});

export default rootReducer;
