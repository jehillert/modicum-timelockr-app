/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { NokeAndroid, nokeUtils } from 'noke';
import { useNokeEmitter } from 'hooks';
import { MAC_HD1 } from '@env';
import { addNokeDevice, removeNokeDevice } from '../redux/devicesSlice';
import { fetchUnlock } from '../redux/unlockRequestSlice';

const S = {};

S.Text = styled.Text`
    color: red;
`;

S.View = styled.View`
    margin-bottom: 50px;
`;

S.Button = styled.Button``;

function NokeServiceButtons() {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeNokeService = async () => {
            try {
                const granted = nokeUtils.requestLocPermissionAsync();
                if (granted) {
                    const serviceInitialized = await NokeAndroid.initiateNokeService();
                    console.log(`serviceInitialized: ${serviceInitialized}`);
                    console.log(MAC_HD1);
                }
            } catch (e) {
                console.error(e);
            }
        };

        initializeNokeService();
    }, []);

    useNokeEmitter();

    const removeColons = mac => {
        return mac.replace(/(:)/g, '');
    };

    const handleAddNokeDevice = () => {
        const name = removeColons(MAC_HD1);
        dispatch(addNokeDevice({ name, mac: MAC_HD1 }));
    };

    const handleUnlock = () => {
        fetchUnlock()
    };

    return (
        <>
            <S.View>
                <S.Button title="Add Noke Device" color="green" onPress={handleAddNokeDevice} />
                <S.Button title="Remove Noke Device" color="#ff3421" onPress={() => dispatch(removeNokeDevice(MAC_HD1))} />
            </S.View>
            <S.View>
                <S.Button title="Start Scanning" color="#2196F3" onPress={() => nokeUtils.startScan()} />
                <S.Button title="Stop Scanning" color="#ff3421" onPress={() => nokeUtils.stopScan()} />
            </S.View>
            <S.View>
                <S.Button title="Connect Device" color="hotpink" onPress={() => nokeUtils.connect(MAC_HD1)} />
                <S.Button title="Disconnect" color="#ff3421" onPress={() => nokeUtils.disconnect(MAC_HD1)} />
            </S.View>
            <S.View>
                <S.Button title="Unlock Device" color="blue" onPress={handleUnlock} />
            </S.View>
            <S.View><S.Button title="Offline Unlock" color="olivedrab" onPress={() => nokeUtils.offlineUnlock(MAC_HD1)} /></S.View>
            <S.View><S.Button title="Remove All Nokes" color="#ff8000" onPress={() => nokeUtils.removeAllNokes()} /></S.View>
            <S.View><S.Button title="Send Commands" color="darkmagenta" onPress={() => nokeUtils.sendCommands(MAC_HD1, command)} /></S.View>
            <S.View><S.Button title="Add Noke Offline Values" color="darkcyan" onPress={() => nokeUtils.addNokeOfflineValues({ name: 'LOCK 1', mac: MAC_HD1 })} /></S.View>
            <S.View><S.Button title="Set Default Bluetooth Background Delay " color="darkslateblue" onPress={() => nokeUtils.setBluetoothDelayBackgroundDefault(1)} /></S.View>
            <S.View><S.Button title="Set Default Bluetooth Delay" color="darkslategrey" onPress={() => nokeUtils.setBluetoothDelayDefault(1)} /></S.View>
            <S.View><S.Button title="Set Bluetooth Scan Duration" color="darkseagreen" onPress={() => nokeUtils.setBluetoothScanDuration(1)} /></S.View>
        </>
    );
}

export default NokeServiceButtons;
