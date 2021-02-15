/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NativeEventEmitter } from 'react-native';
import NokeAndroid from '@noke';
import { updateDevice } from '@noke-state';

const nokeDeviceEvents = [
    'onNokeDiscovered',
    'onNokeConnecting',
    'onNokeConnected',
    'onNokeDisconnected',
    'onNokeShutdown',
    'onNokeSyncing',
    'onNokeUnlocked',
];

const otherNokeEvents = ['onBluetoothStatusChanged', 'onError'];

function useNokeEmitter() {
    const dispatch = useDispatch();

    useEffect(() => {
        const NokeEmitter = new NativeEventEmitter(NokeAndroid);

        const handleDeviceEvent = event => data => {
            dispatch(updateDevice(data));
            console.log(`NOKE_EMITTER: ${event}`);
        };

        const handleOtherEvent = event => data => {
            console.log(`NOKE_EMITTER: ${event}`);
        };

        nokeDeviceEvents.forEach(
            event => NokeEmitter.addListener(event, handleDeviceEvent(event))
        );

        otherNokeEvents.forEach(
            event => NokeEmitter.addListener(event, handleOtherEvent(event))
        );

        console.log('NOKE_EMITTER: Event listeners added.');

        return () => {
            nokeDeviceEvents.forEach(
                event => NokeEmitter.removeListener(event, handleDeviceEvent)
            );

            otherNokeEvents.forEach(
                event => NokeEmitter.removeListener(event, handleOtherEvent)
            );
        };
    }, []);
}

export default useNokeEmitter;
