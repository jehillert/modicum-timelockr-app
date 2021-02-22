import * as React from 'react';
import { DrawerActions } from '@react-navigation/native';

const navigationRef = React.createRef();

function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

function closeDrawer() {
    navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}

function openDrawer() {
    navigationRef.current?.dispatch(DrawerActions.openDrawer());
}

function toggleDrawer() {
    navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

export { navigationRef, navigate, closeDrawer, openDrawer, toggleDrawer };
