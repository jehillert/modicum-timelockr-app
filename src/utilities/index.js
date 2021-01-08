import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js';

const methodsToWatch = [
    'getConstants',
    'setBluetoothDelayDefault',
    'setBluetoothDelayBackgroundDefault',
    'setBluetoothScanDuration',
    'startScan',
    'stopScan',
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

const logDivider = () => {
    console.log(`%c———————————————————————————————————————————————————————————————————————————————`, 'color: hotpink');
};

export function initializeBridgeSpyHermes() {
    const spyFunction = msg => {
        if (methodsToWatch.includes(msg)) {
            logDivider();
            console.log(`%ctype%c: %c${msg.type}%c;`, ...colors);
            console.log(`%cmodule%c: %c${msg.module}%c;`, ...colors);
            console.log(`%cmethod%c: %c${msg.method}%c;`, ...colors);
            console.log(`%cargs%c: [%c${String(msg.args).replace(/,/gi, '|')}%c];`, ...colors);
            console.log('%c⧭', 'color: red', msg);
            logDivider();
        }
    };

    MessageQueue.spy(spyFunction);
}

export function initializeBridgeSpy() {
    const spyFunction = ({ method, args }) => {
        if (methodsToWatch.includes(method)) {
            console.log(`BRIDGE: { method: ${method}}, args: ${args} }`);
        }
    };
    MessageQueue.spy(spyFunction);
}
