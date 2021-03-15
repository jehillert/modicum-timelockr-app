// Implement
import { AppStackNavigator } from '@navigation';
<AppStackNavigator />

// Reference
export { default as AppStackNavigator } from './AppStackNavigator';

// Define
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TestingScreen, DateScreen, DurationScreen, SettingsScreen } from '@screens';

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
            <Stack.Screen name="DateScreen" component={DateScreen} />
            <Stack.Screen name="DurationScreen" component={DurationScreen} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
    );
}

export default AppStackNavigator;
