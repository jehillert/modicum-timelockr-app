import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@store';
import { AppNavigator } from '@navigators';
import { ThemeWrapper } from '@theme';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeWrapper>
                    <AppNavigator />
                </ThemeWrapper>
            </PersistGate>
        </Provider>
    );
};

export default App;

// TODO: Change how you access permissions. type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';
// NOTE: Instructions for adding permissions to pod files for ios: https://www.npmjs.com/package/react-native-permissions?activeTab=versions
// NOTE: Instructions for iOS vector icons https://github.com/oblador/react-native-vector-icons#ios
// NOTE: react-native-safe-area-view is req it seems (for SafeAreaView)
// NOTE: have a better radio button.  whole row colored, or something.
// TODO: Get rid of your time pickers and use react-native-paper-dates
// or @react-native-community/datetimepicker
// https://www.npmjs.com/package/@react-native-community/datetimepicker
// TO DO: Move drawer nav to right and keep fab where it is but with back arrow. have options at bottom.
