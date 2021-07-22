// eslint-disable-next-line import/default
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';

const methodsToWatch = [
    'getConstants',
    'setBluetoothDelayDefault',
    'setBluetoothDelayBackgroundDefault',
    'setBluetoothScanDuration',
    'startScanning',
    'stopScanning',
    'sendCommands',
    'addNokeDevice',
    'addNokeOfflineValues',
    'connect',
    'disconnect',
    'removeAllNokes',
    'removeNokeDevice',
    'offlineUnlock',
];

const colors = ['color: orange', 'color: hotpink', 'color: white', 'color: hotpink'];

export function initializeBridgeSpyHermes() {
    const spyFunction = msg => {
        if (methodsToWatch.includes(msg)) {
            console.log(`%ctype%c: %c${msg.type}%c;`, ...colors);
            console.log(`%cmodule%c: %c${msg.module}%c;`, ...colors);
            console.log(`%cmethod%c: %c${msg.method}%c;`, ...colors);
            console.log(`%cargs%c: [%c${String(msg.args).replace(/,/gi, '|')}%c];`, ...colors);
            console.log('%c⧭', 'color: red', msg);
        }
    };

    MessageQueue.spy(spyFunction);
}

export const getStatusFromEventAction = actionPath => actionPath.replace(/(^.*onNoke)(.*)$/g, 'is$2');

export function initializeBridgeSpy() {
    const spyFunction = msg => {
        if (methodsToWatch.includes(msg.method)) {
            // console.log(`BRIDGE: { method: ${msg.method}}, args: ${msg.args} }`);
            console.log(JSON.stringify(msg, undefined, 2));
        }
    };
    MessageQueue.spy(spyFunction);
}

export function removeColons(mac) {
    return mac.replace(/(:)/g, '');
}

export function isValidMac(mac) {
    const macRegex = /^\w\w(:\w\w){5}$/;
    return macRegex.test(mac);
}

export function throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return fn(...args);
    };
}
