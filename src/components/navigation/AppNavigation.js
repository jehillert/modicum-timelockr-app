// TODO: match navigationTheme to user setting on phone
// TODO: In settings, have a radio button that sets theme.dark
import React from 'react';
import { useSelector } from 'react-redux';
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
            <FAB />
            <AppDrawerNavigator />
        </NavigationContainer>
    );
}

export default AppNavigation;
