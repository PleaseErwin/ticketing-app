import * as React from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

const Membership = () => {
    const navigation = useNavigation();

    const [form, setForm] = React.useState({
        id: '',
        password: '',
        email: '',
        //walletAdress: ''
    });
    const changeText = (name) => (value) => {
        setForm({ ...form, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        Keyboard.dismiss();

        const variables = {
            id: form.id,
            password: form.password,
            email: form.email,
            //walletAdress: form.walletAdress
        }
        console.log(variables);

        Axios.post('http://3.37.125.95:3000/users/register', variables)
            .then(response => {
                if (response.data.success) {
                    alert('회원가입 성공');
                    console.log(response.data.message);
                    setForm({});
                    navigation.pop();
                } else {
                    alert('회원가입 실패');
                }
            })
    }


    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={[styles.content, { textAlign: 'center'}]}>회원가입</Text>
            <TextInput
                style={styles.content}
                label="Id"
                value={form.id}
                onChangeText={changeText('id')}
            />
            <TextInput
                style={styles.content}
                label="Password"
                value={form.password}
                onChangeText={changeText('password')}
            />
            <TextInput
                style={styles.content}
                label="Email"
                value={form.email}
                onChangeText={changeText('email')}
            />
            <TextInput
                style={styles.content}
                label="walletAdress"
                value={form.walletAdress}
                onChangeText={changeText('walletAdress')}
            />
            <Button style={styles.content} mode="contained-tonal" onPress={onSubmit}>
                회원가입
            </Button>
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

export default Membership;