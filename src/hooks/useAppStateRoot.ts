import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { AnyFunction } from '@types';

interface Settings {
    onChange?: (nextAppState: AppStateStatus) => void;
    onForeground?: () => void;
    onBackground?: () => void;
}

/**
 * @usage
 * // In file where used, add top three lines to the import section
 * import { logger } from '@utilities';
 * import { useAppStateRoot } from '@hooks';
 * import { AppStateStatus } from 'react-native';
 *
 * // To use the hook, make callback loggers...
 * const onChange = (newAppState: AppStateStatus) => logger.yellow(`newAppState: ${newAppState}`);
 * const onForeground = () => logger.orange(`onForeground`);
 * const onBackground = () => logger.orange(`onBackground`);
 *
 * // Then call the hook, passing in the specific events you want to listen to.
 * useAppStateRoot({ onChange, onForeground, onBackground });
 * @method useAppStateRoot()
 * @param settings object with three optional callback functions.
 */
const useAppStateRoot = (settings: Settings) => {
    const { onChange, onForeground, onBackground } = settings || {};
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        function handleAppStateChange(nextAppState: AppStateStatus) {
            if (onForeground && nextAppState === 'active' && appState !== 'active') {
                isValidFunction(onForeground) && onForeground();
            } else if (onBackground && appState === 'active' && nextAppState.match(/inactive|background/)) {
                isValidFunction(onBackground) && onBackground();
            }
            setAppState(nextAppState);
            isValidFunction(onChange) && onChange && onChange(nextAppState);
        }
        AppState.addEventListener('change', handleAppStateChange);

        return () => AppState.removeEventListener('change', handleAppStateChange);
    }, [onChange, onForeground, onBackground, appState]);

    // settings validation
    function isValidFunction(func: AnyFunction) {
        return func && typeof func === 'function';
    }
    return { appState };
};

export { useAppStateRoot };
