import { useEffect } from 'react';
import { useAppDispatch } from '@hooks';
import { startEventChannels, startService } from '@noke-slices';

function useNokeService() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(startService());
    }, []);
}

export function useEventChannels() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(startEventChannels());
    }, []);
}

export { useNokeService };
