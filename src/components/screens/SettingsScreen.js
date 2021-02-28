import React, { useState } from 'react';
import styled from 'styled-components/native';

const S = {};

S.SafeAreaView = styled.SafeAreaView`
    flex: 1;
`;

S.SettingsHeader = styled.View`
    height: 100px;
`;

function SettingsScreen({ navigation }) {
    return (
        <S.SafeAreaView>
            <S.SettingsHeader />
            <S.SettingsContainer />
        </S.SafeAreaView>
    );
}

export default SettingsScreen;
