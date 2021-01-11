import { PermissionsAndroid } from 'react-native';
import { NokeAndroid, nokeConstants } from 'noke';
import { requestUnlock } from 'noke-api';
const { permReqFieldConstants: PRFC } = nokeConstants;

const logEvent = event => console.log(`COMMAND CALLBACK: ${JSON.stringify(event, undefined)}`);

const requestLocPermissionAsync = async (
    permissions = 'ACCESS_FINE_LOCATION',
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
            const multPermissions = permissions.map(
                permission => PermissionsAndroid.PERMISSIONS[permission]
            );
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
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS[permissions],
                rationale,
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log(`${permissionsLabel} Access permission granted`);
            } else {
                console.log(`${permissionsLabel} Access permission denied`);
            }
            return granted === PermissionsAndroid.RESULTS.GRANTED;
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
            // return (
            //     results['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
            //     results['android.permission.ACCESS_COARSE_LOCATION'] === 'granted'
            // );
            return results;
        }
    } catch (err) {
        console.warn(err);
    }
};

const requestLocPermissionsAsync = async () =>
    await requestPermissions(['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION']);

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

function startScan() {
    NokeAndroid.startScan().then(logEvent).catch(console.error);
}

function stopScan() {
    return NokeAndroid.stopScan().then(logEvent).catch(console.error);
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
    requestLocPermissionsAsync,
    requestLocPermissionAsync,
    sendCommands,
    setBluetoothDelayBackgroundDefault,
    setBluetoothDelayDefault,
    setBluetoothScanDuration,
    startScan,
    stopScan,
    unlock,
};

export default nokeUtils;
