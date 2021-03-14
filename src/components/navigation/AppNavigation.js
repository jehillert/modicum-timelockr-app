import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { StatusBar } from 'react-native';;
import { ThemeContext } from 'styled-components';
import { AppDrawerNavigator, navigationRef } from '@navigation';
import { getThemeMode } from '@selectors';
import { NavigationContainer } from '@react-navigation/native';

function AppNavigation() {
    const theme = useContext(ThemeContext);
    const themeMode = useSelector(getThemeMode);
    const activeTheme = theme[themeMode];

    return (
        <NavigationContainer theme={activeTheme} ref={navigationRef}>
            <StatusBar animated={true} backgroundColor={theme.colors.primary} />
            <AppDrawerNavigator />
        </NavigationContainer>
    );
}

export default AppNavigation;
