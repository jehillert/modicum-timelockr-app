// import { configureStore } from '@reduxjs/toolkit';
// import { createEpicMiddleware } from 'redux-observable';
// import rootReducer from '@root-reducer';
// import rootEpic from '@root-epic';
// const createDebugger = require('redux-flipper').default;
// const epicMiddleware = createEpicMiddleware();

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(createDebugger(), epicMiddleware),
//     devTools: process.env.NODE_ENV !== 'production',
// });

// epicMiddleware.run(rootEpic);

// if (process.env.NODE_ENV === 'development' && module.hot) {
//     module.hot.accept(() => {
//         const newRootReducer = require('./root-reducer').default;
//         store.replaceReducer(newRootReducer);
//     });
// }

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '@root-reducer';
import rootEpic from '@root-epic';
const createDebugger = require('redux-flipper').default;
const epicMiddleware = createEpicMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(createDebugger(), epicMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

const epic$ = new BehaviorSubject(rootEpic);
const hotReloadingEpic = (...args) => epic$.pipe(switchMap(epic => epic(...args)));

epicMiddleware.run(hotReloadingEpic);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./root-epic', () => {
        const newRootReducer = require('./root-reducer').default;
        const nextRootEpic = require('./root-epic').rootEpic;
        store.replaceReducer(newRootReducer);
        epic$.next(nextRootEpic);
    });
}

export default store;
