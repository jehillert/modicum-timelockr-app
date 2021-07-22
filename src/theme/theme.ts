import { DefaultTheme as LightTheme, DarkTheme } from '@react-navigation/native';

const lightTheme = {
    ...LightTheme,
    colors: {
        ...LightTheme.colors,
        background: 'rgba(255, 255, 255, 1)',
        colorOnPrimary: 'rgba(255, 255, 255, 1)',
        primary: '#012c36',
        statusBar: '#61dafb',
    },
};

const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: 'rgba(27, 32, 36, 1)',
        colorOnPrimary: 'rgba(255, 255, 255, 1)',
        primary: '#012c36',
        statusBar: '#61dafb',
    },
};

const theme = {
    light: lightTheme,
    dark: darkTheme,
};

export default theme;
