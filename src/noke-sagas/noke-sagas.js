import { NativeEventEmitter } from 'react-native';
import { eventChannel, END } from 'redux-saga';
import { NokeAndroid } from '@noke';
import { take, put, call, fork, cancel, cancelled, delay } from 'redux-saga/effects';
import {
    startService,
    startServiceSuccess,
    stopService,
    stopServiceSuccess,
    setIsScanning,
    startScanning,
    stopScanning,
    setScanningError,
} from '@noke-slices';

const START_SERVICE_SUCCESS_MSG = 'Noke service is running...';
const START_SERVICE_FAILURE_MSG = "Noke service failed to initialize";

export function* serviceSaga() {
    while (true) {
        yield take (startService);
        try {
            const serviceInitialized = yield call(NokeAndroid.initiateNokeService);
            if (serviceInitialized) {
                console.log(START_SERVICE_SUCCESS_MSG);
                yield put(startServiceSuccess());
            } else {
                console.log( START_SERVICE_FAILURE_MSG );
            }
        } catch (error) {
            console.log(START_SERVICE_FAILURE_MSG);
            yield put(startServiceFailure(error));
        }
        yield take(stopService);
    }
}
