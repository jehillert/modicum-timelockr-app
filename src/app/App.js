import React from 'react';
import { Provider } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from '@store';
import { TestingView, Duration } from '@screens';
import { PersistGate } from 'redux-persist/integration/react';

const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <Drawer.Navigator initialRouteName="TestingView">
                            <Drawer.Screen name="TestingView" component={TestingView} />
                            <Drawer.Screen name="Duration" component={Duration} />
                        </Drawer.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
