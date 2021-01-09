import { displayName } from '../../app.json';

export const permReqFieldConstants = {
    BUTTON_NEGATIVE_TXT: 'Deny',
    BUTTON_NEUTRAL_TXT: 'Ask Me Later',
    BUTTON_POSITIVE_TXT: 'Allow',
    PERMISSIONS_REQUEST_MSG: `${displayName} needs access to your`,
    PERMISSIONS_TITLE_TXT: `${displayName} Permissions Request`,
};

export const nokeEvents = {
    onBluetoothStatusChanged: 'onBluetoothStatusChanged',
    // onDataUploaded: 'onDataUploaded',
    onError: 'onError',
    onNokeConnected: 'onNokeConnected',
    onNokeConnecting: 'onNokeConnecting',
    onNokeDisconnected: 'onNokeDisconnected',
    onNokeDiscovered: 'onNokeDiscovered',
    onNokeShutdown: 'onNokeShutdown',
    onNokeSyncing: 'onNokeSyncing',
    onNokeUnlocked: 'onNokeUnlocked',
    onServiceConnected: 'onServiceConnected',
    onServiceDisconnected: 'onServiceDisconnected',
};

const nokeConstants = {
    nokeEvents,
    permReqFieldConstants,
};

export default nokeConstants;
