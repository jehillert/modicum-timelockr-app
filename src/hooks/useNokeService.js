import { useEffect } from 'react';
import { NokeAndroid } from '@noke';
import { requestLocPermissionAsync } from '@utilities';

function useNokeService() {
    useEffect(() => {
        const initializeNokeService = async () => {
            try {
                const granted = requestLocPermissionAsync();
                if (granted) {
                    const serviceInitialized = await NokeAndroid.initiateNokeService();
                    console.log(`serviceInitialized: ${serviceInitialized}`);
                }
            } catch (e) {
                console.error(e);
            }
        };

        initializeNokeService();
    }, []);
}

export default useNokeService;
