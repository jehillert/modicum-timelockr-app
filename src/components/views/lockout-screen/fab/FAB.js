import * as React from 'react';
import styled from 'styled-components';
import { Portal, FAB as ReactNativePaperFab } from 'react-native-paper';
import { RootNavigation } from '@navigators';

const S = {};

S.FAB = styled(ReactNativePaperFab)`
    position: absolute;
    margin: 16px;
    right: 25px;
    bottom: 25px;
`;

function FAB() {
    return (
        <Portal>
            <S.FAB visible={true} large icon="plus" onPress={() => RootNavigation.toggleDrawer()} />
        </Portal>
    );
}

export default FAB;
