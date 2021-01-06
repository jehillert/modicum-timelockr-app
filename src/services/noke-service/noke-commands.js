import { NativeModules } from 'react-native';
const { NokeAndroidMobileLibrary: Noke } = NativeModules;

const logEvent = eventObj => console.log(JSON.stringify(eventObj, undefined, 2));

const nokeCommands = {
    setBluetoothDelayDefault: delay => Noke.setBluetoothDelayDefault(delay).then(logEvent),
    setBluetoothDelayBackgroundDefault: delay => Noke.setBluetoothDelayBackgroundDefault(delay).then(logEvent),
    setBluetoothScanDuration: () => Noke.setBluetoothScanDuration().then(logEvent),
    startScan: duration => Noke.startScan(duration).then(logEvent),
    stopScan: () => Noke.stopScan().then(logEvent),
    sendCommands: (mac, command) => Noke.sendCommands().then(logEvent),
    addNokeDevice: data => Noke.addNokeDevice(data).then(logEvent),
    addNokeOfflineValues: () => Noke.addNokeOfflineValues().then(logEvent),
    connect: () => Noke.connect().then(logEvent),
    disconnect: () => Noke.disconnect().then(logEvent),
    removeAllNokes: () => Noke.removeAllNokes().then(logEvent),
    removeNokeDevice: () => Noke.removeNokeDevice().then(logEvent),
    offlineUnlock: () => Noke.offlineUnlock().then(logEvent),
};

export default nokeCommands;
