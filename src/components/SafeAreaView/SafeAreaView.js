import React from 'react';
import styled from 'styled-components';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

const S = {};

S.SafeAreaView = styled(RNSafeAreaView)`
    padding: 24px 24px;
    background-color: ${props => props.theme.colors.background};
`;

function SafeAreaView({ children, className }) {
    return <S.SafeAreaView>{children}</S.SafeAreaView>;
}

export default SafeAreaView;
