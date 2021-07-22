import { useEffect } from 'react';
import { getUsedMemory } from 'react-native-device-info';
import { updateMemoryUse } from '@system';
import { getMemoryUse } from '@selectors';
import { useAppDispatch, useAppSelector, usePrevious } from '@hooks';
import { logger } from '@utilities';

function logMemoryUse() {
    const memoryUse = useAppSelector(getMemoryUse);

    useEffect(() => {
        logger.red(`memoryUse: ${memoryUse}`);
    }, [memoryUse]);
}

/**
 * Returns current memory usage of app at interval specified by user
 *
 * @method useMemory()
 * @param { number } ms Reporting interval in ms.
 * @return { number } Current memory consumption of app in MB.
 */
function useMemory(ms: number): number {
    const dispatch = useAppDispatch();
    const memoryUse = useAppSelector(getMemoryUse);

    useEffect(() => {
        const memoryIntervalID = setInterval(
            () =>
                getUsedMemory().then(usedMemory =>
                    dispatch(updateMemoryUse(`${Math.round(usedMemory / 1024 / 1024)} MB`)),
                ),
            ms,
        );

        return () => clearInterval(memoryIntervalID);
    }, []);

    logMemoryUse();
    return memoryUse;
}

export { useMemory };
