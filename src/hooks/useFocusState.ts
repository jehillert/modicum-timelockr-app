import { updateFocusState } from '@system';
import { getFocusState } from '@selectors';
import { useEffect, useRef } from 'react';
import { Platform, AppState } from 'react-native';
import { useAppDispatch, useAppSelector, usePrevious } from '@hooks';
import { logger } from '@utilities';

function logFocusState() {
    const focusState = useAppSelector(getFocusState);
    const prevFocusState = usePrevious(focusState);

    useEffect(() => {
        logger.yellow(`focusState: ${focusState}`);
    }, [focusState]);
}

/**
 * Updates and logs changes to focus state of the app (Android only).
 *
 * @method useFocusState()
 * @return { string } app's current focus state, 'blur' or 'focus'.
 */
function useFocusState() {
    const dispatch = useAppDispatch();
    const focusState = useAppSelector(getFocusState);
    const focusStateRef = useRef(focusState);

    const onFocus = (): void => onFocusChange('focus');
    const onBlur = (): void => onFocusChange('blur');

    const onFocusChange = (nextFocusState: 'focus' | 'blur'): void => {
        if (focusStateRef.current !== nextFocusState) {
            dispatch(updateFocusState(nextFocusState));
        }
        focusStateRef.current = nextFocusState;
    };

    useEffect(() => {
        if (Platform.OS === 'android') {
            AppState.addEventListener('focus', onFocus);
            AppState.addEventListener('blur', onBlur);
        }

        return () => {
            if (Platform.OS === 'android') {
                AppState.addEventListener('focus', onFocus);
                AppState.addEventListener('blur', onBlur);
            }
        };
    }, []);

    logFocusState();

    return focusState;
}

export { useFocusState };
