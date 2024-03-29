/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SButton } from '@common';
import { MAC_HD1 } from '@env';
import { NokeAndroid } from '@noke';
import { getActiveMac } from '@selectors';
import {
    addDevice,
    connectDevice,
    connectAndUnlock,
    connectAndUnshackle,
    discoverAddDevice,
    removeDevice,
    fetchUnlock,
    fetchUnshackle,
    startScanning,
    stopScanning,
} from '@noke-slices';

const S = {};

S.Text = styled.Text`
    color: ${props => props.theme.notification};
`;

S.View = styled.View`
    margin-bottom: 10px;
    flex-direction: row;
    justify-content: space-around;
`;

S.Button = styled.Button``;

function TestingButtons() {
    const dispatch = useDispatch();
    const mac = useSelector(getActiveMac);
    const email = 'john.hillert@gmail.com';

    return (
        <>
            <S.View>
                <SButton
                    bgColor="dimgrey"
                    onPress={() => dispatch(discoverAddDevice())}>
                    ADD LOCK
                </SButton>
            </S.View>
            <S.View>
                <SButton
                    bgColor="cornflowerblue"
                    onPress={() => dispatch(connectAndUnlock({ mac, email}))}>
                    UNLOCK
                </SButton>
            </S.View>
            <S.View>
                <SButton
                    bgColor="cornflowerblue"
                    onPress={() => dispatch(connectAndUnshackle({ mac, email}))}>
                    UNSHACKLE
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="seagreen" onPress={() => dispatch(startScanning())}>
                    START SCAN
                </SButton>
                <SButton bgColor="#e73535" onPress={() => dispatch(stopScanning())}>
                    STOP SCAN
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="seagreen" onPress={() => dispatch(addDevice())}>
                    ADD DEVICE
                </SButton>
                <SButton bgColor="#e73535" onPress={() => dispatch(removeDevice())}>
                    REMOVE DEVICE
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="hotpink" onPress={() => dispatch(connectDevice())}>
                    CONNECT
                </SButton>
                <SButton bgColor="#e73535" onPress={() => NokeAndroid.disconnect(MAC_HD1)}>
                    DISCONNECT
                </SButton>
            </S.View>
            <S.View>
                <SButton
                    bgColor="#f3cf03"
                    fgColor="black"
                    onPress={() => dispatch(fetchUnlock({ mac, email }))}>
                    UNLOCK
                </SButton>
                <SButton
                    bgColor="#f3cf03"
                    fgColor="black"
                    onPress={() => dispatch(fetchUnshackle({ mac, email }))}>
                    UNSHACKLE
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="dimgrey" onPress={() => NokeAndroid.offlineUnlock(MAC_HD1)}>
                    OFFLINE UNLOCK
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="dimgrey" onPress={() => NokeAndroid.removeAllNokes()}>
                    REMOVE ALL NOKES
                </SButton>
            </S.View>
            <S.View>
                <SButton
                    bgColor="dimgrey"
                    onPress={() => NokeAndroid.addNokeOfflineValues({ name: 'LOCK 1', mac: MAC_HD1 })}>
                    ADD OFFLINE VAL
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="dimgrey" onPress={() => NokeAndroid.setBluetoothDelayBackgroundDefault(1)}>
                    SET DEF BLUETOOTH BACKGROUND DELAY{' '}
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="dimgrey" onPress={() => NokeAndroid.setBluetoothDelayDefault(1)}>
                    SET DEFAULT BLUETOOTH DELAY
                </SButton>
            </S.View>
            <S.View>
                <SButton bgColor="dimgrey" onPress={() => NokeAndroid.setBluetoothScanDuration(1)}>
                    SET BLUETOOTH SCAN DURATION
                </SButton>
            </S.View>
        </>
    );
}

export default TestingButtons;
