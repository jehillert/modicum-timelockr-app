import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'redux/root-reducer';
import { nokeRootSaga } from '@noke';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// FLIPPER
const createDebugger = require('redux-flipper').default;

// RUDUX SAGA
const sagaMiddleware = createSagaMiddleware();

//PERSIST
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['devices', 'settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeConfig = {
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware, createDebugger()),
    devTools: process.env.NODE_ENV !== 'production',
};

const store = configureStore(storeConfig);

sagaMiddleware.run(nokeRootSaga);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(() => {
        const newRootReducer = require('./root-reducer').default;
        store.replaceReducer(newRootReducer);
    });
}

let persistor = persistStore(store);

export { persistor, store };
