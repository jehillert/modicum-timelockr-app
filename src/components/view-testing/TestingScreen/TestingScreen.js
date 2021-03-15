import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { TestingButtons } from '@view-testing';
import { useNokeService, useEventChannels } from '@hooks';

function TestingScreen() {
    useEventChannels();
    useNokeService();

    return (
        <>
            <ScrollView nestedScrollEnabled={true} contentInsetAdjustmentBehavior="automatic">
                {global.HermesInternal == null ? null : (
                    <View style={styles.engine}>
                        <Text style={{ color: 'red', backgroundColor: 'black' }}>Engine: Hermes</Text>
                    </View>
                )}
                <View style={styles.sectionContainer}>
                    <TestingButtons />
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    engine: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    sectionContainer: {
        marginTop: 23,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
});

export default TestingScreen;
