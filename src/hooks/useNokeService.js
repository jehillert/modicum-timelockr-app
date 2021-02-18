import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NokeAndroid } from '@noke';
import { requestLocPermissionAsync } from '@utilities';
import {
    startServiceSuccess,
    startService,
    startServiceFailure,
    stopServiceSuccess,
    stopServiceFailure,
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
    const onServiceConnected = 'onServiceConnected';
    const onServiceDisconnected = 'onServiceDisconnected';
    const dispatch = useDispatch();

    useEffect(() => {
        const NokeEmitter = new NativeEventEmitter(NokeAndroid);
        const handleServiceConnectionEvent = event => data => startServiceSuccess();
        const handleServiceDisconnectionEvent = event => data => dispatch(stopServiceSuccess());

        NokeEmitter.addListener(onServiceConnected, handleServiceConnectionEvent(onServiceConnected));
        NokeEmitter.addListener(onServiceDisconnected, handleServiceDisconnectionEvent(onServiceDisconnected));

        return () => {
            NokeEmitter.removeListener(onServiceConnected, handleServiceConnectionEvent);
            NokeEmitter.removeListener(onServiceDisconnected, handleServiceDisconnectionEvent);
        };
    }, []);
}
