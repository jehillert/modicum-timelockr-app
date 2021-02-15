/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SButton } from '@components';
import { MAC_HD1 } from '@env';
import { nokeUtils } from '@noke';
import {
    addNokeDevice,
    removeNokeDevice,
    fetchUnlock,
    fetchUnshackle,
    startScanning,
    stopScanning,
} from '@noke-state';

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

function TestingButtons() {
    const dispatch = useDispatch();
    const activeLockId = useSelector(state => state?.devices?.activeLockId) || '';
    const mac = useSelector(state => state?.devices.locks[activeLockId]?.mac) || '';
    const session = useSelector(state => state?.devices.locks[activeLockId]?.session) || '';
    const email = 'john.hillert@gmail.com';

    return (
        <>
            <S.View>
                <SButton bgColor="seagreen" onPress={() => dispatch(startScanning())}>
                    SCAN
                </SButton>
                <SButton bgColor="#e73535" onPress={() => dispatch(stopScanning())}>
                    STOP SCAN
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="seagreen" onPress={() => dispatch(addNokeDevice(activeLockId))}>
                    ADD
                </SButton>
                <SButton bgColor="#e73535" onPress={() => dispatch(removeNokeDevice(activeLockId))}>
                    REMOVE
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="hotpink" onPress={() => nokeUtils.connect(mac)}>
                    CONNECT
                </SButton>
                <SButton bgColor="#e73535" onPress={() => nokeUtils.disconnect(MAC_HD1)}>
                    DISCONNECT
                </SButton>
            </S.View>
            <S.View>
                <SButton
                    bgColor="cornflowerblue"
                    /* bgColor="#2196F3" */ onPress={() => dispatch(fetchUnlock({ mac, session, email }))}>
                    UNLOCK
                </SButton>
            </S.View>
            <S.View>
                <SButton
                    bgColor="cornflowerblue"
                    onPress={() => dispatch(fetchUnshackle({ mac, session, email }))}>
                    UNSHACKLE
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="dimgrey" onPress={() => nokeUtils.offlineUnlock(MAC_HD1)}>
                    OFFLINE UNLOCK
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="dimgrey" onPress={() => nokeUtils.removeAllNokes()}>
                    REMOVE ALL NOKES
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="dimgrey" onPress={() => nokeUtils.sendCommands(MAC_HD1, command)}>
                    SEND COMMANDS
                </SButton>
            </S.View>
            <S.View>
                <SButton
                    bgColor="dimgrey"
                    onPress={() => nokeUtils.addNokeOfflineValues({ name: 'LOCK 1', mac: MAC_HD1 })}>
                    ADD OFFLINE VAL
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="dimgrey" onPress={() => nokeUtils.setBluetoothDelayBackgroundDefault(1)}>
                    SET DEF BLUETOOTH BACKGROUND DELAY{' '}
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="dimgrey" onPress={() => nokeUtils.setBluetoothDelayDefault(1)}>
                    SET DEFAULT BLUETOOTH DELAY
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="dimgrey" onPress={() => nokeUtils.setBluetoothScanDuration(1)}>
                    SET BLUETOOTH SCAN DURATION
                </SButton>
            </S.View>
        </>
    );
}

export default TestingButtons;
