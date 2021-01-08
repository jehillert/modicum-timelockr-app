/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import styled from 'styled-components';
import Noke, { nokeUtils } from 'noke';
import { useNokeService } from 'hooks';
import { LOCK_MAC_1 } from '@env';

const S = {};

S.View = styled.View`
    margin-bottom: 15px;
`;

S.Button = styled.Button``;

function NokeServiceButtons() {
    useNokeService();

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                // wrapp and add for COARSE
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    {
                        title: 'Timelockr Permissions Request',
                        message: 'Timelockr needs access to your location',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Location Access permission granted');
                } else {
                    console.log('Location Access permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        };

        requestLocationPermission();
    }, []);

    return (
        <>
            <S.View><S.Button title="Add Noke Device" color="#2196F3" onPress={() => nokeUtils.handleAddNokeDevice({ name: 'LOCK 1', mac: LOCK_MAC_1 })} /></S.View>
            <S.View><S.Button title="Start Scanning" color="#ff8000" onPress={() => nokeUtils.handleStartScan()} /></S.View>
            <S.View><S.Button title="Connect Device" color="#ff3421" onPress={() => nokeUtils.handleConnect(LOCK_MAC_1)} /></S.View>
            <S.View><S.Button title="AddNokeOfflineValues" color="darkcyan" onPress={() => nokeUtils.handleAddNokeOfflineValues({ name: 'LOCK 1', mac: LOCK_MAC_1 })} /></S.View>
            <S.View><S.Button title="Connect" color="darkgray" onPress={() => nokeUtils.handleConnect(LOCK_MAC_1 )} /></S.View>
            <S.View><S.Button title="Disconnect" color="darkkhaki" onPress={() => nokeUtils.handleDisconnect(LOCK_MAC_1)} /></S.View>
            <S.View><S.Button title="OfflineUnlock" color="olivedrab" onPress={() => nokeUtils.handleOfflineUnlock(LOCK_MAC_1)} /></S.View>
            <S.View><S.Button title="OnBluetoothStatusChanged" color="darkred" onPress={() => nokeUtils.handleOnBluetoothStatusChanged(1)} /></S.View>
            <S.View><S.Button title="OnError" color="darkgoldenrod" onPress={() => nokeUtils.handleOnError()} /></S.View>
            <S.View><S.Button title="OnNokeShutDown" color="darkorange" onPress={() => nokeUtils.handleOnNokeShutDown()} /></S.View>
            <S.View><S.Button title="RemoveAllNokes" color="darksalmon" onPress={() => nokeUtils.handleRemoveAllNokes()} /></S.View>
            <S.View><S.Button title="RemoveNokeDevice" color="darkorchid" onPress={() => nokeUtils.handleRemoveNokeDevice(LOCK_MAC_1)} /></S.View>
            <S.View><S.Button title="SendCommands" color="darkmagenta" onPress={() => nokeUtils.handleSendCommands(LOCK_MAC_1, command)} /></S.View>
            <S.View><S.Button title="SetBluetoothDelayBackgroundDefault" color="darkslateblue" onPress={() => nokeUtils.handleSetBluetoothDelayBackgroundDefault(1)} /></S.View>
            <S.View><S.Button title="SetBluetoothDelayDefault" color="darkslategrey" onPress={() => nokeUtils.handleSetBluetoothDelayDefault(1)} /></S.View>
            <S.View><S.Button title="SetBluetoothScanDuration" color="darkseagreen" onPress={() => nokeUtils.handleSetBluetoothScanDuration(1)} /></S.View>
            <S.View><S.Button title="StartScan" color="darkolivegreen" onPress={() => nokeUtils.handleStartScan()} /></S.View>
            <S.View><S.Button title="StopScan" color="darkgreen" onPress={() => nokeUtils.handleStopScan()} /></S.View>
        </>
    );
}

export default NokeServiceButtons;
