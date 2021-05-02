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

sagaMiddleware.run(rootSaga);
/*
const anyModule = module as any;
if (anyModule.hot) {
  anyModule.hot.accept('./app', () => render(App));
}
DON'T DO THIS. It will result in full page reloads each time you make a change. Instead do something like this:

if ((module as any).hot) {
  (module as any).hot.accept('./app', () => render(App));
}
or this:

declare const module: any;
if (module.hot) {
  module.hot.accept('./app', () => render(App));
}
*/

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
    (module as any).hot.accept(() => {
        const newRootReducer = require('./root-reducer').default;
        store.replaceReducer(newRootReducer);
    });
}

let persistor = persistStore(store);

export { persistor, store };

// TYPES
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
