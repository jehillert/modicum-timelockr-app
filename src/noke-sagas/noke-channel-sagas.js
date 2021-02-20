// TODO: Add "END" language to channels
import { NativeEventEmitter } from 'react-native';
import { eventChannel, channel } from 'redux-saga';
import { nokeServiceEvents, nokeServiceMessages as nsm } from '@constants';
import {
    deviceEventActionCreators,
    startEventChannels,
    startServiceFailure,
    startServiceSuccess,
} from '@noke-slices';
import { call, cancelled, put, take } from 'redux-saga/effects';
import NokeAndroid from '@noke';

// HELPERS
const cleanupSubs = subscrArray => {
    while (subscrArray.length) {
        const subscription = subscrArray.pop();
        subscription.remove();
    }
};

const handleEvent = (eventName, emitter) => data => {
    emitter({ eventName, data })
};

// CREATE CHANNELS
function createServiceEventChannel() {
    return eventChannel(emitter => {
        const NokeServiceEmitter = new NativeEventEmitter(NokeAndroid);
        Object.values(nokeServiceEvents).map(eventName => NokeServiceEmitter.addListener(eventName, handleEvent(eventName, emitter)));
        console.log(nsm.SERVICE_LISTENERS_ADDED_MSG);
        return () => cleanupSubs(serviceSubs);
    });
}

// ADD DEVICE-SPECIFIC SERVICE LISTENERS
function createDeviceEventChannel() {
    return eventChannel(emitter => {
        const NokeDeviceEmitter = new NativeEventEmitter(NokeAndroid);
        Object.keys(deviceEventActionCreators).map(eventName => NokeDeviceEmitter.addListener(eventName, handleEvent(eventName, emitter)));
        console.log(nsm.DEVICE_LISTENERS_ADDED_MSG);
        return () => cleanupSubs(deviceSubs);
    });
}

// SUBSCRIBE SERVICE CHANNEL
export function* listenToServiceChannel() {
    yield take(startEventChannels);
    const serviceChannel = yield call(createServiceEventChannel);

    while (true) {
        try {
            const { eventName } = yield take(serviceChannel);
            if (eventName === nokeServiceEvents.onServiceConnected) {
                yield put(startServiceSuccess());
            }
            if (eventName === nokeServiceEvents.onServiceDisconnected) {
                yield put(stopServiceSuccess());
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

export function* listenToDeviceChannel() {
    yield take(startEventChannels);
    const deviceChannel = yield call(createDeviceEventChannel);
    while (true) {
        try {
            const { eventName, data } = yield take(deviceChannel);
            const eventAction = deviceEventActionCreators[eventName](data);
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
