import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { StatusBar } from 'react-native';
import { AppDrawerNavigator, navigationRef } from '@navigation';
import { FAB } from '@components';
import { NavigationContainer } from '@react-navigation/native';

function AppNavigation() {
    const theme = useContext(ThemeContext);

    return (
        <NavigationContainer theme={theme} ref={navigationRef}>
            <StatusBar animated={true} backgroundColor={theme.colors.primary} />
            <FAB />
            <AppDrawerNavigator />
        </NavigationContainer>
    );
}

export default AppNavigation;
