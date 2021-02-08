import { NativeModules } from 'react-native';
import nokeConstants, { nokeEvents } from './noke-constants';
import nokeUtils from './noke-utils';

const { NokeAndroidMobileLibrary } = NativeModules;

export { nokeEvents };
export { default as nokeConstants } from './noke-constants';
export { default as nokeUtils } from './noke-utils';

const Noke = {
    getConstants: NokeAndroidMobileLibrary.getConstants,
    getName: NokeAndroidMobileLibrary.getName,
    nokeConstants,
    ...nokeUtils,
};

export { NokeAndroidMobileLibrary as NokeAndroid };

export default Noke;
