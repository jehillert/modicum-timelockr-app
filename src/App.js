import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import initializeBridgeSpy from './bridgeSpyConfig';
import TestingView from './screens/TestingView';
import Duration from './screens/Duration';

initializeBridgeSpy();

const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="TestingView">
                    <Drawer.Screen name="TestingView" component={TestingView} />
                    <Drawer.Screen name="Duration" component={Duration} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;
