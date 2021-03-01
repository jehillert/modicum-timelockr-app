import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import { setSystemColorScheme } from '@slices';

// Requires react-native-appearance library
// Place this effect downstream of <AppearanceProvider>
function useSystemColorScheme() {
    const dispatch = useDispatch();
    const colorScheme = useColorScheme();

    useEffect(() => {
        dispatch(setSystemColorScheme(colorScheme));
    }, [colorScheme, dispatch]);
}

export default useSystemColorScheme;
