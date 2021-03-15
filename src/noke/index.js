import { NativeModules } from 'react-native';
import nokeUtils from './noke-utils';

const { NokeAndroidMobileLibrary } = NativeModules;

export { default as nokeUtils } from './noke-utils';

const Noke = {
    getConstants: NokeAndroidMobileLibrary.getConstants,
    getName: NokeAndroidMobileLibrary.getName,
    ...nokeUtils,
};

export { NokeAndroidMobileLibrary as NokeAndroid };

export default Noke;
