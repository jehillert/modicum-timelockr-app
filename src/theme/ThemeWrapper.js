import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { useSystemColorScheme } from '@hooks';
import { getThemeMode } from '@selectors';
import { theme } from '@theme';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppearanceProvider } from 'react-native-appearance';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

function ThemeWrapper({ children }) {
    useSystemColorScheme();
    console.log(JSON.stringify(theme, undefined, 2));

    const themeMode = useSelector(getThemeMode);
    const activeTheme = theme[themeMode];

    return (
        <ThemeProvider theme={activeTheme}>
            <AppearanceProvider>
                <PaperProvider>
                    <SafeAreaView style={styles.container}>{children}</SafeAreaView>
                </PaperProvider>
            </AppearanceProvider>
        </ThemeProvider>
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

export default ThemeWrapper;
