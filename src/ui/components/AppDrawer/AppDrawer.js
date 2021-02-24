import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TestingView, Duration, Settings } from '@screens';
import { FAB, AppDrawerContent } from '@components';

const Drawer = createDrawerNavigator();

function AppDrawer() {
    return (
        <>
            <FAB />
            <Drawer.Navigator
                initialRouteName="TestingView"
                backBehavior="initialRoute"
                drawerContent={() => <AppDrawerContent />}>
                <Drawer.Screen name="TestingView" component={TestingView} />
                <Drawer.Screen name="Duration" component={Duration} />
                <Drawer.Screen name="Settings" component={Settings} />
            </Drawer.Navigator>
        </>
    );
}

export default AppDrawer;
