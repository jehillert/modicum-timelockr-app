import Reactotron from 'reactotron-react-native';
import ReactotronFlipper from 'reactotron-react-native/dist/flipper';

Reactotron.configure({
    name: 'modicum-timelockr',
    createSocket: path => new ReactotronFlipper(path),
})
    .useReactNative()
    .connect();
