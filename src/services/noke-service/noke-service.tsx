import React, { Component } from 'react';
import { PermissionsAndroid, Platform, View, Button } from 'react-native';
import RNNoke from './react-native-noke';
import { Observable } from 'rxjs/Observable';

RNNoke.initiateNokeService('NOKE_LIBRARY_SANDBOX');

interface NokeData {
    name?: string;
    key?: string;
    command?: string;
    macAddress: string;
}

interface NokeCommandsData {
    macAddress: string;
    commands: string[];
}

interface NokeResponse {
    name: string;
    mac: string;
    session: string;
    status: boolean;
}

interface NokeInfoResponse {
    name: string;
    battery: number;
    mac: string;
    offlineKey: string;
    offlineUnlockCmd: string;
    serial: string;
    session: string;
    trackingKey: string;
    lastSeen: number;
    version: string;
}

type EventName =
    | 'onServiceConnected' // only Android
    | 'onServiceDisconnected' // only Android
    | 'onNokeDiscovered'
    | 'onNokeConnecting'
    | 'onNokeConnected'
    | 'onNokeSyncing'
    | 'onNokeUnlocked'
    | 'onNokeDisconnected'
    | 'onBluetoothStatusChanged'
    | 'onError';

interface RNNoke {
    initiateNokeService: () => Promise<{ status: boolean }>;
    startScan: () => Promise<{ status: boolean }>;
    stopScan: () => Promise<{ status: boolean }>;
    addNokeDeviceOnce: (data: NokeData) => Promise<NokeResponse>;
    sendCommands: (data: NokeCommandsData) => Promise<NokeResponse>;
    removeAllNokes: () => Promise<null>;
    removeNokeDevice: () => Promise<null>;
    offlineUnlock: () => Promise<NokeResponse>;
    // getDeviceInfo: () => Promise<NokeInfoResponse>;
    on: (
        eventName: EventName,
        callback: (response: NokeResponse) => RNNoke,
    ) => void;
    fromNokeEvents: () => Observable<{ name: EventName; data: NokeResponse }>;
}
console.log('🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦');
export class NokeServiceButtons extends Component {
    componentDidMount() {
        this.requestLocationPermission(); // only Android

        RNNoke.on('onServiceConnected', (data: any) => console.log('onServiceConnected', data)) // only Android
            .on('onServiceDisconnected', (data: any) => console.log('onServiceConnected', data)) // only Android
            .on('onNokeDiscovered', (data: any) => console.log('onNokeDiscovered', data))
            .on('onNokeConnecting', (data: any) => console.log('onNokeConnecting', data))
            .on('onNokeConnected', (data: any) => console.log('onNokeConnected', data))
            .on('onNokeSyncing', (data: any) => console.log('onNokeSyncing', data))
            .on('onNokeUnlocked', (data: any) => console.log('onNokeUnlocked', data))
            .on('onNokeDisconnected', (data: any) => console.log('onNokeDisconnected', data))
            .on('onBluetoothStatusChanged', (data: any) => console.log('onBluetoothStatusChanged', data))
            .on('onError', (data: any) => console.log('onError', data));
            console.log('🟨  🟨  🟨  🟨  🟨  🟨  🟨  🟨  🟨  🟨  🟨  🟨  🟨  🟨  🟨  🟨  🟨  🟨 ');
        }

    requestLocationPermission = () => {
        if (Platform.OS === 'ios') return;
        console.log('⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️');

        return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Cool Location Permission',
                message: 'Cool Location App needs access to your location ',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            },
        )
            .then(console.log)
            .catch(console.error);
    };

    onUnlock = (data: any) => {
        console.log('🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨');
        RNNoke.offlineUnlock(data).then(console.log).catch(console.error);
    };

    // onAddNoke = (data: any) => { RNNoke.addNokeDeviceOnce(data).then(console.log).catch(console.error); };

    onSendCommands = (data: any) => {
        console.log('🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫🟫');
        RNNoke.sendCommands(data).then(console.log).catch(console.error);
    };

    onRemoveAllNokes = () => {
        console.log('🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥');
        RNNoke.removeAllNokes().then(console.log).catch(console.error);
    };

    // getDeviceInfo = () => { RNNoke.getDeviceInfo().then(console.log).catch(console.error); };
    onStartScan = () => {
        console.log('🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪');
        RNNoke.startScan().then(console.log).catch(console.error);
    };

    onStopScan = () => {
        console.log('🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪');
        RNNoke.stopScan().then(console.log).catch(console.error);
    };

    render() {
        return (
            <View>
                {/* <Button onPress={this.onSendCommands} title="Unlock noke by commands" /> */}
                {/* <Button onPress={this.onUnlock} title="Unlock noke offline" /> */}
                {/* <Button onPress={this.onAddNoke} title="Add noke" /> */}
                <Button onPress={this.onRemoveAllNokes} title="Remove noke" />
            </View>
        );
    }
}

export default NokeServiceButtons;
