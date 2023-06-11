import * as React from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
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
                    setForm({});

                    const save = async () => {
                        try {
                            await AsyncStorage.setItem('user_id', form.id);
                            await AsyncStorage.setItem('token', response.data.token);
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
            <Text variant="titleLarge" style={[styles.content, { textAlign: 'center'}]}>로그인</Text>
            <TextInput
                style={styles.content}
                label="Id"
                value={form.id}
                onChangeText={changeText('id')}
            />
            <TextInput
                theme={{ roundness: 10 }}// 둥글게?
                style={styles.content}
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
        margin: 30
    },
    content: {
        margin: 10
    }
});

export default Login;