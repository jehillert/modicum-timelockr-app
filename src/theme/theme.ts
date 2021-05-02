import { DefaultTheme as LightTheme, DarkTheme } from '@react-navigation/native';

// "primary": "rgb(10, 132, 255)",
// "background": "rgba(27, 32, 36, 1)",
// "card": "rgb(18, 18, 18)",
// "text": "rgb(229, 229, 231)",
// "border": "rgb(39, 39, 41)",
// "notification": "rgb(255, 69, 58)"

/*
  "dark": false,
  "colors": {
    "primary": "rgb(0, 122, 255)",
    "background": "rgb(242, 242, 242)",
    "card": "rgb(255, 255, 255)",
    "text": "rgb(28, 28, 30)",
    "border": "rgb(216, 216, 216)",
    "notification": "rgb(255, 59, 48)"
  }
}
[Sun May 02 2021 08:34:57.701]  LOG      DarkTheme: {
  "dark": true,
  "colors": {
    "primary": "rgb(10, 132, 255)",
    "background": "rgb(1, 1, 1)",
    "card": "rgb(18, 18, 18)",
    "text": "rgb(229, 229, 231)",
    "border": "rgb(39, 39, 41)",
    "notification": "rgb(255, 69, 58)"
  }
}
*/

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
