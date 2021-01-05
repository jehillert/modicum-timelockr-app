import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js';

const methodsToWatch = ['createCalendarEvent', 'getConstants'];

const colors = [
    'color: orange',
    'color: hotpink',
    'color: white',
    'color: hotpink',
];

const logDivider = () => {
    console.log(
        `%c———————————————————————————————————————————————————————————————————————————————`,
        'color: hotpink',
    );
};

const logMsgObj = msg => {
    console.log('%c⧭', 'color: red', msg);
};

const logType = ({ type }) => {
    console.log(`%ctype%c: %c${type}%c;`, ...colors);
};

const logModule = ({ module }) => {
    console.log(`%cmodule%c: %c${module}%c;`, ...colors);
};

const logMethod = ({ method }) => {
    console.log(`%cmethod%c: %c${method}%c;`, ...colors);
};

const logArgs = ({ args }) => {
    console.log(
        `%cargs%c: [%c${String(args).replace(/,/gi, '|')}%c];`,
        ...colors,
    );
};

export default function initializeBridgeSpy() {
    const spyFunction = msg => {
        const { type = null, method = '', module = '', args = null } = msg;
        if (methodsToWatch.includes(msg.method)) {
            logDivider();
            // logType(msg);
            logModule(msg);
            logMethod(msg);
            logArgs(msg);
            logMsgObj(msg);
            logDivider();
        }
    };

    MessageQueue.spy(spyFunction);
}
