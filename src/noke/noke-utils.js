/* eslint-disable import/named */
import { NokeAndroid } from '@noke';
import { requestUnlock } from '@noke-api';

const logEvent = event => console.log(`COMMAND CALLBACK: ${JSON.stringify(event, undefined)}`);

function addNokeOfflineValues(lockData) {
    return NokeAndroid.addNokeOfflineValues(lockData).then(logEvent).catch(console.error);
}

function connect(mac) {
    return NokeAndroid.connect(mac).then(logEvent).catch(console.error);
}

function disconnect(mac) {
    return NokeAndroid.disconnect(mac).then(logEvent).catch(console.error);
}

function offlineUnlock(mac) {
    return NokeAndroid.offlineUnlock(mac).then(logEvent).catch(console.error);
}

function removeAllNokes() {
    return NokeAndroid.removeAllNokes().then(logEvent).catch(console.error);
}

function sendCommands(mac, command) {
    return NokeAndroid.sendCommands(mac, command).then(logEvent).catch(console.error);
}

function setBluetoothDelayBackgroundDefault(delay) {
    return NokeAndroid.setBluetoothDelayBackgroundDefault(delay).then(logEvent).catch(console.error);
}

function setBluetoothDelayDefault(delay) {
    return NokeAndroid.setBluetoothDelayDefault(delay).then(logEvent).catch(console.error);
}

function setBluetoothScanDuration(duration) {
    return NokeAndroid.setBluetoothScanDuration(duration).then(logEvent).catch(console.error);
}

function setAllowAllDevices() {
    return NokeAndroid.setAllowAllDevices().then(logEvent).catch(console.error);
}

const unlock = () => {
    requestUnlock();
};

const nokeUtils = {
    addNokeOfflineValues,
    connect,
    disconnect,
    offlineUnlock,
    removeAllNokes,
    sendCommands,
    setBluetoothDelayBackgroundDefault,
    setBluetoothDelayDefault,
    setBluetoothScanDuration,
    unlock,
};

export default nokeUtils;
