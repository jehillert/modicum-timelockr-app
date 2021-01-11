/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NokeAndroid, nokeUtils } from 'noke';
import { useNokeService, useRequestUnlock, usePermissionsRequest, useNokeEmitter } from 'hooks';
import { MAC_ADDRESS_1 } from '@env';

const S = {};

S.Text = styled.Text`
    color: red;
`;

S.View = styled.View`
    margin-bottom: 15px;
`;

S.Button = styled.Button``;

function NokeServiceButtons() {

    // useNokeService();
    // usePermissionsRequest(['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION']);
    // useRequestUnlock();
    useEffect(() => {
        const initializeNokeService = async () => {
            try {
                const results = nokeUtils.requestLocPermissionAsync();
                const serviceInitialized = await NokeAndroid.initiateNokeService();
                console.log(`serviceInitialized: ${serviceInitialized}`);
            } catch (e) {
                console.error(e);
            }
        };

        initializeNokeService();
    }, []);

    useNokeEmitter();
    return (
        <>
            {/* <S.View><S.Text>Bluetooth Status: {btStatus}</S.Text></S.View> */}
            <S.View><S.Button title="Add Noke Device" color="#2196F3" onPress={() => nokeUtils.addNokeDevice({ name: 'D0:07:69:1B:8A:3A', mac: 'D0:07:69:1B:8A:3A' })} /></S.View>
            <S.View><S.Button title="Start Scanning" color="#ff8000" onPress={() => nokeUtils.startScan()} /></S.View>
            <S.View><S.Button title="Stop Scanning" color="#ff3421" onPress={() => nokeUtils.stopScan()} /></S.View>
            <S.View><S.Button title="Connect Device" color="green" onPress={() => nokeUtils.connect('D0:07:69:1B:8A:3A')} /></S.View>
            <S.View><S.Button title="Connect Device" color="green" onPress={() => nokeUtils.connect('D6:B1:8B:99:A7:D3')} /></S.View>
            <S.View><S.Button title="Connect Device" color="green" onPress={() => nokeUtils.connect('EA:EC:51:08:21:CF')} /></S.View>
            <S.View><S.Button title="Disconnect" color="darkkhaki" onPress={() => nokeUtils.disconnect(MAC_ADDRESS_1)} /></S.View>
            <S.View><S.Button title="Offline Unlock" color="olivedrab" onPress={() => nokeUtils.offlineUnlock(MAC_ADDRESS_1)} /></S.View>
            <S.View><S.Button title="Remove All Nokes" color="darksalmon" onPress={() => nokeUtils.removeAllNokes()} /></S.View>
            <S.View><S.Button title="Remove Noke Device" color="darkorchid" onPress={() => nokeUtils.removeNokeDevice(MAC_ADDRESS_1)} /></S.View>
            <S.View><S.Button title="Send Commands" color="darkmagenta" onPress={() => nokeUtils.sendCommands(MAC_ADDRESS_1, command)} /></S.View>
            <S.View><S.Button title="Add Noke Offline Values" color="darkcyan" onPress={() => nokeUtils.addNokeOfflineValues({ name: 'LOCK 1', mac: MAC_ADDRESS_1 })} /></S.View>
            <S.View><S.Button title="Set Default Bluetooth Background Delay " color="darkslateblue" onPress={() => nokeUtils.setBluetoothDelayBackgroundDefault(1)} /></S.View>
            <S.View><S.Button title="Set Default Bluetooth Delay" color="darkslategrey" onPress={() => nokeUtils.setBluetoothDelayDefault(1)} /></S.View>
            <S.View><S.Button title="Set Bluetooth Scan Duration" color="darkseagreen" onPress={() => nokeUtils.setBluetoothScanDuration(1)} /></S.View>
        </>
    );
}

export default NokeServiceButtons;
