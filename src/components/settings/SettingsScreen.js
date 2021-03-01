import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { SafeAreaView } from '@components';
import { setIsDarkMode } from '@slices';

const S = {};

S.SettingsHeader = styled.View`
    height: 50px;
`;

S.SettingsContainer = styled.View`
    padding: 8px 0px 10px 10px;
    background-color: gold;
`;

S.SettingContainer = styled.View`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
`;

S.SettingTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    padding: 8px 0px;
`;

S.SettingText = styled.Text`
    font-size: 18px;
`;
S.DarkThemeSwitch = styled.Switch``;
S.LightThemeSwitch = styled.Switch``;
S.SystemDefaultThemeSwitch = styled.Switch``;

function SettingsScreen() {
    const dispatch = useDispatch();
    const isDarkMode = useSelector(state => state?.settings.isDarkMode);

    const toggleSwitch = () => dispatch(setIsDarkMode(!isDarkMode));

    return (
        <SafeAreaView>
            <S.SettingsHeader />
            <S.SettingsContainer>
                <S.SettingTitle>Set Color Theme</S.SettingTitle>
                <S.SettingContainer>
                    <S.SettingText>Light Theme</S.SettingText>
                    <S.LightThemeSwitch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isDarkMode}
                    />
                </S.SettingContainer>
                <S.SettingContainer>
                    <S.SettingText>Dark Theme</S.SettingText>
                    <S.DarkThemeSwitch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isDarkMode}
                    />
                </S.SettingContainer>
                <S.SettingContainer>
                    <S.SettingText>Use System Default</S.SettingText>
                    <S.SystemDefaultThemeSwitch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isDarkMode}
                    />
                </S.SettingContainer>
            </S.SettingsContainer>
        </SafeAreaView>
    );
}

export default SettingsScreen;
