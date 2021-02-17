import { all, call, spawn } from 'redux-saga/effects';
import {
    serviceSaga,
} from '@noke-sagas';

export default function* rootSaga () {
    const sagas = [
        serviceSaga
    ];

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
