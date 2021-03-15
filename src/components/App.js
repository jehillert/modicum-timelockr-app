// follow these instructions for iOS https://github.com/oblador/react-native-vector-icons#ios
// NOTE: It appears for now that react-native-safe-area-view needs to be improted but you can use standard SafeAreaView
// TODO: have a better radio button.  whole row colored, or something.  dot is old
// TODO: Add no screen rotation for ios
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigation } from '@navigation';
import { ThemeWrapper } from '@theme';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

function App() {
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
    const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);

    const changeStatusBarVisibility = () => setHidden(!hidden);

    const changeStatusBarStyle = () => {
        const styleId = STYLES.indexOf(statusBarStyle) + 1;
        if (styleId === STYLES.length) {
            setStatusBarStyle(STYLES[0]);
        } else {
            setStatusBarStyle(STYLES[styleId]);
        }
    };

    const changeStatusBarTransition = () => {
        const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
        if (transition === TRANSITIONS.length) {
            setStatusBarTransition(TRANSITIONS[0]);
        } else {
            setStatusBarTransition(TRANSITIONS[transition]);
        }
    };

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeWrapper>
                    <StatusBar
                        animated={true}
                        backgroundColor="#61dafb"
                        barStyle={statusBarStyle}
                        showHideTransition={statusBarTransition}
                        hidden={hidden}
                    />
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
