import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FAB } from '@views';
import { DrawerNavigator, RootNavigation } from '@navigators';

function AppNavigator() {
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
