import * as React from 'react';
import { DrawerActions } from '@react-navigation/native';

const navigationRef = React.createRef();

const RootNavigation = {
    navigationRef,
    navigate(name, params) {
        navigationRef.current?.navigate(name, params);
    },
    jumpTo(screenName) {
        navigationRef.current?.jumpTo(screenName);
    },
    closeDrawer() {
        navigationRef.current?.dispatch(DrawerActions.closeDrawer());
    },
    openDrawer() {
        navigationRef.current?.dispatch(DrawerActions.openDrawer());
    },
    toggleDrawer() {
        navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
    },
};

export default RootNavigation;
