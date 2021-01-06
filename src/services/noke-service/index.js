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

export default {
    on: onEvent,
    once: onEventOnce,
    off: offEvent,
    addNokeDevice,
    addNokeOfflineValues,
    connect,
    disconnect,
    fromNokeEvents,
    getEventListeners,
    initiateNokeService,
    offlineUnlock,
    removeAllNokes,
    removeNokeDevice,
    sendCommands,
    startScan,
    stopScan,
    /*** Only android methods*/
    setBluetoothDelayDefault,
    setBluetoothDelayBackgroundDefault,
    setBluetoothScanDuration,
};
