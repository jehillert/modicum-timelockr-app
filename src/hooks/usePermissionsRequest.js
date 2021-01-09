import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';

function usePermissionsRequest(permissions) {
    useEffect(() => {
        const requestLocationPermission = async () => {
            const isReqMult = Array.isArray(permissions);

            try {
                if (isReqMult) {
                    const multPermissions = permissions.map(permission => PermissionsAndroid.PERMISSIONS[permission]);
                    const results = await PermissionsAndroid.requestMultiple(multPermissions);
                    console.log(JSON.stringify(results, undefined, 2));
                }
            } catch (err) {
                console.warn(err);
            }
        };

        requestLocationPermission();
    }, []);
}

export default usePermissionsRequest;
