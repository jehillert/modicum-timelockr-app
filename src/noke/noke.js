import { NativeEventEmitter, NativeModules } from 'react-native';
import nokeConstants from './noke-constants';
import { Observable } from 'rxjs';

export const { NokeAndroidMobileLibrary: NokeAndroid } = NativeModules;

const logEvent = event => console.log(`EMITTED: ${JSON.stringify(event, undefined)}`);

// DEVICE (LOCK) UTILITIES
export const nokeUtils = {
    addNokeDevice: lockData => NokeAndroid.addNokeDevice(lockData).then(logEvent).catch(console.error),
    addNokeOfflineValues: lockData => NokeAndroid.addNokeOfflineValues(lockData).then(logEvent).catch(console.error),
    connect: mac => NokeAndroid.connect(mac).then(logEvent).catch(console.error),
    disconnect: mac => NokeAndroid.disconnect(mac).then(logEvent).catch(console.error),
    offlineUnlock: mac => NokeAndroid.offlineUnlock(mac).then(logEvent).catch(console.error),
    removeAllNokes: () => NokeAndroid.removeAllNokes().then(logEvent).catch(console.error),
    removeNokeDevice: mac => NokeAndroid.removeNokeDevice(mac).then(logEvent).catch(console.error),
    sendCommands: (mac, command) => NokeAndroid.sendCommands(mac, command).then(logEvent).catch(console.error),
    setBluetoothDelayBackgroundDefault: delay => NokeAndroid.setBluetoothDelayBackgroundDefault(delay).then(logEvent).catch(console.error),
    setBluetoothDelayDefault: delay => NokeAndroid.setBluetoothDelayDefault(delay).then(logEvent).catch(console.error),
    setBluetoothScanDuration: duration => NokeAndroid.setBluetoothScanDuration(duration).then(logEvent).catch(console.error),
    startScan: () => NokeAndroid.startScan().then(logEvent).catch(console.error),
    stopScan: () => NokeAndroid.stopScan().then(logEvent).catch(console.error),
};

// EVENT UTILITIES
const NokeEmitter = new NativeEventEmitter(NokeAndroid);

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
        nokeConstants.nokeEvents.forEach(eventName => {
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
