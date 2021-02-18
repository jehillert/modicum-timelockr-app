// TODO: import { isValidMac, removeColons } from '@utilities';
import { NokeAndroid } from '@noke';
import { requestLocPermissionAsync } from '@utilities';
import {
    addDevice,
    addDeviceFailure,
    addDeviceSuccess,
    removeDevice,
    removeDeviceFailure,
    removeDeviceSuccess,
    setIsScanning,
    setScanningError,
    startScanning,
    startService,
    startEventChannels,
    startServiceFailure,
    startServiceSuccess,
    stopScanning,
    stopService,
} from '@noke-slices';
import {
    call,
    put,
    select,
    take,
    takeEvery,
} from 'redux-saga/effects';
import {
    getActiveMac,
    getActiveName,
    getServiceConnected,
} from '@selectors';

const START_SERVICE_MSG = 'Noke service initialized... 1/2';
const START_SERVICE_FAILURE_MSG = "Noke service failed to initialize";
const NO_LOCK_REFERENCE_ERROR = 'Must provide valid mac address or "activeLockId" must reference enumerated lock.';

export function* serviceSaga() {
    while (true) {
        yield take (startService);
        try {
            const locationPermissionGranted = yield call(requestLocPermissionAsync);
            const serviceInitialized = yield call(NokeAndroid.initiateNokeService);

            if (locationPermissionGranted && serviceInitialized) {
                console.log(START_SERVICE_MSG);
            } else {
                console.log( START_SERVICE_FAILURE_MSG );
            }
        } catch (err) {
            console.log(START_SERVICE_FAILURE_MSG);
            yield put(startServiceFailure(err));
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

export function* addDeviceTask() {
    yield takeEvery(addDevice, function* () {
        try {
            const activeMac = yield select(getActiveMac);
            const activeName = yield select(getActiveName);
            const { isSuccess } = yield call(NokeAndroid.addNokeDevice, { mac: activeMac, name: activeName });

            if (isSuccess) {
                yield put(addDeviceSuccess());
            } else {
                throw NO_LOCK_REFERENCE_ERROR;
            }
        } catch (err) {
            yield put(addDeviceFailure(err))
        }
    })
}

export function* removeDeviceTask() {
    yield takeEvery(removeDevice, function* () {
        try {
            const activeMac = yield select(getActiveMac);
            const { isSuccess } = yield call(NokeAndroid.removeNokeDevice, activeMac);

            if (isSuccess) {
                yield put(removeDeviceSuccess());
            } else {
                throw NO_LOCK_REFERENCE_ERROR;
            }
        } catch (err) {
            yield put(removeDeviceFailure(err))
        }
    })
}
