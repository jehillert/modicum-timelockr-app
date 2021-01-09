import { NativeEventEmitter, NativeModules } from 'react-native';
import nokeConstants from './noke-constants';
import nokeUtils from './noke-utils';
import { Observable } from 'rxjs';

export const { NokeAndroidMobileLibrary: NokeAndroid } = NativeModules;

// EVENT UTILITIES
const NokeEmitter = new NativeEventEmitter(NokeAndroid);

export const onEvent = function (eventName, callback) {
    console.log(`eventName: ${eventName}`);
    NokeEmitter.addListener(eventName, callback);
    return this;
};

export const onEventOnce = function (eventName, callback) {
    NokeEmitter.once(eventName, callback);
    return this;
};

export const offEvent = function (eventName, listener) {
    NokeEmitter.removeListener(eventName, listener);
    return this;
};

export const getEventListeners = function (eventName) {
    return NokeEmitter.listeners(eventName);
};

export const fromNokeEvents = () => {
    if (!Observable) {
        return {
            message: 'Missing rxjs',
        };
    }

    let lastEvent = '';

    const { nokeEvents } = nokeConstants;

    return new Observable(observer => {
        Object.keys[nokeEvents].forEach(eventName => {
            onEvent(eventName, data => {
                observer.next({
                    name: eventName,
                    data,
                });
                lastEvent = eventName;
            });
        });
    });
};

export { default as nokeConstants } from './noke-constants';

export { default as nokeUtils } from './noke-utils';

export const nokeEventUtils = {
    onEvent,
    onEventOnce,
    offEvent,
    getEventListeners,
    fromNokeEvents,
};

const Noke = {
    getConstants: NokeAndroid.getConstants,
    getName: NokeAndroid.getName,
    nokeConstants,
    ...nokeUtils,
    ...nokeEventUtils,
};

export { unlockReducer } from './nokeSlice';

export default Noke;
