import { NativeEventEmitter } from 'react-native';
import {
    put,
    takeEvery,
    throttle
} from 'redux-saga/effects'
import {
    discoverDevice,

} from 'noke-slices';


export function* handleDiscoverDevice(action) {
    discoverDevice(action.payload);
}

export function* updateWithOnDiscoveredEventData() {
  yield throttle(3000, 'devices/discoverDevice', () => {})
}
