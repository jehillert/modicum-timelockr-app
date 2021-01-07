import { NativeEventEmitter, NativeModules } from 'react-native';
import { nokeEvents } from './constants';
import { Observable } from 'rxjs';

const { NokeAndroidMobileLibrary: n } = NativeModules;

const NokeEmitter = new NativeEventEmitter(n);

const logEvent = eventObj => console.log(JSON.stringify(eventObj, undefined, 2));

const nokeCommands = {
    setBluetoothDelayDefault: delay => n.setBluetoothDelayDefault(delay).then(logEvent),
    setBluetoothDelayBackgroundDefault: delay => n.setBluetoothDelayBackgroundDefault(delay).then(logEvent),
    setBluetoothScanDuration: () => n.setBluetoothScanDuration().then(logEvent),
    startScan: duration => n.startScan(duration).then(logEvent),
    stopScan: () => n.stopScan().then(logEvent),
    sendCommands: (mac, command) => n.sendCommands().then(logEvent),
    addNokeDevice: data => n.addNokeDevice(data).then(logEvent),
    addNokeOfflineValues: () => n.addNokeOfflineValues().then(logEvent),
    connect: () => n.connect().then(logEvent),
    disconnect: () => n.disconnect().then(logEvent),
    removeAllNokes: () => n.removeAllNokes().then(logEvent),
    removeNokeDevice: () => n.removeNokeDevice().then(logEvent),
    offlineUnlock: () => n.offlineUnlock().then(logEvent),
};

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

const Noke = {
    getConstants: n.getConstants,
    getName: n.getName,
    ...nokeCommands,
};

export const nokeEventUtils = {
    onEvent,
    onEventOnce,
    offEvent,
    getEventListeners,
    fromNokeEvents,
};

export default Noke;
