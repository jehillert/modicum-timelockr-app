import { useEffect } from 'react';
import { nokeEventUtils, nokeConstants } from '@noke';

// { String _name_, String _mac_, String _session_, Int _battery_, String _hwVersion_ }

function useRequestUnlock() {
    const { offEvent, onEvent } = nokeEventUtils;
    const { onNokeConnected } = nokeConstants.nokeEvents;

    useEffect(() => {
        onEvent(onNokeConnected, event => {
            const { mac, session } = event;
            console.log('%c%s', 'color: #917399', mac);
            console.log('%c%s', 'color: #d90000', session);
        });

        return () => offEvent(onNokeConnected, () => console.log('I came'));
    }, []);
}

export default useRequestUnlock;
