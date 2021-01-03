import Reactotron from 'reactotron-react-native';
import ReactotronFlipper from 'reactotron-react-native/dist/flipper';

Reactotron.configure({
    name: 'modicum-timelockr',
    createSocket: path => new ReactotronFlipper(path),
}) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!
