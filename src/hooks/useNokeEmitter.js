/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import NokeAndroid from 'noke';

function useNokeEmitter() {
    useEffect(() => {
        const NokeEmitter = new NativeEventEmitter(NokeAndroid);

        const onServiceConnected = NokeEmitter.addListener('onServiceConnected', data => {
            console.log('NOKE_EMITTER: onServiceConnected', data);
        });

        const onServiceDisconnected = NokeEmitter.addListener('onServiceDisconnected', data => {
            console.log('NOKE_EMITTER: onServiceDisconnected', data);
        });

        const onBluetoothStatusChanged = NokeEmitter.addListener('onBluetoothStatusChanged', data => {
            console.log('NOKE_EMITTER: onBluetoothStatusChanged', data);
        });

        const onDataUploaded = NokeEmitter.addListener('onDataUploaded', data => {
            console.log('NOKE_EMITTER: onDataUploaded', data);
        });

        const onError = NokeEmitter.addListener('onError', data => {
            console.log('NOKE_EMITTER: onError', data);
        });

        const onNokeConnected = NokeEmitter.addListener('onNokeConnected', data => {
            console.log('NOKE_EMITTER: onNokeConnected', data);
        });

        const onNokeConnecting = NokeEmitter.addListener('onNokeConnecting', data => {
            console.log('NOKE_EMITTER: onNokeConnecting', data);
        });

        const onNokeDisconnected = NokeEmitter.addListener('onNokeDisconnected', data => {
            console.log('NOKE_EMITTER: onNokeDisconnected', data);
        });

        const onNokeDiscovered = NokeEmitter.addListener('onNokeDiscovered', data => {
            console.log('NOKE_EMITTER: onNokeDiscovered', data);
        });

        const onNokeShutdown = NokeEmitter.addListener('onNokeShutdown', data => {
            console.log('NOKE_EMITTER: onNokeShutdown', data);
        });

        const onNokeSyncing = NokeEmitter.addListener('onNokeSyncing', data => {
            console.log('NOKE_EMITTER: onNokeSyncing', data);
        });

        const onNokeUnlocked = NokeEmitter.addListener('onNokeUnlocked', data => {
            console.log('NOKE_EMITTER: onNokeUnlocked', data);
        });

        console.log('onServiceConnected listener added');
        console.log('onServiceDisconnected listener added');
        console.log('onBluetoothStatusChanged listener added');
        console.log('onDataUploaded listener added');
        console.log('onError listener added');
        console.log('onNokeConnected listener added');
        console.log('onNokeConnecting listener added');
        console.log('onNokeDisconnected listener added');
        console.log('onNokeDiscovered listener added');
        console.log('onNokeShutdown listener added');
        console.log('onNokeSyncing listener added');
        console.log('onNokeUnlocked listener added');
    }, []);
}

export default useNokeEmitter;
