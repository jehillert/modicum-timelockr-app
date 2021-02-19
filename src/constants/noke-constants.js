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
