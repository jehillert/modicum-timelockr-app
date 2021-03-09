import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

function NavigationDrawerStructure(props) {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => toggleDrawer()}>
                <Image
                    source={{
                        uri:
                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
                    }}
                    style={{ width: 30, height: 30, marginLeft: 25 }}
                />
            </TouchableOpacity>
        </View>
    );
}

export default NavigationDrawerStructure;
