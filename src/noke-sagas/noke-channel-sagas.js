// TODO: Import { requestLocPermissionAsync, throttled } from '@utilities';
// TODO: Move constants in this file to dedicated file
import { NativeEventEmitter } from 'react-native';
import { eventChannel, END, channel } from 'redux-saga';
import { nokeServiceEvents, nokeDeviceEvents } from '@constants';
import {
    startEventChannels,
    startServiceFailure,
    startServiceSuccess,
    updateDevice,
} from '@noke-slices';
import { call, cancelled, put, take } from 'redux-saga/effects';
import NokeAndroid from '@noke';

// CONSTANTS
const EMITTER_TAG = '[NOKE_EMITTER]'
const START_SERVICE_SUCCESS_MSG = 'Noke service is running... 2/2';
const START_SERVICE_FAILURE_MSG = 'Noke service failed to initialize';
const DEVICE_LISTENERS_ADDED_MSG = `${EMITTER_TAG} Noke device event listeners added.`
const SERVICE_LISTENERS_ADDED_MSG = `${EMITTER_TAG} Noke service event listeners added.`

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
function createNokeServiceChannel() {
    return eventChannel(emitter => {
        const NokeServiceEmitter = new NativeEventEmitter(NokeAndroid);
        Object.values(nokeServiceEvents).map(eventName => NokeServiceEmitter.addListener(eventName, handleEvent(eventName, emitter)));
        console.log(SERVICE_LISTENERS_ADDED_MSG);
        return () => cleanupSubs(serviceSubs);
    });
}

// ADD DEVICE-SPECIFIC SERVICE LISTENERS
function createNokeDeviceChannel() {
    return eventChannel(emitter => {
        const NokeDeviceEmitter = new NativeEventEmitter(NokeAndroid);
        Object.values(nokeDeviceEvents).map(eventName => NokeDeviceEmitter.addListener(eventName, handleEvent(eventName, emitter)));
        console.log(DEVICE_LISTENERS_ADDED_MSG);
        return () => cleanupSubs(deviceSubs);
    });
}

/*
    const throttledDiscovery = throttled(1000, handleOnDiscovered);
    NokeEmitter.addListener(onNokeDiscovered, throttled(1000, handleOnDiscovered(onNokeDiscovered)));
*/

// SUBSCRIBE SERVICE CHANNEL
export function* listenToServiceChannel() {
    // TODO: figure out appropriate error messaging here
    yield take(startEventChannels);
    const serviceChannel = yield call(createNokeServiceChannel);

    while (true) {
        try {
            const { eventName, data } = yield take(serviceChannel);
            console.log(`%cdata: ${JSON.stringify(data, undefined, 2)};`, 'color: darkred; background-color: gold');
            console.log(`%ceventName: ${eventName}`, 'color: purple; background-color: white');
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
    // TODO: yield put(setDeviceChannelStatus({ isActive: true })) (maybe don't need this)
    // TODO: Clean up error-handling. Create action for channel isActive, isListening, isError for device channel
    yield take(startEventChannels);
    const deviceChannel = yield call(createNokeDeviceChannel);

    while (true) {
        try {
            const { data } = yield take(deviceChannel);
            console.log(`%cdata: ${JSON.stringify(data, undefined, 2)};`, 'color: darkred; background-color: gold');
            yield put(updateDevice(event.data));
        } catch (err) {
            console.warn(err);
        } finally {
            if (yield cancelled()) {
                channel.close();
            }
        }
    }
}
