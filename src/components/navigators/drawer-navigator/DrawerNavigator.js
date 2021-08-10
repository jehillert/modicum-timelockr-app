import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import { SettingsScreen } from '@settings';
import { DateScreen, DurationScreen, TestingScreen } from '@screens';

const Drawer = createDrawerNavigator();

function DrawerNavigator({ initialRouteName = 'Testing Screen' }) {
    return (
        <>
            <Drawer.Navigator
                initialRouteName={initialRouteName}
                backBehavior="initialRoute"
                swipeEnabled="false"
                drawerContent={() => <DrawerContent />}>
                <Drawer.Screen name="Duration Screen" component={DurationScreen} />
                <Drawer.Screen name="Date Screen" component={DateScreen} />
                <Drawer.Screen name="Testing Screen" component={TestingScreen} />
                <Drawer.Screen name="Settings Screen" component={SettingsScreen} />
            </Drawer.Navigator>
        </>
    );
}

export default DrawerNavigator;
