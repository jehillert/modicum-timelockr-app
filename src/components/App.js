// follow these instructions for iOS https://github.com/oblador/react-native-vector-icons#ios
// TODO: have a better radio button.  whole row colored, or something.  dot is old
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigation } from '@navigation';
import { AppearanceProvider } from 'react-native-appearance';

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
                <AppearanceProvider>
                    <PaperProvider>
                        <SafeAreaView style={styles.container}>
                            <StatusBar
                                animated={true}
                                backgroundColor="#61dafb"
                                barStyle={statusBarStyle}
                                showHideTransition={statusBarTransition}
                                hidden={hidden}
                            />
            {/* <Text style={styles.textStyle}>
                StatusBar Visibility:{'\n'}
                {hidden ? 'Hidden' : 'Visible'}
            </Text>
            <Text style={styles.textStyle}>
                StatusBar Style:{'\n'}
                {statusBarStyle}
            </Text>
            {Platform.OS === 'ios' ? (
                <Text style={styles.textStyle}>
                    StatusBar Transition:{'\n'}
                    {statusBarTransition}
                </Text>
            ) : null}
            <View style={styles.buttonsContainer}>
                <Button title="Toggle StatusBar" onPress={changeStatusBarVisibility} />
                <Button title="Change StatusBar Style" onPress={changeStatusBarStyle} />
                {Platform.OS === 'ios' ? (
                    <Button title="Change StatusBar Transition" onPress={changeStatusBarTransition} />
                ) : null}
            </View> */}
                            {/* <SafeAreaProvider> */}
                                <AppNavigation />
                            {/* </SafeAreaProvider> */}
                        </SafeAreaView>
                    </PaperProvider>
                </AppearanceProvider>
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ECF0F1',
    },
    buttonsContainer: {
        padding: 10,
    },
    textStyle: {
        textAlign: 'center',
        marginBottom: 8,
    },
});

export default App;
