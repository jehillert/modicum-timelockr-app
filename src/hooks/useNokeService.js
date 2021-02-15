import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NokeAndroid } from '@noke';
import { requestLocPermissionAsync } from '@utilities';
import { setServiceConnected } from '@noke-state';
import { NativeEventEmitter } from 'react-native';

export function useNokeService() {
    useEffect(() => {
        const initializeNokeService = async () => {
            try {
                const granted = requestLocPermissionAsync();
                if (granted) {
                    const serviceInitialized = await NokeAndroid.initiateNokeService();
                    console.log(
                        serviceInitialized ? 'Noke service is running...' : 'Noke service failed to start.',
                    );
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
            event === 'onServiceConnected'
                ? dispatch(setServiceConnected(true))
                : dispatch(setServiceConnected(false));

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
