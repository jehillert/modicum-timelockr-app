import { all, call, spawn } from 'redux-saga/effects';
import * as nokeSagas from '@noke-sagas';

export default function* rootSaga () {
    const sagas = Object.keys(nokeSagas).slice(1).map(nokeSagaKey => nokeSagas[nokeSagaKey]);
    console.log(Object.keys(nokeSagas));

    yield all(
        sagas.map(saga =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga);
                        break;
                    } catch (e) {
                        console.log(e);
                    }
                }
            }),
        ),
    );
}

export * from './noke-sagas';
