// NOTE: Follow these instructions for iOS https://github.com/oblador/react-native-vector-icons#ios
// NOTE: It appears for now that react-native-safe-area-view needs to be improted but you can use standard SafeAreaView
// TODO: have a better radio button.  whole row colored, or something.  dot is old
import React from 'react';
import { Provider } from 'react-redux';
import { Button, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigation } from '@navigation';
import { ThemeWrapper } from '@theme';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeWrapper>
                    <AppNavigation />
                </ThemeWrapper>
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        padding: 10,
    },
    textStyle: {
        textAlign: 'center',
        marginBottom: 8,
    },
});

export default App;
