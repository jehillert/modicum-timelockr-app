import { all, call, spawn } from 'redux-saga/effects';
import * as nokeSagas from '@noke-sagas';
import * as nokeEventChannels from '@noke-channel-sagas';

export default function* rootSaga() {
    const nokeSagasArray = Object.keys(nokeSagas)
        .slice(1)
        .map(sagaKey => nokeSagas[sagaKey]);
    const nokeEventChannelsArray = Object.keys(nokeEventChannels).map(
        channelKey => nokeEventChannels[channelKey],
    );

    yield all(
        nokeSagasArray.concat(nokeEventChannelsArray).map(saga =>
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
