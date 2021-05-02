module.exports = {
    parser: '@typescript-eslint/parser',
    root: true,
    extends: [
        '@react-native-community',
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
    ],
    settings: {
        'import/resolver': {
            'babel-module': {},
        },
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'], // Your TypeScript files extension
        },
    ],
}
