/* eslint-disable prettier/prettier */
// TODO: import { isValidMac, removeColons } from '@utilities';
// TODO: cancel/cancelled
import { NokeAndroid } from '@noke';
import { requestLocPermissionAsync } from '@utilities';
import { nokeServiceMessages as nsm } from '@constants';
import {
    addDevice,
    addDeviceFailure,
    addDeviceSuccess,
    connectAndUnlock,
    connectDevice,
    connectDeviceSuccess,
    connectDeviceFailure,
    discoverAddDevice,
    deviceEventActionCreators,
    fetchUnlock,
    removeDevice,
    removeDeviceFailure,
    removeDeviceSuccess,
    setIsScanning,
    setScanningError,
    startScanning,
    startService,
    startServiceFailure,
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
        yield take(deviceEventActionCreators.onNokeDiscovered)
        yield put(addDevice());
        yield put(stopScanning());
    }
}

export function* connectAndUnlockTask() {
    while(true) {
        const { payload } = yield take(connectAndUnlock);
        yield put(startScanning());
        yield take(deviceEventActionCreators.onNokeDiscovered);
        yield put(connectDevice());
        yield take(deviceEventActionCreators.onNokeConnected);
        yield put(fetchUnlock(payload));
        yield take(deviceEventActionCreators.onNokeUnlocked)
        yield put(stopScanning());
    }
}
