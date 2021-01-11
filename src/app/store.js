import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/rootReducer';

const store = configureStore({
    reducer: rootReducer,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
        const newRootReducer = require('../redux/rootReducer').default;
        store.replaceReducer(newRootReducer);
    });
}

export default store;
