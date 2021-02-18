import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceStatus } from '@selectors';
import {
    startEventChannels,
    stopServiceChannel,
    stopDeviceChannel,
    startService,
    stopService,
} from '@noke-slices';
import { usePrevious } from '@hooks';

export function useNokeSagas() {
    const dispatch = useDispatch();
    const serviceStatus = useSelector(getServiceStatus);
    const prevServiceStatus = usePrevious(serviceStatus);

    useEffect(() => {
        if (serviceStatus === 'disconnected' && prevServiceStatus === undefined) {
            console.log(`%cserviceStatus: ${serviceStatus};`, 'color: purple; background-color: white');
            console.log(`%cprevServiceStatus: ${prevServiceStatus};`, 'color: purple; background-color: white');
            dispatch(startService());
        }

        if (serviceStatus === 'connecting' && prevServiceStatus === 'disconnected') {
            console.log(`%cserviceStatus: ${serviceStatus};`, 'color: darkred; background-color: gold');
            console.log(`%cprevServiceStatus: ${prevServiceStatus};`, 'color: darkred; background-color: gold');
            dispatch(startEventChannels());
        }

        return () => {
            dispatch(stopService());
            dispatch(stopServiceChannel());
            dispatch(stopDeviceChannel());
        }
    }, [prevServiceStatus, serviceStatus])
}

export default useNokeSagas;
