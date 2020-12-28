/* eslint-disable prettier/prettier */
import { NativeModules } from 'react-native';
import {
    fromNokeEvents,
    onEvent,
    onEventOnce,
    offEvent,
    getEventListeners,
} from './events';

const { RNNoke } = NativeModules;

const {
  initiateNokeService,
  setApiKey,
  offlineUnlock,
  sendCommands,
  addNokeDevice,
  addNokeOfflineValues,
  removeAllNokes,
  removeNokeDevice,
  startScan,
  stopScan,
  disconnect,
  connect,
  isBluetoothEnabled,
  setBluetoothDelayDefault,
  setBluetoothDelayBackgroundDefault,
  setBluetoothScanDuration,
} = RNNoke;

export default {
    initiateNokeService,
    setApiKey,
    on: onEvent,
    once: onEventOnce,
    off: offEvent,
    offlineUnlock,
    sendCommands,
    addNokeDevice,
    addNokeOfflineValues,
    removeAllNokes,
    removeNokeDevice,
    startScan,
    stopScan,
    disconnect,
    connect,
    fromNokeEvents,
    getEventListeners,
    isBluetoothEnabled,
    setBluetoothDelayDefault,           // Android only
    setBluetoothDelayBackgroundDefault, // Android only
    setBluetoothScanDuration,           // Android only
};
