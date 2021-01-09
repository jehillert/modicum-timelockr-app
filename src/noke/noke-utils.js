import { PermissionsAndroid } from 'react-native';
import { NokeAndroid, nokeConstants } from 'noke';

const { permReqFieldConstants: PRFC } = nokeConstants;

const logEvent = event => console.log(`COMMAND CALLBACK: ${JSON.stringify(event, undefined)}`);

const requestLocPermission = async (
    permissions = 'ACCESS_COARSE_LOCATION',
    permissionsLabel = 'Location',
    title = PRFC.PERMISSIONS_TITLE_TXT,
    message = PRFC.PERMISSIONS_REQUEST_MSG,
    buttonNeutral = PRFC.BUTTON_NEGATIVE_TXT,
    buttonNegative = PRFC.BUTTON_NEUTRAL_TXT,
    buttonPositive = PRFC.BUTTON_POSITIVETXT,
) => {
    const isReqMult = Array.isArray(permissions);

    try {
        if (isReqMult) {
            const multPermissions = permissions.map(permission => PermissionsAndroid.PERMISSIONS[permission]);
            const results = await PermissionsAndroid.requestMultiple(multPermissions);
            console.log(JSON.stringify(results, undefined, 2));
        } else {
            const rationale = {
                title: `${title} ${permissionsLabel}`,
                message,
                buttonNeutral,
                buttonNegative,
                buttonPositive,
            };
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS[permissions], rationale);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log(`${permissionsLabel} Access permission granted`);
            } else {
                console.log(`${permissionsLabel} Access permission denied`);
            }
        }
    } catch (err) {
        console.warn(err);
    }
};

const requestPermissions = async permissions => {
    const isReqMult = Array.isArray(permissions);

    try {
        if (isReqMult) {
            const multPermissions = permissions.map(permission => PermissionsAndroid.PERMISSIONS[permission]);
            const results = await PermissionsAndroid.requestMultiple(multPermissions);
            console.log(JSON.stringify(results, undefined, 2));
            return results;
        }
    } catch (err) {
        console.warn(err);
    }
};

const requestLocationPermissions = async () =>
    await requestPermissions(['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION']);

function addNokeDevice(lockData) {
    return NokeAndroid.addNokeDevice(lockData).then(logEvent).catch(console.error);
}

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

function removeNokeDevice(mac) {
    return NokeAndroid.removeNokeDevice(mac).then(logEvent).catch(console.error);
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

function startScan() {
    requestPermissions(['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION']).then(results => {
        if (results['android.permission.ACCESS_FINE_LOCATION']) {
            NokeAndroid.startScan().then(logEvent).catch(console.error);
        }
    });
}

function stopScan() {
    return NokeAndroid.stopScan().then(logEvent).catch(console.error);
}

const nokeUtils = {
    addNokeDevice,
    addNokeOfflineValues,
    connect,
    disconnect,
    offlineUnlock,
    removeAllNokes,
    removeNokeDevice,
    requestLocationPermissions,
    sendCommands,
    setBluetoothDelayBackgroundDefault,
    setBluetoothDelayDefault,
    setBluetoothScanDuration,
    startScan,
    stopScan,
};

export default nokeUtils;
