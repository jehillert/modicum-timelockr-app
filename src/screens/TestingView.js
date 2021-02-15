import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import { nokeUtils } from '@noke';
import { TestingButtons } from '@components';
import { useNokeEmitter, useNokeService, useNokeServiceListener } from '@hooks';

function TestingView() {
    const serviceConnected = useSelector(state => state?.service?.serviceConnected);
    useEffect(() => {
        if (serviceConnected) {
            // TODO: Get bluetooth delay functions to work as intended
            nokeUtils.setBluetoothDelayDefault(1000);
            nokeUtils.setBluetoothDelayBackgroundDefault(1000);
        }
    }, [serviceConnected]);
    useNokeService();
    useNokeServiceListener();
    useNokeEmitter();

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    nestedScrollEnabled={true}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    {global.HermesInternal == null ? null : (
                        <View style={styles.engine}>
                            <Text style={{ color: "red", backgroundColor: "black" }}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View style={styles.sectionContainer}>
                        <TestingButtons />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.black,
    },
    engine: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    sectionContainer: {
        backgroundColor: Colors.black,
        marginTop: 23,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
});

export default TestingView;
