// import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@root-reducer';

const reduxDebugger = require('redux-flipper').default;
// const persistConfig = { storage: AsyncStorage };

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(reduxDebugger),
    devTools: process.env.NODE_ENV !== 'production',
});

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
        const newRootReducer = require('./rootReducer').default;
        store.replaceReducer(newRootReducer);
    });
}

export default store;
