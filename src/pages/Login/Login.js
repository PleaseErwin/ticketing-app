import * as React from 'react';
import { StyleSheet, View, Keyboard, TextInput } from 'react-native';
import { Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

const Login = () => {
    const navigation = useNavigation();

    const [form, setForm] = React.useState({
        id: '',
        password: '',
    });
    const changeText = (name) => (value) => {
        setForm({ ...form, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        Keyboard.dismiss();
        console.log(form);

        const variables = {
            id: form.id,
            password: form.password,
        }

        Axios.post('http://3.37.125.95:3000/users/login', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.message);

                    const save = async () => {
                        try {
                            await AsyncStorage.setItem('user_id', form.id);
                            await AsyncStorage.setItem('token', response.data.token);
                            await AsyncStorage.setItem('wallet_address', response.data.wallet);
                            navigation.replace('MainStackNavigator');
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    save();
                } else {
                    alert('로그인 실패');
                }
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text variant="titleMedium">로그인</Text>
            </View>
            <TextInput
                style={styles.textInput}
                placeholder="Id"
                label="Id"
                value={form.id}
                onChangeText={changeText('id')}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                placeholder="Password"
                label="Password"
                value={form.password}
                onChangeText={changeText('password')}
            />
            <Button style={styles.content} mode="contained-tonal" onPress={onSubmit}>
                로그인
            </Button>
            <Text
                style={[styles.content, { textAlign: 'center'}]}
                onPress={() => navigation.navigate('Membership')}>회원가입</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 30,
    },
    title: {
        alignItems: 'center',
        marginBottom: 30
    },
    content: {
        marginVertical: 10
    },
    textInput: {
        borderWidth: 1,
        height: 40,
        padding: 10,
        borderRadius: 4,
        marginBottom: 10,
        borderColor: '#cccccc'
    }
});

export default Login;