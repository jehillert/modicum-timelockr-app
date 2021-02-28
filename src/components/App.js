// follow these instructions for iOS https://github.com/oblador/react-native-vector-icons#ios
import React from 'react';
import { Provider } from 'react-redux';
import { useTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppDrawer } from 'components';
import { navigationRef } from '@navigation';

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
                        </NavigationContainer>
                    </SafeAreaProvider>
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
