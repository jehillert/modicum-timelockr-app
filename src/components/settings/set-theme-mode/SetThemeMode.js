// TODO: have a better radio button.  whole row colored, or something.  dot is old
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RadioButton } from 'react-native-paper';
import { settingsConstants, setThemeModePref, Settings } from '@settings';

// styling
const S = {};

S.DarkThemeRadioButton = styled(RadioButton)``;

S.LightThemeRadioButton = styled(RadioButton)``;

S.SystemDefaultThemeRadioButton = styled(RadioButton)``;

// constants
const {
    LIGHT_THEME_TXT,
    DARK_THEME_TXT,
    THEME_SETTING_TITLE_TXT,
    USE_SYSTEM_DEFAULT_THEME_TXT,
} = settingsConstants;

// component
function SetThemeMode() {
    const dispatch = useDispatch();
    const themeModePref = useSelector(state => state?.settings?.themeModePref);

    return (
        <Settings.Group>
            <Settings.TitleText>{THEME_SETTING_TITLE_TXT}</Settings.TitleText>
            <Settings.Container>
                <Settings.BodyText>{LIGHT_THEME_TXT}</Settings.BodyText>
                <S.LightThemeRadioButton
                    value="light"
                    status={themeModePref === 'light' ? 'checked' : 'unchecked'}
                    onPress={() => dispatch(setThemeModePref('light'))}
                />
            </Settings.Container>
            <Settings.Container>
                <Settings.BodyText>{DARK_THEME_TXT}</Settings.BodyText>
                <S.DarkThemeRadioButton
                    value="dark"
                    status={themeModePref === 'dark' ? 'checked' : 'unchecked'}
                    onPress={() => dispatch(setThemeModePref('dark'))}
                />
            </Settings.Container>
            <Settings.Container>
                <Settings.BodyText>{USE_SYSTEM_DEFAULT_THEME_TXT}</Settings.BodyText>
                <S.SystemDefaultThemeRadioButton
                    value="system"
                    status={themeModePref === 'system' ? 'checked' : 'unchecked'}
                    onPress={() => dispatch(setThemeModePref('system'))}
                />
            </Settings.Container>
        </Settings.Group>
    );
}

export default SetThemeMode;