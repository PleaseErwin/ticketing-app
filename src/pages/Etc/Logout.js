import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = () => {
    const navigation = useNavigation();

    const clearAll = async () => {
        try {
            await AsyncStorage.clear();
            navigation.replace('LoginStackNavigator');
            console.log("전부 지우기 성공");
        }
        catch (error) {
            console.log("전부 지우기 실패");
        }
    }
    clearAll();

    return (
    <View></View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Logout;