import React, { useEffect, useState } from 'react';
import { Button, NativeModules, PermissionsAndroid } from 'react-native';
const { NokeMobileLibAndroid } = NativeModules;
// import { Observable } from 'rxjs/Observable';

// NokeMobileLibAndroid.initiateNokeService();

function NokeServiceButtons() {
    const {
        NOKE_LOCK_STATE_UNKNOWN,
        NOKE_LOCK_STATE_UNLOCKED,
        NOKE_LOCK_STATE_UNSHACKLED,
        NOKE_LOCK_STATE_LOCKED,
        NOKE_HW_TYPE_1ST_GEN_PADLOCK,
        NOKE_HW_TYPE_2ND_GEN_PADLOCK,
        NOKE_HW_TYPE_ULOCK,
        NOKE_HW_TYPE_HD_LOCK,
        NOKE_HW_TYPE_DOOR_CONTROLLER,
        NOKE_HW_TYPE_PB12,
        NOKE_LIBRARY_SANDBOX,
        NOKE_LIBRARY_PRODUCTION,
        NOKE_LIBRARY_DEVELOP,
        NOKE_LIBRARY_OPEN,
    } = NokeMobileLibAndroid.getConstants();

    const [lockStateUnknown, setLockStateUnknown] = useState(NOKE_LOCK_STATE_UNKNOWN);
    const [lockStateUnlocked, setLockStateUnlocked] = useState(NOKE_LOCK_STATE_UNLOCKED);
    const [lockStateUnshackled, setLockStateUnshackled] = useState(NOKE_LOCK_STATE_UNSHACKLED);
    const [lockStateLocked, setLockStateLocked] = useState(NOKE_LOCK_STATE_LOCKED);
    const [hwT1stGenPadlock, setHwT1stGenPadlock] = useState(NOKE_HW_TYPE_1ST_GEN_PADLOCK);
    const [hwT2ndGenPadlock, setHwT2ndGenPadlock] = useState(NOKE_HW_TYPE_2ND_GEN_PADLOCK);
    const [hwTulock, setHwTulock] = useState(NOKE_HW_TYPE_ULOCK);
    const [hwThdLock, setHwThdLock] = useState(NOKE_HW_TYPE_HD_LOCK);
    const [hwTdoorController, setHwTdoorController] = useState(NOKE_HW_TYPE_DOOR_CONTROLLER);
    const [hwTpb12, setHwTpb12] = useState(NOKE_HW_TYPE_PB12);
    const [librarySandbox, setLibrarySandbox] = useState(NOKE_LIBRARY_SANDBOX);
    const [libraryProduction, setLibraryProduction] = useState(NOKE_LIBRARY_PRODUCTION);
    const [libraryDevelop, setLibraryDevelop] = useState(NOKE_LIBRARY_DEVELOP);
    const [libraryOpen, setLibraryOpen] = useState(NOKE_LIBRARY_OPEN);


    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
                id={lockStateUnknown}
                title="lockStateUnknown"
                onPress={handleOnPress(lockStateUnknown)}
                data-user="🟧🟧🟧🟧"
            />
        </>
    );
}

export default NokeServiceButtons;
