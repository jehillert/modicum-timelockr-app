import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { StatusBar } from 'react-native';
import { navigationRef } from '@navigation';
import { DrawerNavigator } from '@drawer';
import { FAB } from '@view-lockout';
import { NavigationContainer } from '@react-navigation/native';
// import { useNokeService, useEventChannels } from '@hooks';

function AppNavigation() {
    // useEventChannels();
    // useNokeService();
    const theme = useContext(ThemeContext);

    return (
        <NavigationContainer theme={theme} ref={navigationRef}>
            <StatusBar animated={true} backgroundColor={theme.colors.primary} />
            <FAB />
            <DrawerNavigator />
        </NavigationContainer>
    );
}

export default AppNavigation;
