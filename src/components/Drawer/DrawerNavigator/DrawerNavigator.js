import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '@drawer';
import {
    DateScreenStack,
    DurationScreenStack,
    TestingScreenStack,
    SettingsScreenStack,
} from '@navigation';

const Drawer = createDrawerNavigator();

function DrawerNavigator({ initialRouteName = 'DurationScreen' }) {
    return (
        <>
            <Drawer.Navigator
                initialRouteName={initialRouteName}
                backBehavior="initialRoute"
                swipeEnabled="false"
                drawerContent={() => <DrawerContent />}>
                <Drawer.Screen name="DurationScreenStack" component={DurationScreenStack} />
                <Drawer.Screen name="DateScreenStack" component={DateScreenStack} />
                <Drawer.Screen name="TestingScreenStack" component={TestingScreenStack} />
                <Drawer.Screen name="SettingsScreenStack" component={SettingsScreenStack} />
            </Drawer.Navigator>
        </>
    );
}

export default DrawerNavigator;
