import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '@root-reducer';
import rootSaga from '@noke-sagas';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// FLIPPER
const createDebugger = require('redux-flipper').default;

// RUDUX SAGA
const sagaMiddleware = createSagaMiddleware();

//PERSIST (https://github.com/rt2zz/redux-persist/issues/988)
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['devices'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeConfig = {
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware, createDebugger()),
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

let persistor = persistStore(store);

export { persistor, store };
