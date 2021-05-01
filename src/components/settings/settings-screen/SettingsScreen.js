// TODO: have a better radio button.  whole row colored, or something.  dot is old
import React from 'react';
import styled from 'styled-components';
import { RadioButton } from 'react-native-paper';
import { SetThemeMode, Settings } from '@settings';

// styling
const S = {};

S.SettingsHeader = styled.View`
    height: 50px;
`;

S.Container = styled.View`
    padding: 24px 24px;
`;

S.DarkThemeRadioButton = styled(RadioButton)``;

S.LightThemeRadioButton = styled(RadioButton)``;

S.SystemDefaultThemeRadioButton = styled(RadioButton)``;

// component
function SettingsScreen() {
    return (
        <S.Container>
            <Settings.Header />
            <SetThemeMode />
        </S.Container>
    );
}

export default SettingsScreen;
