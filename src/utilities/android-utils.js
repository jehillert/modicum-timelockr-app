import { PermissionsAndroid } from 'react-native';
import { displayName } from '../../app.json';

const BUTTON_NEGATIVE_TXT = 'Deny';
const BUTTON_NEUTRAL_TXT = 'Ask Me Later';
const BUTTON_POSITIVE_TXT = 'Allow';
const PERMISSIONS_REQUEST_MSG = `${displayName} needs access to your`;
const PERMISSIONS_TITLE_TXT = `${displayName} Permissions Request`;

export const requestLocPermissionAsync = async (
    permissions = 'ACCESS_FINE_LOCATION',
    permissionsLabel = 'Location',
    title = PERMISSIONS_TITLE_TXT,
    message = PERMISSIONS_REQUEST_MSG,
    buttonNeutral = BUTTON_NEGATIVE_TXT,
    buttonNegative = BUTTON_NEUTRAL_TXT,
    buttonPositive = BUTTON_POSITIVE_TXT,
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
            // return (
            //     results['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
            //     results['android.permission.ACCESS_COARSE_LOCATION'] === 'granted'
            // );
            return results;
        }
    } catch (err) {
        console.warn(err);
    }
};

export const requestLocPermissionsAsync = async () =>
    await requestPermissions(['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION']);
