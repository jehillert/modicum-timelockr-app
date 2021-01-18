import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import NokeServiceButtons from '../noke/TestingButtons';

function TestingView() {
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
                        <NokeServiceButtons />
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
