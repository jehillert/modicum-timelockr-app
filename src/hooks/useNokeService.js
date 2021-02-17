import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NokeAndroid } from '@noke';
import { requestLocPermissionAsync } from '@utilities';
import {
    startServiceSuccess,
    startService,
} from '@noke-slices';
import { NativeEventEmitter } from 'react-native';

export function useNokeService() {
    const dispatch = useDispatch();
    useEffect(() => {
        const initializeNokeService = async () => {
            try {
                const granted = requestLocPermissionAsync();
                if (granted) {
                    dispatch(startService());
                }
            } catch (e) {
                console.error(e);
            }
        };

        initializeNokeService();
    }, []);
}

export function useNokeServiceListener() {
    const serviceConnectionEvents = ['onServiceConnected', 'onServiceDisconnected'];
    const dispatch = useDispatch();

    useEffect(() => {
        const NokeEmitter = new NativeEventEmitter(NokeAndroid);

        const handleServiceConnectionEvent = event => data =>
            // TODO: pass the error if it comes with the event
            event === 'onServiceConnected'
                ? dispatch(startServiceSuccess())
                : dispatch(startServiceFailure());

        serviceConnectionEvents.forEach(event =>
            NokeEmitter.addListener(event, handleServiceConnectionEvent(event)),
        );

        return () => {
            serviceConnectionEvents.forEach(event =>
                NokeEmitter.removeListener(event, handleServiceConnectionEvent),
            );
        };
    }, []);
}
