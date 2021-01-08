import { NativeEventEmitter, NativeModules } from 'react-native';
import { nokeEvents } from './constants';
import { Observable } from 'rxjs';

const { NokeAndroidMobileLibrary: n } = NativeModules;
const NokeEmitter = new NativeEventEmitter(n);

const logEvent = event => console.log(`EMITTED: ${JSON.stringify(event, undefined)}`);

export const nokeUtils = {
    handleAddNokeDevice: lockData => n.addNokeDevice(lockData).then(logEvent).catch(console.error),
    handleAddNokeOfflineValues: lockData => n.addNokeOfflineValues(lockData).then(logEvent).catch(console.error),
    handleConnect: mac => n.connect(mac).then(logEvent).catch(console.error),
    handleDisconnect: mac => n.disconnect(mac).then(logEvent).catch(console.error),
    handleOfflineUnlock: mac => n.offlineUnlock(mac).then(logEvent).catch(console.error),
    handleRemoveAllNokes: () => n.removeAllNokes().then(logEvent).catch(console.error),
    handleRemoveNokeDevice: mac => n.removeNokeDevice(mac).then(logEvent).catch(console.error),
    handleSendCommands: (mac, command) => n.sendCommands(mac, command).then(logEvent).catch(console.error),
    handleSetBluetoothDelayBackgroundDefault: delay => n.setBluetoothDelayBackgroundDefault(delay).then(logEvent).catch(console.error),
    handleSetBluetoothDelayDefault: delay => n.setBluetoothDelayDefault(delay).then(logEvent).catch(console.error),
    handleSetBluetoothScanDuration: duration => n.setBluetoothScanDuration(duration).then(logEvent).catch(console.error),
    handleStartScan: () => n.startScan().then(logEvent).catch(console.error),
    handleStopScan: () => n.stopScan().then(logEvent).catch(console.error),
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
    ...nokeUtils,
};

export const nokeEventUtils = {
    onEvent,
    onEventOnce,
    offEvent,
    getEventListeners,
    fromNokeEvents,
};

export { unlockReducer } from './nokeSlice';

export default Noke;
