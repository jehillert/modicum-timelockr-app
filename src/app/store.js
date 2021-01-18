import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const createDebugger = require('redux-flipper').default;

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(createDebugger()),
    devTools: process.env.NODE_ENV !== 'production',
});

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(() => {
        const newRootReducer = require('./rootReducer').default;
        store.replaceReducer(newRootReducer);
    });
}

export default store;
