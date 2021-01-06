
/*
 componentDidMount() {
   this.eventListener = eventEmitter.addListener('EventReminder', (event) => {
      console.log(event.eventProperty) // "someValue"
   });
 }

 componentWillUnmount() {
   this.eventListener.remove(); //Removes the listener
 }
*/
import { NativeEventEmitter, NativeModules } from 'react-native';
import { Observable } from 'rxjs/Observable';

const { NokeMobileLibAndroid } = NativeModules;
const NokeEmitter = new NativeEventEmitter(NokeMobileLibAndroid);

export const onEvent = function (eventName, callback) {
    NokeEmitter.addListener(eventName, callback);
    return this;
};

export const onEventOnce = function (eventName, callback) {
    NokeEmitter.once(eventName, callback);
    return this;
};

export const offEvent = function (eventName, listener) {
    NokeEmitter.removeListener(eventName, listener);
    return this;
};

export const getEventListeners = function (eventName) {
    return NokeEmitter.listeners(eventName);
};

export const fromNokeEvents = () => {
    if (!Observable) {
        return {
            message: 'Missing rxjs',
        };
    }

    const events = [
        'onServiceConnected',
        'onNokeDiscovered',
        'onNokeConnecting',
        'onNokeConnected',
        'onNokeSyncing',
        'onNokeUnlocked',
        'onNokeDisconnected',
        'onNokeShutdown',
        'onBluetoothStatusChanged',
        'onError',
    ];

    let lastEvent = '';

    return Observable.create(observer => {
        onEvent('onServiceConnected', data => {
            observer.next({
                name: 'onServiceConnected',
                data,
            });
            lastEvent = 'onServiceConnected';
        });

        onEvent('onNokeDiscovered', data => {
            observer.next({
                name: 'onNokeDiscovered',
                data,
            });
            lastEvent = 'onNokeDiscovered';
        });

        onEvent('onNokeConnecting', data => {
            observer.next({
                name: 'onNokeConnecting',
                data,
            });
            lastEvent = 'onNokeConnecting';
        });

        onEvent('onNokeConnected', data => {
            //clearTimeout(timer)
            if (lastEvent !== 'onNokeUnlocked') {
                observer.next({
                    name: 'onNokeConnected',
                    data,
                });
                lastEvent = 'onNokeConnected';
            }
        });

        onEvent('onNokeSyncing', data => {
            observer.next({
                name: 'onNokeSyncing',
                data,
            });
            lastEvent = 'onNokeSyncing';
        });

        onEvent('onNokeUnlocked', data => {
            //clearTimeout(timer)
            observer.next({
                name: 'onNokeUnlocked',
                data,
            });
            lastEvent = 'onNokeUnlocked';
        });

        onEvent('onNokeDisconnected', data => {
            observer.next({
                name: 'onNokeDisconnected',
                data,
            });
            lastEvent = 'onNokeDisconnected';
        });

        onEvent('onNokeShutdown', data => {
            observer.next({
                name: 'onNokeShutdown',
                data,
            });
            lastEvent = 'onNokeShutdown';
        });

        onEvent('onError', data => {
            observer.next({
                name: 'onError',
                data,
            });
            lastEvent = 'onError';
        });
    });
};
