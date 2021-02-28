import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TestingScreen, LockoutSetter1, LockoutSetter2, SettingsScreen } from '@screens';

const Stack = createStackNavigator();

const AppStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TestingScreen" component={TestingScreen} />
            <Stack.Screen name="LockoutSetter1" component={LockoutSetter1} />
            <Stack.Screen name="LockoutSetter2" component={LockoutSetter2} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
    );
};

export { AppStackNavigator };
