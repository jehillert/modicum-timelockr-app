import React from 'react';
import styled from 'styled-components';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { RootNavigation } from '@navigators';

// import { FlaskSvgIcon, GearSvgIcon, PadlockSvgIcon } from '@assets';
// import { FlaskSvgIcon } from '../../../../assets/flask.png';

const S = {};

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

S.DrawerContentContainer = styled.View``;

S.DrawerSection = styled(Drawer.Section)``;

S.DrawerItem = styled(DrawerItem)`
    margin-left: 30px;
`;

function DrawerContent(props) {
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
                            onPress={() => RootNavigation.navigate('Testing Screen')}
                            activeTintColor="#65eab9"
                            inactiveTintColor="papayawhip"
                            activeBackgroundColor="darkblue"
                            // inactiveBackgroundColor="green"
                        />
                        <S.DrawerItem
                            // icon={() => FlaskSvgIcon}
                            label="Set Lockout (DTP)"
                            onPress={() => RootNavigation.navigate('Date Screen')}
                            activeTintColor="#65eab9"
                            inactiveTintColor="papayawhip"
                            activeBackgroundColor="darkblue"
                            // inactiveBackgroundColor="green"
                        />
                        <S.DrawerItem
                            label="Set Lockout (JEH)"
                            onPress={() => RootNavigation.navigate('Duration Screen')}
                            activeTintColor="#65eab9"
                            inactiveTintColor="papayawhip"
                            activeBackgroundColor="darkblue"
                            // inactiveBackgroundColor="green"
                        />
                        <S.DrawerItem
                            label="Settings"
                            onPress={() => RootNavigation.navigate('Settings Screen')}
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

export default DrawerContent;
