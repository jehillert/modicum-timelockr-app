import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Portal, FAB as ReactNativePaperFab } from 'react-native-paper';
import * as RootNavigation from 'components/navigation';

function FAB() {
    return (
        <Portal>
            <ReactNativePaperFab
                visible={true}
                style={styles.fab}
                large
                icon="plus"
                onPress={() => RootNavigation.toggleDrawer()}
            />
        </Portal>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 25,
        bottom: 25,
    },
});

export default FAB;
