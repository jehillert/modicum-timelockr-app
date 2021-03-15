import { PermissionsAndroid } from 'react-native';
import { androidPermissionsConstants as apc } from './constants';

export const requestLocPermissionAsync = async (
    permissions = 'ACCESS_FINE_LOCATION',
    permissionsLabel = 'Location',
    title = apc.PERMISSIONS_TITLE_TXT,
    message = apc.PERMISSIONS_REQUEST_MSG,
    buttonNeutral = apc.BUTTON_NEGATIVE_TXT,
    buttonNegative = apc.BUTTON_NEUTRAL_TXT,
    buttonPositive = apc.BUTTON_POSITIVE_TXT,
) => {
    const isReqMult = Array.isArray(permissions);

    try {
        if (isReqMult) {
            const multPermissions = permissions.map(permission => PermissionsAndroid.PERMISSIONS[permission]);
            const results = await PermissionsAndroid.requestMultiple(multPermissions);
            console.log(JSON.stringify(results, undefined, 2));
        } else {
            const rationale = {
                title: `${title} ${permissionsLabel}`,
                message,
                buttonNeutral,
                buttonNegative,
                buttonPositive,
            };
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS[permissions], rationale);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log(`${permissionsLabel} Access permission granted`);
            } else {
                console.log(`${permissionsLabel} Access permission denied`);
            }
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
    } catch (err) {
        // TODO: Do this error handling correctly
        console.warn(err);
    }
};

export const requestPermissions = async permissions => {
    const isReqMult = Array.isArray(permissions);

    try {
        if (isReqMult) {
            const multPermissions = permissions.map(permission => PermissionsAndroid.PERMISSIONS[permission]);
            const results = await PermissionsAndroid.requestMultiple(multPermissions);
            console.log(JSON.stringify(results, undefined, 2));
            return results;
        }
    } catch (err) {
        console.warn(err);
    }
};

export const requestLocPermissionsAsync = async () =>
    await requestPermissions(['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION']);
