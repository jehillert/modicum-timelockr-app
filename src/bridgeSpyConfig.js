import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js';

const methodsToWatch = ['createCalendarEvent', 'getConstants'];

// {
//     type: int (0=N->JS | 1=JS->N)
//     method: string,
//     module: string,
//     args: object,
// }

export default function initializeBridgeSpy() {
    const spyFunction = msg => {
        if (methodsToWatch.includes(msg.method)) {
            console.log(msg);
        }
    };

    MessageQueue.spy(spyFunction);
}
