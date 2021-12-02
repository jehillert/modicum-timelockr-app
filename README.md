# Modicum Timelockr

### WHAT DOES THIS APP DO

This is a mobile app built with React Native to control a Noke Smart Lock. The app uses redux, redux saga, and an Android native module to access the [Nokē Mobile Library for Android](https://github.com/noke-inc/noke-mobile-library-android) and control the lock. Unlock codes are retrieved from Noke's ACaaS backend using the [Nokē Core API](https://github.com/noke-inc/noke-core-api-documentation). The app is a work in progress and the intended use cases for the lock have not yet been implemented.

### Demo Clips

-   This [video](https://www.dropbox.com/s/z5hns2s5kc7vlax/react-native-app%20---%20bluetooth%20functionality%2C%20redux%2C%20redux%20saga.mp4?dl=0) showing app managing Noke Smart Lock via BLE. <br>
-   This [video](https://www.dropbox.com/s/ap7f8uqhvmnnl0b/react-native-app%20---%20preliminary%20UI%20work.mp4?dl=0) showing preliminary UI work (app is a work in progress)

### CODE SAMPLES

The following are links to exemplary code in this repo.

#### Redux/API Integration

-   [noke-sagas.js](https://www.dropbox.com/s/sfqfzjlmumzyce5/noke-sagas.js?dl=0)
-   [noke-channel-sagas.js](https://www.dropbox.com/s/1s4ajqdth2a0t2v/noke-channel-sagas.js?dl=0)
-   [coreApiSlice.js](https://www.dropbox.com/s/9q3465jpcbvjhds/coreApiSlice.js?dl=0)
-   [devicesSlice.js](https://www.dropbox.com/s/akydpc67sfglce5/devicesSlice.js?dl=0)
-   [serviceSlice.js](https://www.dropbox.com/s/tyx86jzziegv0h4/serviceSlice.js?dl=0)
-   [noke-api.js](https://www.dropbox.com/s/lmfafd0gy8s1he7/noke-api.js?dl=0)

#### UI/UX

-   [AppDrawer.js](https://www.dropbox.com/s/2rfvbouwvt2b3wf/AppDrawer.js?dl=0)
-   [AppDrawerContent.js](https://www.dropbox.com/s/lj6wzepvkz04fdz/AppDrawerContent.js?dl=0)
-   [TestingButtons.js](https://www.dropbox.com/s/427ufmbqut9dkht/TestingButtons.js?dl=0)
-   [SButton.js](https://www.dropbox.com/s/9e9wso036j1r6aq/SButton.js?dl=0)
