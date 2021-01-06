import { useEffect } from 'react';
import { NativeModules } from 'react-native';

const { NokeAndroidMobileLibrary } = NativeModules;

export function useNokeService() {
    useEffect(() => {
        const initializeNokeService = async () => {
            try {
                const serviceInitialized = await NokeAndroidMobileLibrary.initiateNokeService();
                console.log(`serviceInitialized: ${serviceInitialized}`);
            } catch (e) {
                console.error(e);
            }
        };

        initializeNokeService();
    }, []);
}
