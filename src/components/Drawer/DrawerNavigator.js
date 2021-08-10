import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DateScreen, DrawerContent, DurationScreen, TestingScreen, SettingsScreen } from '@navigators';

const Drawer = createDrawerNavigator();

function DrawerNavigator({ initialRouteName = 'TestingScreen' }) {
    return (
        <>
            <Drawer.Navigator
                initialRouteName={initialRouteName}
                backBehavior="initialRoute"
                swipeEnabled="false"
                drawerContent={() => <DrawerContent />}>
                <Drawer.Screen name="DurationScreen" component={DurationScreen} />
                <Drawer.Screen name="DateScreen" component={DateScreen} />
                <Drawer.Screen name="TestingScreen" component={TestingScreen} />
                <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
            </Drawer.Navigator>
        </>
    );
}

export default DrawerNavigator;
