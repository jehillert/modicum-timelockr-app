import { NativeModules } from 'react-native';
// import {
//     fromNokeEvents,
//     onEvent,
//     onEventOnce,
//     offEvent,
//     getEventListeners,
// } from './events';

const { NokeMobileLibAndroid } = NativeModules;

const { /* initiateNokeService, */ getConstants } = NokeMobileLibAndroid;

export {
    // initiateNokeService,
    getConstants,
};
