// TODO: match navigationTheme to user setting on phone
// TODO: In settings, have a radio button that sets theme.dark
import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { AppDrawerNavigator, navigationRef } from '@navigation';
import { FAB } from '@components';
import { lightTheme, darkTheme } from '@themes';
import { useSystemColorScheme } from '@hooks';
import { getActiveTheme } from '@selectors';
import {
    NavigationContainer,
    DefaultTheme as RNDefaultTheme,
    DarkTheme as RNDarkTheme,
} from '@react-navigation/native';

function AppNavigation() {
    useSystemColorScheme();

    const initialRouteName = 'SettingsScreen';
    const isDarkTheme = useSelector(getActiveTheme) === 'dark';
    const navigationTheme = isDarkTheme ? RNDarkTheme : RNDefaultTheme;
    const theme = isDarkTheme ? darkTheme : lightTheme;

    return (
        <NavigationContainer theme={navigationTheme} ref={navigationRef}>
            <ThemeProvider theme={theme}>
                <FAB />
                <AppDrawerNavigator initialRouteName={initialRouteName} />
            </ThemeProvider>
        </NavigationContainer>
    );
}

export default AppNavigation;
