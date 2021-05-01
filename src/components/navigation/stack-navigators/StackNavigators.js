import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerToggleButton } from '@drawer';
import { SettingsScreen } from '@settings';
import { DateScreen } from '@view-date';
import { DurationScreen } from '@view-duration';
import { TestingScreen } from '@view-testing';

const Stack = createStackNavigator();

function createStackScreen(Component, title) {
    return function ScreenStack({ navigation }) {
        const theme = useContext(ThemeContext);

        const options = {
            title: title,
            headerLeft: () => <DrawerToggleButton navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.colorOnPrimary,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };

        return (
            <Stack.Navigator initialRouteName={Component.name}>
                <Stack.Screen name={Component.name} component={Component} options={options} />
            </Stack.Navigator>
        );
    };
}

const DateScreenStack = createStackScreen(DateScreen, 'Set Lockout');
const DurationScreenStack = createStackScreen(DurationScreen, 'Set Lockout');
const TestingScreenStack = createStackScreen(TestingScreen, 'Noke Android API');
const SettingsScreenStack = createStackScreen(SettingsScreen, 'Settings');

export { DateScreenStack, DurationScreenStack, TestingScreenStack, SettingsScreenStack };
