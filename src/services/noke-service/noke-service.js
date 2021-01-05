import React, { useEffect } from 'react';
import { Button, NativeModules, PermissionsAndroid } from 'react-native';
const { NokeMobileLibAndroid } = NativeModules;
// import { Observable } from 'rxjs/Observable';

function NokeServiceButtons() {
    useEffect(() => {
        (async () => {
            try {
                const serviceInitialized = await NokeMobileLibAndroid.initiateNokeService();
                console.log(`serviceInitialized: ${serviceInitialized}`);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                // wrapp and add for COARSE
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    {
                        title: 'Timelockr Permissions Request',
                        message: 'Timelockr needs access to your location',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Location Access permission granted');
                } else {
                    console.log('Location Access permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        };
        requestLocationPermission();
    }, []);

    const handleOnPress = () => event => {
        const { NOKE_LOCK_STATE_UNKNOWN } = NokeMobileLibAndroid.getConstants();
        console.log(NOKE_LOCK_STATE_UNKNOWN);
    };

    return (
        <>
            <Button
                title="lockStateUnknown"
                onPress={handleOnPress()}
                data-user="🟧🟧🟧🟧"
            />
        </>
    );
}

export default NokeServiceButtons;
