import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import { Header, Colors } from 'react-native/Libraries/NewAppScreen';
import NokeServiceButtons from '../components/TestingButtons';

function TestingView() {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    nestedScrollEnabled={true}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Header />
                    {global.HermesInternal == null ? null : (
                        <View style={styles.engine}>
                            <Text style={styles.footer}>Engine: Hermes</Text>
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
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    sectionContainer: {
        backgroundColor: Colors.black,
        marginTop: 32,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
});

export default TestingView;
