// TODO: match navigationTheme to user setting on phone
// TODO: In settings, have a radio button that sets theme.dark
import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { AppDrawerNavigator, navigationRef } from '@navigation';
import { FAB } from '@components';
import { useSystemColorScheme } from '@hooks';
import { getThemeMode } from '@selectors';
import { NavigationContainer } from '@react-navigation/native';
import theme from '@theme';

function AppNavigation() {
    useSystemColorScheme();
    console.log(JSON.stringify(theme, undefined, 2));

    const themeMode = useSelector(getThemeMode);
    const activeTheme = theme[themeMode];

    return (
        <NavigationContainer theme={activeTheme} ref={navigationRef}>
            <ThemeProvider theme={activeTheme}>
                <FAB />
                <AppDrawerNavigator />
            </ThemeProvider>
        </NavigationContainer>
    );
}

export default AppNavigation;
