import { NativeModules } from 'react-native';
import {
    fromNokeEvents,
    getEventListeners,
    offEvent,
    onEvent,
    onEventOnce,
} from './noke-events';

const { NokeAndroidMobileLibrary } = NativeModules;

const {
    getConstants,
    getName,
    addNokeDevice,
    addNokeOfflineValues,
    connect,
    disconnect,
    initiateNokeService,
    offlineUnlock,
    removeAllNokes,
    removeNokeDevice,
    sendCommands,
    setBluetoothDelayBackgroundDefault,
    setBluetoothDelayDefault,
    setBluetoothScanDuration,
    startScan,
    stopScan,
} = NokeAndroidMobileLibrary;

const Noke = {
    on: onEvent, // Event Handling
    once: onEventOnce,
    off: offEvent,
    fromNokeEvents,
    getEventListeners,
    addNokeDevice, // @ReactMethod
    addNokeOfflineValues,
    connect,
    disconnect,
    getConstants,
    getName,
    initiateNokeService,
    offlineUnlock,
    removeAllNokes,
    removeNokeDevice,
    sendCommands,
    startScan,
    stopScan,
    setBluetoothDelayDefault, // Android-Only
    setBluetoothDelayBackgroundDefault,
    setBluetoothScanDuration,
};

export default Noke;
