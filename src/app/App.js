// follow these instructions for iOS https://github.com/oblador/react-native-vector-icons#ios
import React from 'react';
import { Provider } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from '@store';
import { Provider as PaperProvider } from 'react-native-paper';
import { TestingView, Duration, Settings } from 'ui/screens';
import { PersistGate } from 'redux-persist/integration/react';
import { AppDrawer } from '@components';
import { navigationRef } from '@navigation';

const Drawer = createDrawerNavigator();

const App = () => {
    const theme = useTheme();
    const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <SafeAreaProvider>
                        <NavigationContainer theme={navigationTheme} ref={navigationRef}>
                            <AppDrawer />
                            {/* <Drawer.Navigator initialRouteName="TestingView"> */}
                                {/* <Drawer.Screen name="TestingView" component={TestingView} /> */}
                                {/* <Drawer.Screen name="Duration" component={Duration} /> */}
                                {/* <Drawer.Screen name="Settings" component={Settings} /> */}
                            {/* </Drawer.Navigator> */}
                        </NavigationContainer>
                    </SafeAreaProvider>
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
