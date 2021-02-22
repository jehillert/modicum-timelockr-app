import React from 'react';
import { Provider } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from '@store';
import { Provider as PaperProvider } from 'react-native-paper';
import { TestingView, Duration } from 'ui/screens';
import { PersistGate } from 'redux-persist/integration/react';

const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <SafeAreaProvider>
                        <NavigationContainer>
                            <Drawer.Navigator initialRouteName="TestingView">
                                <Drawer.Screen name="TestingView" component={TestingView} />
                                <Drawer.Screen name="Duration" component={Duration} />
                            </Drawer.Navigator>
                        </NavigationContainer>
                    </SafeAreaProvider>
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
