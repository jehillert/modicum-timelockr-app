import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';
import { useSystemColorScheme } from '@hooks';
import { getThemeMode } from '@selectors';
import { theme } from '@theme';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppearanceProvider } from 'react-native-appearance';

const S = {};

S.SafeAreaView = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    background-color: #ecf0f1;
`;

function ThemeWrapper({ children }) {
    useSystemColorScheme();
    // const themeMode = useSelector(getThemeMode);
    const themeMode = useSelector(getThemeMode) || 'light';

    return (
        <ThemeProvider theme={theme[themeMode]}>
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
