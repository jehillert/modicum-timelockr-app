import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { ViewBar } from '@components';
import { SetTime1Screen, SetTime2Screen, TestingScreen, SettingsScreen } from '@screens';

const Stack = createStackNavigator();

function createStackScreen(Component, title) {
    return function ScreenStack({ navigation }) {
        const theme = useContext(ThemeContext);

        const options = {
            title: title,
            headerLeft: () => <ViewBar navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: theme.colors.primary,
                height: 80,
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

const SetTime1ScreenStack = createStackScreen(SetTime1Screen, 'Set Lockout');
const SetTime2ScreenStack = createStackScreen(SetTime2Screen, 'Set Lockout');
const TestingScreenStack = createStackScreen(TestingScreen, 'Noke Android API');
const SettingsScreenStack = createStackScreen(SettingsScreen, 'Settings');

export { SetTime1ScreenStack, SetTime2ScreenStack, TestingScreenStack, SettingsScreenStack };
