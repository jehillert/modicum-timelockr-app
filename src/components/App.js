// follow these instructions for iOS https://github.com/oblador/react-native-vector-icons#ios
import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigation } from '@navigation';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <SafeAreaProvider>
                        <AppNavigation />
                    </SafeAreaProvider>
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
