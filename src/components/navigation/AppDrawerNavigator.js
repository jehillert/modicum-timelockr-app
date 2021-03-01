import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TestingScreen, LockoutSetter1, LockoutSetter2, SettingsScreen } from '@screens';
import { AppDrawerContent } from 'components';

const Drawer = createDrawerNavigator();

function AppDrawerNavigator() {
    // const getDrawerScreenHeader = ({ scene }) => {
    //     const { options } = scene.descriptor;
    //     const title =
    //         options.headerTitle !== undefined
    //             ? options.headerTitle
    //             : options.title !== undefined
    //             ? options.title
    //             : scene.route.name;

    //     return (
    //         <MyHeader
    //             title={title}
    //             leftButton={<DrawerToggleButton onPress={scene.descriptor.navigation.toggleDrawer} />}
    //             style={options.headerStyle}
    //         />
    //     );
    // };

    return (
        <>
            <Drawer.Navigator
                initialRouteName="LockoutSetter1"
                backBehavior="initialRoute"
                swipeEnabled="false"
                drawerContent={() => <AppDrawerContent />}>
                <Drawer.Screen name="TestingScreen" component={TestingScreen} />
                <Drawer.Screen name="LockoutSetter1" component={LockoutSetter1} />
                <Drawer.Screen name="LockoutSetter2" component={LockoutSetter2} />
                <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
            </Drawer.Navigator>
        </>
    );
}

export default AppDrawerNavigator;
