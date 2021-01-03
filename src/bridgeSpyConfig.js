import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js';

const methodsToWatch = ['createCalendarEvent'];

export default function initializeBridgeSpy() {
    const spyFunction = msg => {
        if (methodsToWatch.includes(msg.method)) {
            console.log(msg);
        }
    };

    MessageQueue.spy(spyFunction);
}
