import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    startEventChannels,
    startService,
} from '@noke-slices';

export function useNokeService() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startService());
    }, [])
}

export function useEventChannels() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startEventChannels());
    }, [])
}
