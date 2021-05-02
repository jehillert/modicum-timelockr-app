import styled, { DefaultTheme, StyledComponent } from 'styled-components';

export interface StyledSubCompsObj {
    [prop: string]: StyledComponent<React.ComponentType<any>, DefaultTheme>;
}

/*
// extendNativeModules.d.ts
// import original module declarations
import 'react-native';

export interface BBAudioPlayerInterface {
  playSound: (sound: 'click' | 'tada') => Promise<void>;
  pause: () => Promise<void>;
}

// and extend them!
declare module 'react-native' {

  interface NativeModulesStatic {
    BBAudioPlayer: BBAudioPlayerInterface;
  }
}
*/

// import styled, { DefaultTheme, ReactNativeThemedStyledFunction, StyledComponent } from 'styled-components/native';
// export interface StyledSubCompsObj {
//     [prop: string]: ReactNativeThemedStyledFunction<<any>, DefaultTheme>;
// }
