// TODO: have a better radio button.  whole row colored, or something.  dot is old
import React from 'react';
import styled from 'styled-components';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from '@components';
import { Settings } from '@styled';
import SetThemeMode from './SetThemeMode';

const S = {};

S.SettingsHeader = styled.View`
    height: 50px;
`;

S.DarkThemeRadioButton = styled(RadioButton)``;
S.LightThemeRadioButton = styled(RadioButton)``;
S.SystemDefaultThemeRadioButton = styled(RadioButton)``;

function SettingsScreen() {
    return (
        <SafeAreaView>
            <Settings.Header />
            <SetThemeMode />
        </SafeAreaView>
    );
}

export default SettingsScreen;
