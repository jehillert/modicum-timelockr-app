/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NativeEventEmitter } from 'react-native';
import NokeAndroid from '@noke';
import { updateDevice } from '@noke-state';
import { throttled } from '@utilities';

const onNokeDiscovered = 'onNokeDiscovered';

const nokeDeviceEvents = [
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

        /* DISCOVER LOCKS */
        const handleOnDiscovered = event => data => {
            dispatch(updateDevice(data));
            console.log(`NOKE_EMITTER: Lock discovered...\n${JSON.stringify(data, undefined, 2)}`);
        }

        const throttledDiscovery = throttled(1000, handleOnDiscovered);

        NokeEmitter.addListener(onNokeDiscovered, throttled(1000, handleOnDiscovered(onNokeDiscovered)));

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

            NokeEmitter.removeListener(onNokeDiscovered, throttledDiscovery);
        };
    }, []);
}

export default useNokeEmitter;
