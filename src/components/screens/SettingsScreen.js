import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const S = {};

S.SafeAreaView = styled(SafeAreaView)`
    flex: 1;
`;

S.SettingsHeader = styled.View`
    height: 100px;
`;

S.SettingsContainer = styled.View`
    height: 100px;
`;

S.SettingsText = styled.Text`
    color: white;
`;

S.DarkThemeSetting = styled.View`
    display: flex;
    justify-content: flex-end;
`;

S.DarkThemeSwitch = styled.Switch``;

function SettingsScreen() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <S.SafeAreaView>
            <S.SettingsHeader />
            <S.SettingsContainer>
                <S.DarkThemeSetting>
                    <S.SettingsText>Enable dark theme</S.SettingsText>
                    <S.DarkThemeSwitch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </S.DarkThemeSetting>
            </S.SettingsContainer>
        </S.SafeAreaView>
    );
}

export default SettingsScreen;
