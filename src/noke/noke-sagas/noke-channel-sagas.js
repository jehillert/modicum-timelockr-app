// TODO: Add "END" language to channels
import { NativeEventEmitter } from 'react-native';
import { eventChannel, channel } from 'redux-saga';
import { nokeServiceEvents, nokeServiceMessages as nsm } from '@noke-constants';
import {
    NokeAndroid,
    deviceEventActions,
    setServiceError,
    startEventChannels,
    startServiceFailure,
    startServiceSuccess,
    stopServiceSuccess,
    updateBluetoothStatus,
} from '@noke';
import { call, cancelled, put, take } from 'redux-saga/effects';

// HELPERS
const cleanupSubs = subscrArray => {
    while (subscrArray.length) {
        const subscription = subscrArray.pop();
        subscription.remove();
    }
};

const handleEvent = (eventName, emitter) => data => {
    emitter({ eventName, data });
};

// CREATE CHANNELS
function createServiceEventChannel() {
    return eventChannel(emitter => {
        const NokeServiceEmitter = new NativeEventEmitter(NokeAndroid);
        const serviceSubs = Object.values(nokeServiceEvents).map(eventName =>
            NokeServiceEmitter.addListener(eventName, handleEvent(eventName, emitter)),
        );
        console.log(nsm.SERVICE_LISTENERS_ADDED_MSG);
        return () => cleanupSubs(serviceSubs);
    });
}

function createDeviceEventChannel() {
    return eventChannel(emitter => {
        const NokeDeviceEmitter = new NativeEventEmitter(NokeAndroid);
        const deviceSubs = Object.keys(deviceEventActions).map(eventName =>
            NokeDeviceEmitter.addListener(eventName, handleEvent(eventName, emitter)),
        );
        console.log(nsm.DEVICE_LISTENERS_ADDED_MSG);
        return () => cleanupSubs(deviceSubs);
    });
}

function* listenToServiceChannel() {
    yield take(startEventChannels);
    const serviceChannel = yield call(createServiceEventChannel);

    while (true) {
        try {
            const { eventName, data } = yield take(serviceChannel);
            if (eventName === nokeServiceEvents.onServiceConnected) {
                yield put(startServiceSuccess());
            } else if (eventName === nokeServiceEvents.onServiceDisconnected) {
                yield put(stopServiceSuccess());
            } else if (eventName === nokeServiceEvents.onBluetoothStatusChanged) {
                yield put(updateBluetoothStatus(data));
            } else if (eventName === nokeServiceEvents.onError) {
                yield put(setServiceError(data));
            }
        } catch (err) {
            yield put(startServiceFailure(nsm.START_SERVICE_FAILURE_MSG));
        } finally {
            if (yield cancelled()) {
                channel.close();
            }
        }
    }
}

// SUBSCRIBE CHANNELS
function* listenToDeviceChannel() {
    yield take(startEventChannels);
    const deviceChannel = yield call(createDeviceEventChannel);
    while (true) {
        try {
            const { eventName, data } = yield take(deviceChannel);
            const eventAction = deviceEventActions[eventName](data);
            yield put(eventAction);
        } catch (err) {
            console.warn(err);
        } finally {
            if (yield cancelled()) {
                channel.close();
            }
        }
    }
}

export { listenToServiceChannel, listenToDeviceChannel };
