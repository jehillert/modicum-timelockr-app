import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TestingScreen, LockoutSetter1, LockoutSetter2, SettingsScreen } from 'components/screens';
import { FAB, AppDrawerContent } from 'components';

const Drawer = createDrawerNavigator();

function AppDrawer() {
    return (
        <>
            <FAB />
            <Drawer.Navigator
                initialRouteName="LockoutSetter1"
                backBehavior="initialRoute"
                drawerContent={() => <AppDrawerContent />}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#9AC4F8',
                    },
                    headerTintColor: 'white',
                    headerBackTitle: 'Back',
                }}>
                <Drawer.Screen name="TestingScreen" component={TestingScreen} />
                <Drawer.Screen name="LockoutSetter1" component={LockoutSetter1} />
                <Drawer.Screen name="LockoutSetter2" component={LockoutSetter2} />
                <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
            </Drawer.Navigator>
        </>
    );
}

export default AppDrawer;
