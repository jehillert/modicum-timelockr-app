import { NativeModules } from 'react-native';

const { NokeAndroidMobileLibrary } = NativeModules;

const Noke = {
    getConstants: NokeAndroidMobileLibrary.getConstants,
    getName: NokeAndroidMobileLibrary.getName,
};

// NOKE NATIVE MODULE (ANDROID)
export default Noke;
export { NokeAndroidMobileLibrary as NokeAndroid };
// NOKE CORE API
export { default as nokeApi } from './noke-api/noke-api';
// NOKE REDUX
export * from './noke-sagas/noke-sagas';
// export { default as nokeEventChannels } from './noke-sagas/noke-channel-sagas';
export { default as nokeRootSaga } from './noke-sagas/nokeRootSaga';
export * from './noke-slices/coreApiSlice';
export * from './noke-slices/devicesSlice';
export * from './noke-slices/serviceSlice';
export { default as coreApiReducer } from './noke-slices/coreApiSlice';
export { default as devicesReducer } from './noke-slices/devicesSlice';
export { default as serviceReducer } from './noke-slices/serviceSlice';
