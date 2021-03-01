// TODO: match navigationTheme to user setting on phone
// TODO: In settings, have a radio button that sets theme.dark
import React from 'react';
import { useTheme } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { AppStackNavigator, AppDrawerNavigator, navigationRef } from '@navigation';
import { FAB } from '@components';

function AppNavigation() {
    const theme = useTheme();
    const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

    return (
        <NavigationContainer theme={navigationTheme} ref={navigationRef}>
            <FAB />
            {/* <AppStackNavigator /> */}
            <AppDrawerNavigator />
        </NavigationContainer>
    );
}

export default AppNavigation;
