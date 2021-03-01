// TODO: match navigationTheme to user setting on phone
// TODO: In settings, have a radio button that sets theme.dark
import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
// import { useTheme } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { AppDrawerNavigator, navigationRef } from '@navigation';
import { FAB } from '@components';
import { lightTheme, darkTheme } from '@themes';
import { useSystemColorScheme } from '@hooks';

function AppNavigation() {
    // const theme = useTheme();
    const initialRouteName = 'SettingsScreen';
    const isDarkMode = useSelector(state => state?.settings.isDarkMode);
    const navigationTheme = isDarkMode ? DarkTheme : DefaultTheme;

    useSystemColorScheme();

    return (
        <NavigationContainer theme={navigationTheme} ref={navigationRef}>
            <ThemeProvider theme={darkTheme}>
                <FAB />
                <AppDrawerNavigator initialRouteName={initialRouteName} />
            </ThemeProvider>
        </NavigationContainer>
    );
}

export default AppNavigation;
