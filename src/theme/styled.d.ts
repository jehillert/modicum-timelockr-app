import 'styled-components';
import { Theme } from '@react-navigation/native';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {
        colors: {
            [prop: string]: string;
        };
    }
}
