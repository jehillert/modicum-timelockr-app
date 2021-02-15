import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '@root-reducer';
// import mySaga from './sagas'

// FLIPPER (blacklist same as redux-debugger)
// let reduxDebugger = createDebugger({ stateWhitelist: ['user'] });
// const actionsBlacklist = ['EVENTS/', 'LOCAL/setClock'];
// const reduxDebugger = createDebugger({ actionsBlacklist });
const createDebugger = require('redux-flipper').default;

// RUDUX SAGA
const sagaMiddleware = createSagaMiddleware();


const storeConfig = {
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware, createDebugger()),
    devTools: process.env.NODE_ENV !== 'production',
    // preloadedState: ___,
    // enhancers: ___,
};

const store = configureStore(storeConfig);

// sagaMiddleware.run(mySaga)

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(() => {
        const newRootReducer = require('./root-reducer').default;
        store.replaceReducer(newRootReducer);
    });
}

export default store;
