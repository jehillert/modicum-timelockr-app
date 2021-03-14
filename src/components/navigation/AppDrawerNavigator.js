import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppDrawerContent } from '@components';
import {
    SetTime1ScreenStack,
    SetTime2ScreenStack,
    TestingScreenStack,
    SettingsScreenStack,
} from '@navigation';

const Drawer = createDrawerNavigator();

function AppDrawerNavigator({ initialRouteName = 'SetTime2Screen' }) {
    return (
        <>
            <Drawer.Navigator
                initialRouteName={initialRouteName}
                backBehavior="initialRoute"
                swipeEnabled="false"
                drawerContent={() => <AppDrawerContent />}>
                <Drawer.Screen name="SetTime2ScreenStack" component={SetTime2ScreenStack} />
                <Drawer.Screen name="SetTime1ScreenStack" component={SetTime1ScreenStack} />
                <Drawer.Screen name="TestingScreenStack" component={TestingScreenStack} />
                <Drawer.Screen name="SettingsScreenStack" component={SettingsScreenStack} />
            </Drawer.Navigator>
        </>
    );
}

export default AppDrawerNavigator;
