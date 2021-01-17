module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'prettier',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    settings: {
        'import/resolver': {
            'babel-module': {},
        },
    },
    rules: {
        'import/no-named-as-default': 0,
        'import/named': 0,
    },
};
