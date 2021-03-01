import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

const S = {};

S.SafeAreaView = styled(RNSafeAreaView)`
    padding: 0px 24px;
`;

function SafeAreaView({ children, className }) {
    return <S.SafeAreaView className={className}>{children}</S.SafeAreaView>;
}

export default SafeAreaView;
