// follow these instructions for iOS https://github.com/oblador/react-native-vector-icons#ios
// TODO: have a better radio button.  whole row colored, or something.  dot is old
import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigation } from '@navigation';
import { AppearanceProvider } from 'react-native-appearance';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppearanceProvider>
                    <PaperProvider>
                        <SafeAreaProvider>
                            <AppNavigation />
                        </SafeAreaProvider>
                    </PaperProvider>
                </AppearanceProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
