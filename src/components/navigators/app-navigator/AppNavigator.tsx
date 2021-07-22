import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FAB } from '@screens';
import { DrawerNavigator, RootNavigation } from '@navigators';
import { useAppState, useFocusState, useMemory, useNetworkStatus } from '@hooks';

function AppNavigator() {
    useAppState();
    useFocusState();
    useNetworkStatus();
    // useMemory(3000);

    const theme = useContext(ThemeContext);

    return (
        <NavigationContainer theme={theme} ref={RootNavigation.navigationRef}>
            <StatusBar animated={true} backgroundColor={theme.colors.primary} />
            <FAB />
            <DrawerNavigator />
        </NavigationContainer>
    );
}

export default AppNavigator;
