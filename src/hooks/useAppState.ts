import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { getAppState } from '@selectors';
import { updateAppState } from '@system';
import { logger } from '@utilities';
import { useAppDispatch, useAppSelector, usePrevious } from '@hooks';

function logAppState() {
    const appState = useAppSelector(getAppState);
    const prevAppState = usePrevious(appState);

    useEffect(() => {
        if (appState !== prevAppState) {
            logger.orange(`appState: ${appState}`);
        }
    }, [appState, prevAppState]);
}

function useAppState() {
    const dispatch = useAppDispatch();
    const appState = useAppSelector(getAppState);
    const appStateRef = useRef(AppState.currentState);

    const onChange = (nextAppState: AppStateStatus): void => {
        if (appStateRef.current !== nextAppState) {
            dispatch(updateAppState(nextAppState));
        }
        appStateRef.current = nextAppState;
    };

    useEffect(() => {
        AppState.addEventListener('change', onChange);

        return () => {
            AppState.removeEventListener('change', onChange);
        };
    }, []);

    logAppState();
    return appState;
}

export { useAppState };
