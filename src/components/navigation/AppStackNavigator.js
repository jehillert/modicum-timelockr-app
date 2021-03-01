import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TestingScreen, LockoutSetter1, LockoutSetter2, SettingsScreen } from '@screens';

const Stack = createStackNavigator();

function AppStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#9AC4F8',
                },
                headerTintColor: 'white',
                headerBackTitle: 'Back',
            }}>
            <Stack.Screen name="TestingScreen" component={TestingScreen} />
            <Stack.Screen name="LockoutSetter1" component={LockoutSetter1} />
            <Stack.Screen name="LockoutSetter2" component={LockoutSetter2} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
    );
}

export default AppStackNavigator;
