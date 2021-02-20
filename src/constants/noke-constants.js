const deviceEventDomain = 'device/event';

export const nokeServiceEvents = {
    onServiceConnected: 'onServiceConnected',
    onServiceDisconnected: 'onServiceDisconnected',
    onBluetoothStatusChanged: 'onBluetoothStatusChanged',
    onError: 'onError',
    // 'onDataUploaded',
}

export const nokeDeviceEvents = {
    onNokeDiscovered: `${deviceEventDomain}/onNokeDiscovered`,
    onNokeConnecting: `${deviceEventDomain}/onNokeConnecting`,
    onNokeConnected: `${deviceEventDomain}/onNokeConnected`,
    onNokeDisconnected: `${deviceEventDomain}/onNokeDisconnected`,
    onNokeShutdown: `${deviceEventDomain}/onNokeShutdown`,
    onNokeSyncing: `${deviceEventDomain}/onNokeSyncing`,
    onNokeUnlocked: `${deviceEventDomain}/onNokeUnlocked`,
}

export const nokeServiceMessages = {
    START_SERVICE_MSG: 'Noke service initialized... 1/2',
    START_SERVICE_FAILURE_MSG: "Noke service failed to initialize",
    NO_LOCK_REFERENCE_ERROR: 'Must provide valid mac address or "activeLockId" must reference enumerated lock.',
    START_SERVICE_SUCCESS_MSG: 'Noke service is running... 2/2',
    START_SERVICE_FAILURE_MSG: 'Noke service failed to initialize',
    DEVICE_LISTENERS_ADDED_MSG: 'Noke device event listeners added.',
    SERVICE_LISTENERS_ADDED_MSG: 'Noke service event listeners added.',
}
