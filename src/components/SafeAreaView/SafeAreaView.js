import React from 'react';
// import { StatusBar } from 'react-native';
import styled from 'styled-components';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

const S = {};

S.SafeAreaView = styled(RNSafeAreaView)`
    background-color: ${props => props.theme.colors.background};
`;

function SafeAreaView({ children, className }) {
    return (
        <S.SafeAreaView>
            {/* <StatusBar translucent={true} /> */}
            {children}
        </S.SafeAreaView>
    );
}

export default SafeAreaView;
