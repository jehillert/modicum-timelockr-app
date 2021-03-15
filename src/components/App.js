// NOTE: Instructions for iOS vector icons https://github.com/oblador/react-native-vector-icons#ios
// NOTE: react-native-safe-area-view is req it seems (for SafeAreaView)
// NOTE: have a better radio button.  whole row colored, or something.
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigation } from '@navigation';
import { ThemeWrapper } from '@theme';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeWrapper>
                    <StatusBar animated={true} backgroundColor="#61dafb" />
                    <AppNavigation />
                </ThemeWrapper>
            </PersistGate>
        </Provider>
    );
}

export default App;
