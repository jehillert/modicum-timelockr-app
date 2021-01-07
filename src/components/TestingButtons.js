import React, { useEffect } from 'react';
import { Button, PermissionsAndroid } from 'react-native';
import Noke from 'noke';
import { useNokeService } from 'hooks';
// import { useNokeService, usePermissionsRequest } from '../../hooks';

function NokeServiceButtons() {
    useNokeService();
    // usePermissionsRequest();

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
        const lockData = {
            name: 'LOCK 1',
            mac: 'D0:07:69:1B:8A:3A',
        };
        Noke.addNokeDevice(lockData);
    };

    return (
        <>
            <Button title="Add Noke Device" onPress={handleOnPress()} />
        </>
    );
}

export default NokeServiceButtons;
