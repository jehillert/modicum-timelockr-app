import { configureStore } from '@reduxjs/toolkit';
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
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

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: [
//         ...getDefaultMiddleware({
//             thunk: false, // or true if you want to use thunks
//         }),
//         createDebugger(),
//         epicMiddleware,
//     ],
// });

// epicMiddleware.run(rootEpic);

const epic$ = new BehaviorSubject(rootEpic);
// Every time a new epic is given to epic$ it
// will unsubscribe from the previous one then
// call and subscribe to the new one because of
// how switchMap works
const hotReloadingEpic = (...args) => epic$.pipe(switchMap(epic => epic(...args)));

epicMiddleware.run(hotReloadingEpic);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(() => {
        const newRootReducer = require('./root-reducer').default;
        const nextRootEpic = require('./root-epic').rootEpic;
        store.dispatch({ type: 'EPIC_END' });
        epic$.next(nextRootEpic);
        store.replaceReducer(newRootReducer);
    });
}
/*
if (module.hot) {
    module.hot.accept('./reduxRoots', () => {
        const nextRootEpic = require('./reduxRoots').rootEpic;
        store.dispatch({ type: 'EPIC_END' });
        epic$.next(nextRootEpic);
    });
}
*/

export default store;
