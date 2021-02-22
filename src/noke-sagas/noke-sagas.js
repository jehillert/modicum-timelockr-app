/* eslint-disable prettier/prettier */
// TODO: import { isValidMac, removeColons } from '@utilities';
// TODO: cancel/cancelled
// TODO: set scanning timeout/ setServiceError
import { NokeAndroid } from '@noke';
import { requestLocPermissionAsync } from '@utilities';
import { nokeServiceMessages as nsm } from '@constants';
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
import {
    addDevice,
    addDeviceFailure,
    addDeviceSuccess,
    connectAndUnlock,
    connectAndUnshackle,
    connectDevice,
    connectDeviceSuccess,
    connectDeviceFailure,
    discoverAddDevice,
    deviceEventActions,
    fetchUnlock,
    fetchUnshackle,
    removeDevice,
    removeDeviceFailure,
    removeDeviceSuccess,
    setScanningError,
    startScanning,
    startScanningSuccess,
    startService,
    startServiceFailure,
    stopScanning,
    stopScanningSuccess,
    stopService,
} from '@noke-slices';


export function* serviceSaga() {
    while (true) {
        yield take (startService);
        try {
            yield call(requestLocPermissionAsync);
            yield call(NokeAndroid.initiateNokeService);
        } catch (err) {
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
                yield call(NokeAndroid.startScanning);
                yield put(startScanningSuccess());
            }
        } catch (err) {
            yield put(setScanningError(err));
        }
        yield take(stopScanning);
        try {
            const serviceConnected = yield select(getServiceConnected);
            const { isScanning } = yield call(NokeAndroid.stopScanning);
            if (serviceConnected && !isScanning) {
                yield put(stopScanningSuccess());
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
                throw nsm.NO_LOCK_REFERENCE_ERROR;
            }
        } catch (err) {
            yield put(addDeviceFailure(err))
        }
    })
}

export function* connectDeviceTask() {
    yield takeEvery(connectDevice, function* () {
        try {
            const activeMac = yield select(getActiveMac);
            yield call(NokeAndroid.connect, activeMac);
            yield put(connectDeviceSuccess());
        } catch (err) {
            yield put(connectDeviceFailure(err));
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
                throw nsm.NO_LOCK_REFERENCE_ERROR;
            }
        } catch (err) {
            yield put(removeDeviceFailure(err))
        }
    })
}

export function* discoverAddDeviceTask() {
    while(true) {
        yield take(discoverAddDevice);
        yield put(startScanning());
        yield take(deviceEventActions.onNokeDiscovered)
        yield put(addDevice());
        yield put(stopScanning());
    }
}

export function* connectAndUnlockTask() {
    while(true) {
        const { payload } = yield take(connectAndUnlock);
        yield put(startScanning());
        yield take(deviceEventActions.onNokeDiscovered);
        yield put(connectDevice());
        yield take(deviceEventActions.onNokeConnected);
        yield put(stopScanning());
        yield put(fetchUnlock(payload));
    }
}

export function* connectAndUnshackleTask() {
    while(true) {
        const { payload } = yield take(connectAndUnshackle);
        yield put(startScanning());
        yield take(deviceEventActions.onNokeDiscovered);
        yield put(connectDevice());
        yield take(deviceEventActions.onNokeConnected);
        yield put(fetchUnshackle(payload));
        yield put(stopScanning());
    }
}
