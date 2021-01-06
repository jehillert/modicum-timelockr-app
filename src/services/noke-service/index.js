import { NativeModules } from 'react-native';
import nokeCommands from './noke-commands';

const { NokeAndroidMobileLibrary } = NativeModules;

const Noke = {
    getConstants: NokeAndroidMobileLibrary.getConstants,
    getName: NokeAndroidMobileLibrary.getName,
    ...nokeCommands,
};

export { nokeEventUtils } from './noke-events-utils';

export default Noke;
