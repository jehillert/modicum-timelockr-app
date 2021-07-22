import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { updateHasNetAccess } from '@system';
import { getHasNetAccess } from '@selectors';
import { useAppDispatch, useAppSelector, usePrevious } from '@hooks';
import { logger } from '@utilities';

function logNetworkStatus() {
    const hasNetAccess = useAppSelector(getHasNetAccess);
    const prevHasNetAccess = usePrevious(hasNetAccess);
    useEffect(() => {
        if (hasNetAccess !== prevHasNetAccess) {
            logger.blue(`hasNetAccess: ${hasNetAccess}`);
        }
    }, [hasNetAccess, prevHasNetAccess]);
}

function useNetworkStatus(...callbacks: ((hasNetAccess: boolean) => void)[]): void {
    const dispatch = useAppDispatch();
    const hasNetAccess = useAppSelector(getHasNetAccess);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(({ isInternetReachable }) => {
            dispatch(updateHasNetAccess(isInternetReachable));
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        callbacks.forEach(callback => callback(hasNetAccess));
    }, [hasNetAccess]);

    logNetworkStatus();
    return hasNetAccess;
}

export { useNetworkStatus };
