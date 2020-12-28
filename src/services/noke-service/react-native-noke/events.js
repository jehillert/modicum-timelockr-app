import { NativeEventEmitter, NativeModules } from 'react-native';
import Observable from 'rxjs/Observable';
import nokeEvents from './constants';

const { RNNoke } = NativeModules;
const NokeEmitter = new NativeEventEmitter(RNNoke);

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
    const {
        ON_SERVICE_CONNECTED,
        ON_NOKE_DISCOVERED,
        ON_NOKE_CONNECTING,
        ON_NOKE_CONNECTED,
        ON_NOKE_SYNCING,
        ON_NOKE_UNLOCKED,
        ON_NOKE_DISCONNECTED,
        ON_NOKE_SHUTDOWN,
        ON_ERROR,
    } = nokeEvents;

    let lastEvent = '';

    return Observable.create(observer => {
        onEvent(ON_SERVICE_CONNECTED, data => {
            observer.next({ name: ON_SERVICE_CONNECTED, data });
            lastEvent = ON_SERVICE_CONNECTED;
        });

        onEvent(ON_NOKE_DISCOVERED, data => {
            observer.next({ name: ON_NOKE_DISCOVERED, data });
            lastEvent = ON_NOKE_DISCOVERED;
        });

        onEvent(ON_NOKE_CONNECTING, data => {
            observer.next({ name: ON_NOKE_CONNECTING, data });
            lastEvent = ON_NOKE_CONNECTING;
        });

        onEvent(ON_NOKE_CONNECTED, data => {
            //clearTimeout(timer)
            if (lastEvent !== ON_NOKE_UNLOCKED) {
                observer.next({ name: ON_NOKE_CONNECTED, data });
                lastEvent = ON_NOKE_CONNECTED;
            }
        });

        onEvent(ON_NOKE_SYNCING, data => {
            observer.next({ name: ON_NOKE_SYNCING, data });
            lastEvent = ON_NOKE_SYNCING;
        });

        onEvent(ON_NOKE_UNLOCKED, data => {
            //clearTimeout(timer)
            observer.next({ name: ON_NOKE_UNLOCKED, data });
            lastEvent = ON_NOKE_UNLOCKED;
        });

        onEvent(ON_NOKE_DISCONNECTED, data => {
            observer.next({ name: ON_NOKE_DISCONNECTED, data });
            lastEvent = ON_NOKE_DISCONNECTED;
        });

        onEvent(ON_NOKE_SHUTDOWN, data => {
            observer.next({ name: ON_NOKE_SHUTDOWN, data });
            lastEvent = ON_NOKE_SHUTDOWN;
        });

        onEvent(ON_ERROR, data => {
            observer.next({ name: ON_ERROR, data });
            lastEvent = ON_ERROR;
        });
    });
};
