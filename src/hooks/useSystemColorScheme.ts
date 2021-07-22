import { useEffect } from 'react';
import { useColorScheme } from 'react-native-appearance';
import { setSystemColorScheme } from '@settings';
import { useAppDispatch } from '@hooks';

// Requires react-native-appearance library
// Place this effect downstream of <AppearanceProvider>
function useSystemColorScheme() {
    const dispatch = useAppDispatch();
    const colorScheme = useColorScheme();

    useEffect(() => {
        dispatch(setSystemColorScheme(colorScheme));
    }, [colorScheme, dispatch]);
}

export { useSystemColorScheme };
