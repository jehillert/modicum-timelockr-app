import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '@root-reducer';
import rootSaga from '@noke-sagas';

// FLIPPER
const createDebugger = require('redux-flipper').default;

// RUDUX SAGA
const sagaMiddleware = createSagaMiddleware();

const storeConfig = {
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware, createDebugger()),
    devTools: process.env.NODE_ENV !== 'production',
};

const store = configureStore(storeConfig);

sagaMiddleware.run(rootSaga);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(() => {
        const newRootReducer = require('./root-reducer').default;
        store.replaceReducer(newRootReducer);
    });
}

export default store;
