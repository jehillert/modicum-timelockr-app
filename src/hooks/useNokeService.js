import { useEffect } from 'react';
import { NokeAndroid } from 'noke';

export function useNokeService() {
    useEffect(() => {
        const initializeNokeService = async () => {
            try {
                const serviceInitialized = await NokeAndroid.initiateNokeService();
                console.log(`serviceInitialized: ${serviceInitialized}`);
            } catch (e) {
                console.error(e);
            }
        };

        initializeNokeService();
    }, []);
}
