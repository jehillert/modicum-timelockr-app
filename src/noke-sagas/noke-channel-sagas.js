import { NativeEventEmitter } from 'react-native';
import { eventChannel, END, channel } from 'redux-saga';
import { nokeServiceEvents, nokeDeviceEvents } from '@constants';
import {
    deviceEventActionCreators,
    startEventChannels,
    startServiceFailure,
    startServiceSuccess,
} from '@noke-slices';
import { call, cancelled, put, take, throttle } from 'redux-saga/effects';
import NokeAndroid from '@noke';

// CONSTANTS
const START_SERVICE_SUCCESS_MSG = 'Noke service is running... 2/2';
const START_SERVICE_FAILURE_MSG = 'Noke service failed to initialize';
const DEVICE_LISTENERS_ADDED_MSG = 'Noke device event listeners added.'
const SERVICE_LISTENERS_ADDED_MSG = 'Noke service event listeners added.'
const onNokeDiscovered = 'onNokeDiscovered';

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
        console.log(SERVICE_LISTENERS_ADDED_MSG);
        return () => cleanupSubs(serviceSubs);
    });
}

// ADD DEVICE-SPECIFIC SERVICE LISTENERS
function createDeviceEventChannel() {
    return eventChannel(emitter => {
        const NokeDeviceEmitter = new NativeEventEmitter(NokeAndroid);
        Object.keys(deviceEventActionCreators).map(eventName => NokeDeviceEmitter.addListener(eventName, handleEvent(eventName, emitter)));
        console.log(DEVICE_LISTENERS_ADDED_MSG);
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
                console.log(START_SERVICE_SUCCESS_MSG);
            }
            if (eventName === nokeServiceEvents.onServiceDisconnected) {
                yield put(stopServiceSuccess());
                console.log(START_SERVICE_SUCCESS_MSG);
            }
        } catch (err) {
            console.warn(START_SERVICE_FAILURE_MSG);
            yield put(startServiceFailure(err));
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
