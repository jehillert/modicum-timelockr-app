import { all, fork, map } from 'redux-saga/effects';
import { handleDeviceUpdate, updateWithOnDiscoveredEventData } from '@noke-sagas';
// import * as nokeSagas from './noke-sagas';
// const combinedSagas = { ...nokeSagas };

// export default function* rootSaga() {
//     yield all(map(fork, combinedSagas));
// }

export default function* rootSaga() {
    yield all([handleDeviceUpdate, updateWithOnDiscoveredEventData]);
}

export * from './noke-sagas';
