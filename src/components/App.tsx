// NOTE: Instructions for iOS vector icons https://github.com/oblador/react-native-vector-icons#ios
// NOTE: react-native-safe-area-view is req it seems (for SafeAreaView)
// NOTE: have a better radio button.  whole row colored, or something.
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@store'
import { AppNavigator } from '@navigators'
import { ThemeWrapper } from '@theme'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeWrapper>
                    <AppNavigator />
                </ThemeWrapper>
            </PersistGate>
        </Provider>
    )
}

export default App
