/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import NokeAndroid from 'noke';

const { NokeAndroidMobileLibrary } = NativeModules;

export function useNokeEmitter(NokeEmitter = new NativeEventEmitter(NokeAndroidMobileLibrary)) {
    useEffect(() => {
        NokeEmitter.on('onServiceConnected', data => console.log('onServiceConnected', data)) // only Android
            .on('onServiceDisconnected', data => console.log('onServiceDisconnected', data)) // only Android
            .on('onBluetoothStatusChanged', data => console.log('onBluetoothStatusChanged', data))
            .on('onDataUploaded', data => console.log('onDataUploaded', data))
            .on('onError', data => console.log('onError', data))
            .on('onNokeConnected', data => console.log('onNokeConnected', data))
            .on('onNokeConnecting', data => console.log('onNokeConnecting', data))
            .on('onNokeDisconnected', data => console.log('onNokeDisconnected', data))
            .on('onNokeDiscovered', data => console.log('onNokeDiscovered', data))
            .on('onNokeShutdown', data => console.log('onNokeShutdown', data))
            .on('onNokeSyncing', data => console.log('onNokeSyncing', data))
            .on('onNokeUnlocked', data => console.log('onNokeUnlocked', data));
    }, []);

    return NokeEmitter;
}

export function useNokeService() {
    useEffect(() => {
        const initializeNokeService = async () => {
            try {
                const serviceInitialized = await NokeAndroid.initiateNokeService();
                console.log(`serviceInitialized: ${serviceInitialized}`);
            } catch (e) {
                console.error(e);
            }
        };

        initializeNokeService();
    }, []);
}
