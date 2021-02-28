import React from 'react';
import styled from 'styled-components';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import * as RootNavigation from '@navigation';
// import { FlaskSvgIcon, GearSvgIcon, PadlockSvgIcon } from '@assets';
// import { FlaskSvgIcon } from '../../../../assets/flask.png';

const S = {};

// S.DrawerTop = styled.View`
//     height: 40px;
//     background: black;
// `;

S.DrawerContentScrollView = styled(DrawerContentScrollView)`
    background: #012c36;
`;

S.DrawerContainer = styled.View`
    flex: 1;
`;

S.TitleView = styled.View`
    padding-left: 20px;
    margin-top: 20px;
`;

S.Title = styled.Text`
    font-weight: bold;
    font-size: 24px;
    color: #65eab9;
`;

S.DrawerContentContainer = styled.View`
`;

S.DrawerSection = styled(Drawer.Section)`

`;

S.DrawerItem = styled(DrawerItem)`
    margin-left: 30px;
`;

function AppDrawerContent(props) {
    return (
        <S.DrawerContentScrollView {...props}>
            <S.DrawerContainer>
                {/* <S.DrawerTop /> */}
                <S.TitleView>
                    <S.Title>TimeLockr</S.Title>
                </S.TitleView>
                <S.DrawerContentContainer>
                    <S.DrawerSection>
                        <S.DrawerItem
                            // icon={() => FlaskSvgIcon}
                            label="Testing View"
                            onPress={() => RootNavigation.navigate('TestingScreen')}
                            activeTintColor="#65eab9"
                            inactiveTintColor="papayawhip"
                            activeBackgroundColor="darkblue"
                            // inactiveBackgroundColor="green"
                        />
                        <S.DrawerItem
                            // icon={() => FlaskSvgIcon}
                            label="Set Lockout (DTP)"
                            onPress={() => RootNavigation.navigate('LockoutSetter1')}
                            activeTintColor="#65eab9"
                            inactiveTintColor="papayawhip"
                            activeBackgroundColor="darkblue"
                            // inactiveBackgroundColor="green"
                        />
                        <S.DrawerItem
                            label="Set Lockout (JEH)"
                            onPress={() => RootNavigation.navigate('LockoutSetter2')}
                            activeTintColor="#65eab9"
                            inactiveTintColor="papayawhip"
                            activeBackgroundColor="darkblue"
                            // inactiveBackgroundColor="green"
                        />
                        <S.DrawerItem
                            label="Settings"
                            onPress={() => RootNavigation.navigate('Settings')}
                            activeTintColor="#65eab9"
                            inactiveTintColor="papayawhip"
                            activeBackgroundColor="darkblue"
                            // inactiveBackgroundColor="green"
                        />
                    </S.DrawerSection>
                </S.DrawerContentContainer>
            </S.DrawerContainer>
        </S.DrawerContentScrollView>
    );
}

export default AppDrawerContent;
