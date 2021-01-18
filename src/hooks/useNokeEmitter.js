/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NativeEventEmitter } from 'react-native';
import NokeAndroid from '@noke';
import { updateNokeDevice, setDiscoveredDevice } from '@noke-state';

function useNokeEmitter() {
    const dispatch = useDispatch();

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
            dispatch(updateNokeDevice(data));
        });

        const onNokeConnecting = NokeEmitter.addListener('onNokeConnecting', data => {
            console.log('NOKE_EMITTER: onNokeConnecting', data);
        });

        const onNokeDisconnected = NokeEmitter.addListener('onNokeDisconnected', data => {
            console.log('NOKE_EMITTER: onNokeDisconnected', data);
        });

        const onNokeDiscovered = NokeEmitter.addListener('onNokeDiscovered', data => {
            dispatch(setDiscoveredDevice(data));
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

        console.log('LISTENERS ADDED');

    }, []);
}

export default useNokeEmitter;
