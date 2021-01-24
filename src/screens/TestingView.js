import React, { useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import { requestLocPermissionAsync } from '@utilities';
import { TestingButtons } from '@components';
import { NokeAndroid } from '@noke';
import { useNokeEmitter } from '@hooks';

function TestingView() {
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
