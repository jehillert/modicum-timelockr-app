import React from 'react';
import { useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import { AppDrawerNavigator, navigationRef } from '@navigation';
import { FAB } from '@components';
import { getThemeMode } from '@selectors';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from '@theme';

function AppNavigation() {
    const themeMode = useSelector(getThemeMode);
    const activeTheme = theme[themeMode];

    return (
        <NavigationContainer theme={activeTheme} ref={navigationRef}>
            <StatusBar animated={true} backgroundColor="#61dafb" />
            <FAB />
            <AppDrawerNavigator />
        </NavigationContainer>
    );
}

export default AppNavigation;
