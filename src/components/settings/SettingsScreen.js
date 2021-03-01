import React from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from '@components';
import { setThemeModePref } from '@slices';
import {
    LIGHT_THEME_TXT,
    DARK_THEME_TXT,
    THEME_SETTING_TITLE_TXT,
    USE_SYSTEM_DEFAULT_THEME_TXT,
} from './constants';

const S = {};

S.SettingsHeader = styled.View`
    height: 50px;
`;

S.SettingsContainer = styled.View`
    padding: 20px 10px;
    padding-left: 15px;
    background-color: gold;
`;

S.SettingContainer = styled.View`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
`;

S.SettingText = styled.Text``;

S.SettingTitleText = styled(S.SettingText)`
    font-size: 20px;
    font-weight: bold;
`;

S.SettingBodyText = styled(S.SettingText)`
    font-size: 18px;
    padding-top: 8px;
    padding-left: 10px;
`;

S.DarkThemeRadioButton = styled(RadioButton)``;
S.LightThemeRadioButton = styled(RadioButton)``;
S.SystemDefaultThemeRadioButton = styled(RadioButton)``;

function SettingsScreen() {
    const dispatch = useDispatch();
    const themeModePref = useSelector(state => state?.settings?.themeModePref);

    return (
        <SafeAreaView>
            <S.SettingsHeader />
            <S.SettingsContainer>
                <S.SettingTitleText>{THEME_SETTING_TITLE_TXT}</S.SettingTitleText>
                <S.SettingContainer>
                    <S.SettingBodyText>{LIGHT_THEME_TXT}</S.SettingBodyText>
                    <S.LightThemeRadioButton
                        value="light"
                        status={themeModePref === 'light' ? 'checked' : 'unchecked'}
                        onPress={() => dispatch(setThemeModePref('light'))}
                    />
                </S.SettingContainer>
                <S.SettingContainer>
                    <S.SettingBodyText>{DARK_THEME_TXT}</S.SettingBodyText>
                    <S.DarkThemeRadioButton
                        value="dark"
                        status={themeModePref === 'dark' ? 'checked' : 'unchecked'}
                        onPress={() => dispatch(setThemeModePref('dark'))}
                    />
                </S.SettingContainer>
                <S.SettingContainer>
                    <S.SettingBodyText>{USE_SYSTEM_DEFAULT_THEME_TXT}</S.SettingBodyText>
                    <S.SystemDefaultThemeRadioButton
                        value="system"
                        status={themeModePref === 'system' ? 'checked' : 'unchecked'}
                        onPress={() => dispatch(setThemeModePref('system'))}
                    />
                </S.SettingContainer>
            </S.SettingsContainer>
        </SafeAreaView>
    );
}

export default SettingsScreen;
