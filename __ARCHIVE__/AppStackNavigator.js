// IMPLEMENT
import { AppStackNavigator } from '@navigation';
<AppStackNavigator />

// REFERENCE
export { default as AppStackNavigator } from './AppStackNavigator';

// DEFINE
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TestingScreen, SetTime1Screen, SetTime2Screen, SettingsScreen } from '@screens';

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
            <Stack.Screen name="SetTime1Screen" component={SetTime1Screen} />
            <Stack.Screen name="SetTime2Screen" component={SetTime2Screen} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
    );
}

export default AppStackNavigator;
