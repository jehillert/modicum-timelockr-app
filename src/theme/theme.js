import { DefaultTheme as LightTheme, DarkTheme } from '@react-navigation/native';

// "primary": "rgb(10, 132, 255)",
// "background": "rgba(27, 32, 36, 1)",
// "card": "rgb(18, 18, 18)",
// "text": "rgb(229, 229, 231)",
// "border": "rgb(39, 39, 41)",
// "notification": "rgb(255, 69, 58)"
const lightTheme = {
    ...LightTheme,
    colors: {
        ...LightTheme.colors,
        background: 'rgba(255, 255, 255, 1)',
    },
};

const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: "rgba(27, 32, 36, 1)",
    },
};

const theme = {
    light: lightTheme,
    dark: darkTheme,
};

export default theme;
