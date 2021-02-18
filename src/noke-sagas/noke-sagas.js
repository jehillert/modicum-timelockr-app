import { NativeEventEmitter } from 'react-native';
import { eventChannel, END } from 'redux-saga';
import { NokeAndroid } from '@noke';
import { getServiceConnected, getServiceStatus } from '@selectors';
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
import {
    call,
    cancel,
    cancelled,
    delay,
    fork,
    put,
    select,
    take,
    takeEvery,
} from 'redux-saga/effects';

const START_SERVICE_SUCCESS_MSG = 'Noke service is running...';
const START_SERVICE_FAILURE_MSG = "Noke service failed to initialize";

const yack = () => console.log("•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••");

export function* talkingSaga() {
    yield takeEvery("service/startServiceSuccess", yack);
}

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

export function* scanningSaga() {
    while (true) {
        yield take(startScanning);
        try {
            const serviceConnected = yield select(getServiceConnected);
            if (serviceConnected) {
                const { isScanning } = yield call(NokeAndroid.startScanning);
                yield put(setIsScanning(isScanning));
            }
        } catch (err) {
            yield put(setScanningError(err));
        }
        yield take(stopScanning);
        try {
            const serviceConnected = yield select(getServiceConnected);
            const { isScanning } = yield call(NokeAndroid.stopScanning);
            if (serviceConnected && !isScanning) {
                yield put(setIsScanning(isScanning));
            }
        } catch (err) {
            yield put(setScanningError(err));
        }
    }
}


// export const startScanningThunk = () => async (dispatch, getState) => {
//     try {
    //     const { serviceConnected = null } = getState().service;
    //     if (serviceConnected) {
    //         const { isScanning } = await NokeAndroid.startScanning();
    //         return isScanning && dispatch(startScanning());
    //     }
    // } catch (err) {
    //     dispatch(setScanningError(err));
    // }
// };

// export const stopScanningThunk = () => async (dispatch, getState) => {
//     try {
//         const { serviceConnected = null } = getState().service;
//         if (serviceConnected) {
//             const { isScanning } = await NokeAndroid.stopScanning();
//             return !isScanning && dispatch(stopScanning());
//         }
//     } catch (err) {
//         dispatch(setScanningError(err));
//     }
// };

// export function* connectSaga() {
//     while(true) {
//         yield
//     }
// }
