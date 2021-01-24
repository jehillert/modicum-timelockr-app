/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NativeEventEmitter } from 'react-native';
import NokeAndroid from '@noke';
import { setServiceConnected, updateDevice } from '@noke-state';

const nokeDeviceEvents = [
    'onNokeDiscovered',
    'onNokeConnecting',
    'onNokeConnected',
    'onNokeDisconnected',
    'onNokeShutdown',
    'onNokeSyncing',
    'onNokeUnlocked',
];

const serviceConnectionEvents = ['onServiceConnected', 'onServiceDisconnected'];

const otherNokeEvents = ['onBluetoothStatusChanged', 'onError'];

function useNokeEmitter() {
    const dispatch = useDispatch();

    useEffect(() => {
        const NokeEmitter = new NativeEventEmitter(NokeAndroid);

        const handleDeviceEvent = event => data => {
            dispatch(updateDevice(data));
            console.log(`[NOKE_EMITTER]: ${event}`);
        };

        const handleServiceConnectionEvent = event => data =>
            event === 'onServiceConnected' ? dispatch(setServiceConnected(true)) : dispatch(setServiceConnected(false));

        const handleOtherEvent = event => data => {
            console.log(`[NOKE_EMITTER]: ${event}`);
        };

        nokeDeviceEvents.forEach(
            event => NokeEmitter.addListener(event, handleDeviceEvent(event))
        );

        serviceConnectionEvents.forEach(
            event => NokeEmitter.addListener(event, handleServiceConnectionEvent(event))
        );

        otherNokeEvents.forEach(
            event => NokeEmitter.addListener(event, handleOtherEvent(event))
        );

        console.log('[NOKE_EMITTER]: Event listeners added.');

        return () => {
            nokeDeviceEvents.forEach(
                event => NokeEmitter.removeListener(event, handleDeviceEvent)
            );

            otherNokeEvents.forEach(
                event => NokeEmitter.removeListener(event, handleOtherEvent)
            );

            serviceConnectionEvents.forEach(
                event => NokeEmitter.removeListener(event, handleServiceConnectionEvent)
            );
        };
    }, []);
}

export default useNokeEmitter;
