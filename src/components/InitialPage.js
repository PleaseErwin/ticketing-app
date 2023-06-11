import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialPage = ({navigation}) => {

    React.useEffect(() => {
        const load = async () => {
            try {
                value = await AsyncStorage.getItem('user_id');
                navigation.replace(value === null ? 'LoginStackNavigator' : 'MainStackNavigator')
            } catch (error) {
                console.log(error);
            }
        }
        load();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View></View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default InitialPage;