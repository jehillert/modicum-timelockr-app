import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { StackNavigator } from './stack';
import { TestingView, Duration, Settings } from 'ui/screens';
import { AppDrawerContent } from '@components';
import { FAB } from '@components';

const Drawer = createDrawerNavigator();

function AppDrawer() {
    return (
        <>
            <FAB />
            <Drawer.Navigator initialRouteName="TestingView" drawerContent={() => <AppDrawerContent />}>
                {/* <Drawer.Screen name="Home" component={StackNavigator} /> */}
                <Drawer.Screen name="TestingView" component={TestingView} />
                <Drawer.Screen name="Duration" component={Duration} />
                <Drawer.Screen name="Settings" component={Settings} />
            </Drawer.Navigator>
        </>
    );
}

export default AppDrawer;
