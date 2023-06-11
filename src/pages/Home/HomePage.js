import * as React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import CarouselCards from '../../components/CarouselCards';

const HomePage = () => {

    return (
        <SafeAreaView style={styles.container}>
            <CarouselCards />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        flex: 1
    },
});

export default HomePage;