import * as React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, Image } from 'react-native';

const S = {};

// Text is styled in '../navigation/StackNavigators.js'
S.DrawerToggleButtonContainer = styled.View`
    flex-direction: row;
`;

function DrawerToggleButton(props) {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (
        <S.DrawerToggleButtonContainer>
            <TouchableOpacity onPress={() => toggleDrawer()}>
                <Image
                    source={{
                        uri:
                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
                    }}
                    style={{ width: 30, height: 30, marginLeft: 25 }}
                />
            </TouchableOpacity>
        </S.DrawerToggleButtonContainer>
    );
}

export default DrawerToggleButton;
