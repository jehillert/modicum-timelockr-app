// TODO: import { isValidMac, removeColons } from '@utilities';
// TODO: cancel/cancelled
import { NokeAndroid } from '@noke';
import { nokeServiceMessages as nsm } from '@constants';
import { requestLocPermissionAsync } from '@utilities';
import {
    addDevice,
    addDeviceFailure,
    addDeviceSuccess,
    discoverAddDevice,
    deviceEventActionCreators,
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

export function* discoverAddDeviceTask() {
    while(true) {
        yield take(discoverAddDevice);
        yield put(startScanning());
        yield take(deviceEventActionCreators['onNokeDiscovered'])
        yield put(addDevice());
        yield put(stopScanning());
    }
}
