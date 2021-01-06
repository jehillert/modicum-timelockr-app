// import { useEffect } from 'react';
// import { PermissionsAndroid } from 'react-native';

// function usePermissionsRequest() {
//     useEffect(() => {
//         const requestLocationPermission = async () => {
//             try {
//                 // wrapp and add for COARSE
//                 const granted = await PermissionsAndroid.request(
//                     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//                     {
//                         title: 'Timelockr Permissions Request',
//                         message: 'Timelockr needs access to your location',
//                         buttonNegative: 'Cancel',
//                         buttonPositive: 'OK',
//                     },
//                 );
//                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                     console.log('Location Access permission granted');
//                 } else {
//                     console.log('Location Access permission denied');
//                 }
//             } catch (err) {
//                 console.warn(err);
//             }
//         };

//         requestLocationPermission();
//     }, []);
// }

// export default usePermissionsRequest;

// import { useEffect } from 'react';
// import { PermissionsAndroid } from 'react-native';
// import {
//     BUTTON_NEGATIVE_TXT,
//     BUTTON_NEUTRAL_TXT,
//     BUTTON_POSITIVETXT,
//     PERMISSIONS_REQUEST_MSG,
//     PERMISSIONS_TITLE_TXT,
// } from './constants';

// function usePermissionsRequest(
//     permissionsRequested,
//     title = PERMISSIONS_TITLE_TXT,
//     message = PERMISSIONS_REQUEST_MSG,
//     buttonNeutral = BUTTON_NEGATIVE_TXT,
//     buttonNegative = BUTTON_NEUTRAL_TXT,
//     buttonPositive = BUTTON_POSITIVETXT,
// ) {
//     useEffect(() => {
//         const permRequested = PermissionsAndroid.PERMISSIONS[permissionsRequested];
//         const permRationale = {
//             title,
//             message,
//             buttonNeutral,
//             buttonNegative,
//             buttonPositive,
//         };

//         const requestLocationPermission = async () => {
//             try {
//                 const granted = await PermissionsAndroid.request(permRequested, permRationale);

//                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                     console.log('Location Access permission granted');
//                 } else {
//                     console.log('Location Access permission denied');
//                 }
//             } catch (err) {
//                 console.warn(err);
//             }
//         };

//         requestLocationPermission();
//     }, []);
// }

// export default usePermissionsRequest;
