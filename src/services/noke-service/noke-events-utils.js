import { nokeEvents } from './constants';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { Observable } from 'rxjs';

const { NokeAndroidMobileLibrary } = NativeModules;
const NokeEmitter = new NativeEventEmitter(NokeAndroidMobileLibrary);

export const onEvent = function (eventName, callback) {
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

    return new Observable(observer => {
        nokeEvents.forEach(eventName => {
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

const nokeEventUtils = {
    onEvent,
    onEventOnce,
    offEvent,
    getEventListeners,
    fromNokeEvents,
};

export default nokeEventUtils;
