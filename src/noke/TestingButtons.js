/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addNokeDevice, removeNokeDevice, fetchUnlock } from '@noke-state';
import { requestLocPermissionAsync } from '@utilities';
import { NokeAndroid, nokeUtils } from '@noke';
import { useNokeEmitter } from '@hooks';
import { SButton } from '@components';
import { MAC_HD1 } from '@env';

const S = {};

S.Text = styled.Text`
    color: red;
`;

S.View = styled.View`
    margin-bottom: 10px;
    flex-direction: row;
    justify-content: space-around;
`;

S.Button = styled.Button``;

function NokeServiceButtons() {
    const dispatch = useDispatch();
    const activeLockId = useSelector(state => state?.devicesReducer?.activeLockId) || '';
    const mac = useSelector(state => state?.devicesReducer.locks[activeLockId]?.mac) || '';
    const session = useSelector(state => state?.devicesReducer.locks[activeLockId]?.session) || '';
    const email = 'john.hillert@gmail.com';

    useEffect(() => {
        const initializeNokeService = async () => {
            try {
                const granted = requestLocPermissionAsync();
                if (granted) {
                    const serviceInitialized = await NokeAndroid.initiateNokeService();
                    console.log(`serviceInitialized: ${serviceInitialized}`);
                }
            } catch (e) {
                console.error(e);
            }
        };

        initializeNokeService();
    }, []);

    useNokeEmitter();

    return (
        <>
            <S.View>
                <SButton bgColor="#2196F3" onPress={() => nokeUtils.startScan()}>SCAN</SButton>
                <SButton bgColor="#ff3421" onPress={() => nokeUtils.stopScan()}>STOP SCAN</SButton>
            </S.View>
            <S.View>
                <SButton bgColor="green" onPress={() => dispatch(addNokeDevice())}>ADD</SButton>
                <SButton bgColor="#ff3421" onPress={() => dispatch(removeNokeDevice())}>REMOVE</SButton>
            </S.View>
            <S.View>
                <SButton bgColor="hotpink" onPress={() => nokeUtils.connect(mac)}>CONNECT</SButton>
                <SButton bgColor="#ff3421" onPress={() => nokeUtils.disconnect(MAC_HD1)}>DISCONNECT</SButton>
            </S.View>
            <S.View><SButton bgColor="blue" onPress={() => dispatch(fetchUnlock({ mac, session, email }))}>UNLOCK DEVICE</SButton></S.View>
            <S.View><SButton bgColor="olivedrab" onPress={() => nokeUtils.offlineUnlock(MAC_HD1)}>OFFLINE UNLOCK</SButton></S.View>
            <S.View><SButton bgColor="#ff8000" onPress={() => nokeUtils.removeAllNokes()}>REMOVE ALL NOKES</SButton></S.View>
            <S.View><SButton bgColor="darkmagenta" onPress={() => nokeUtils.sendCommands(MAC_HD1, command)}>SEND COMMANDS</SButton></S.View>
            <S.View><SButton bgColor="darkcyan" onPress={() => nokeUtils.addNokeOfflineValues({ name: 'LOCK 1', mac: MAC_HD1 })}>ADD OFFLINE VAL</SButton></S.View>
            <S.View><SButton bgColor="darkslateblue" onPress={() => nokeUtils.setBluetoothDelayBackgroundDefault(1)}>SET DEF BLUETOOTH BACKGROUND DELAY </SButton></S.View>
            <S.View><SButton bgColor="darkslategrey" onPress={() => nokeUtils.setBluetoothDelayDefault(1)}>SET DEFAULT BLUETOOTH DELAY</SButton></S.View>
            <S.View><SButton bgColor="darkseagreen" onPress={() => nokeUtils.setBluetoothScanDuration(1)}>SET BLUETOOTH SCAN DURATION</SButton></S.View>
        </>
    );
}

export default NokeServiceButtons;
