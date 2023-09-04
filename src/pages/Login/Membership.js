import * as React from 'react';
import { StyleSheet, View, Keyboard, TextInput } from 'react-native';
import { Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Membership = () => {
    const navigation = useNavigation();

    const [form, setForm] = React.useState({
        phone: '',
        id: '',
        password: '',
        wallet: ''
    });
    const changeText = (name) => (value) => {
        setForm({ ...form, [name]: value });
    };

    const [authCode, setAuthCode] = React.useState("");// 입력하는 코드
    const [sentCode, setSentCode] = React.useState(false);// 코드전송 눌렀는지 여부 > input 생김
    const [checkCode, setCheckCode] = React.useState(false);// 문자인증여부
    const [duplicateId, setduplicateId] = React.useState(false);// id중복여부

    const { control: controlPhone, handleSubmit: handleSubmitPhone, formState: { errors: phoneErrors } } = useForm({
        criteriaMode: "all",
        mode: 'onTouched'
    });
    const { control: controlId, handleSubmit: handleSubmitId, formState: { errors: idErrors } } = useForm({
        criteriaMode: "all",
        mode: 'onTouched'
    });
    const { control: controlPasswordAndWallet, handleSubmit: handleSubmitPasswordAndWallet, formState: { errors: passwordAndWalletErrors } } = useForm({
        criteriaMode: "all",
        mode: 'onTouched'
    });

    const onChangeAuthCodeText = (text) => {
        setAuthCode(text);
    }

    const onCheckCode = (event) => {
        event.preventDefault();
        Keyboard.dismiss();

        const variables = {
            phoneNumber: form.phone,
            inputCode: authCode
        }
        console.log(variables);

        Axios.post('http://3.37.125.95:3000/sens/verify', variables)
            .then(response => {
                if (response.data.success) {
                    alert(response.data.message);
                    //setCheckCode(response.data.confirmed);
                    setCheckCode(true);// 테스트
                } else {
                    alert('문자 인증번호 확인 실패');
                }
            })
    }

    const onRegister = () => {// 최종 회원가입 버튼 이벤트
        Keyboard.dismiss();

        const variables = {
            id: form.id,
            password: form.password,
            phoneNumber: form.phone,
            wallet: form.wallet
        }
        console.log(variables);

        Axios.post('http://3.37.125.95:3000/users/register', variables)
            .then(response => {
                if (response.data.success) {
                    alert('회원가입 성공');
                    navigation.pop();
                } else {
                    alert('회원가입 실패');
                }
            })
    }

    const onPhoneSubmit = (data) => {
        setSentCode(true);
        console.log("data.phoneNumber ", data.phoneNumber);
        setForm({ ...form, ['phone']: data.phoneNumber });
        
        const variables = {
            phoneNumber: data.phoneNumber,
        }

        Axios.post('http://3.37.125.95:3000/sens/test', variables)
            .then(response => {
                if (response.data.success) {
                    alert(response.data.message);
                } else {
                    alert('문자 인증번호 전송 실패');
                }
            })
    }

    // React.useEffect(() => {/// 처음에 바로 실행 안되게
    //     const variables = {
    //         userid: form.id,
    //     }
    //     console.log(variables);

    //     Axios.post('http://3.37.125.95:3000/checkID', variables)
    //         .then(response => {
    //             if (response.data.success) {
    //                 alert(response.data.message);
    //                 setCheckCode(response.data.confirmed)
    //             } else {
    //                 alert('id 중복체크 실패');
    //             }
    //         })
    // }, [form.id]);

    const onIdSubmit = (data) => {
        Keyboard.dismiss();

        console.log("data.userId ", data.userId);
        setForm({ ...form, ['id']: data.userId });

        const variables = {
            userid: data.userId
        }

        Axios.post('http://3.37.125.95:3000/checkID', variables)
            .then(response => {
                if (response.data.success) {
                    alert(response.data.message);
                    setduplicateId(response.data.confirmed)
                } else {
                    alert('id 중복체크 실패');
                }
            })
    }

    const onPasswordAndWalletSubmit = (data) => {
        console.log("data.userPassword ", data.userPassword);
        console.log("data.userWallet ", data.userWallet);

        setForm({ ...form, ['password']: data.userPassword });
        setForm({ ...form, ['wallet']: data.userWallet });
        
        onRegister();
    }

    return (
        // <View style={styles.container}>
        //     <Text variant="titleLarge" style={[styles.content, { textAlign: 'center'}]}>회원가입</Text>
        //     <TextInput
        //         style={styles.content}
        //         label="Id"
        //         value={form.id}
        //         onChangeText={changeText('id')}
        //     />
        //     <TextInput
        //         style={styles.content}
        //         label="Password"
        //         value={form.password}
        //         onChangeText={changeText('password')}
        //     />
        //     <TextInput
        //         style={styles.content}
        //         label="Email"
        //         value={form.email}
        //         onChangeText={changeText('email')}
        //     />
        //     <Button style={styles.content} mode="contained-tonal" onPress={onSubmit}>
        //         회원가입
        //     </Button>
        // </View>

        <View style={styles.appContainer}>
            <View style={styles.title}>
                <Text variant="titleMedium">회원가입</Text>
            </View>
            <Text style={styles.label}>전화번호 인증</Text>
            <View style={styles.checkContainer}>
                <Controller
                    control={controlPhone}
                    rules={{
                        required: '⚠️ 빈 칸으로 둘 수 없습니다.',
                        minLength: {
                            value: 11,
                            message: "⚠️ 11자리 숫자여야 합니다."
                        },
                        maxLength: {
                            value: 11,
                            message: "⚠️ 11자리 숫자여야 합니다."
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.checkTextInput}
                            placeholder="010xxxxxxxx"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType='numeric'
                        />
                    )}
                    name="phoneNumber"
                />
                <View style={styles.checkButton}>
                    <Button title="Submit" mode="contained-tonal" onPress={handleSubmitPhone(onPhoneSubmit)}>
                        문자 전송
                    </Button>
                </View>
                {/* {phoneErrors.phoneNumber ? <View style={styles.checkButton}>
                    <Button disabled title="Submit" mode="contained-tonal" onPress={handleSubmitPhone(onPhoneSubmit)}>
                        문자 전송
                    </Button>
                </View> : <View style={styles.checkButton}>
                    <Button title="Submit" mode="contained-tonal" onPress={handleSubmitPhone(onPhoneSubmit)}>
                        문자 전송
                    </Button>
                </View>} */}
            </View>
            <ErrorMessage
                errors={phoneErrors}
                name="phoneNumber"
                render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <Text style={styles.errorText} key={type}>{message}</Text>
                    ))
                }
            />
            <View style={styles.checkContainer}>
                {sentCode && <TextInput
                    style={styles.checkTextInput}
                    placeholder="코드 입력"
                    //onBlur={onBlur}
                    onChangeText={onChangeAuthCodeText}
                    value={authCode}
                    //keyboardType='numeric'
                />}
                {sentCode && <View style={styles.checkButton}>
                    <Button title="Submit" mode="contained-tonal" onPress={onCheckCode}>
                        코드 확인
                    </Button>
                </View>}
            </View>

            <Text style={styles.label}>아이디</Text>
            <View style={styles.checkContainer}>
                <Controller
                    control={controlId}
                    rules={{
                        required: '⚠️ 빈 칸으로 둘 수 없습니다.',
                        minLength: {
                            value: 6,
                            message: "⚠️ 최소 6글자 이상이어야 합니다."
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.checkTextInput}
                            placeholder="Id"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="userId"
                />
                <View style={styles.checkButton}>
                    <Button title="Submit" mode="contained-tonal" onPress={handleSubmitId(onIdSubmit)}>
                        id 중복체크
                    </Button>
                </View>
            </View>
            <ErrorMessage
                errors={idErrors}
                name="userId"
                render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <Text style={styles.errorText} key={type}>{message}</Text>
                    ))
                }
            />
            {/* {!(errors.userId) && <Text>성공</Text>} */}

            <Text style={styles.label}>비밀번호</Text>
            <Controller
                control={controlPasswordAndWallet}
                rules={{
                    required: '⚠️ 빈 칸으로 둘 수 없습니다.',
                    minLength: {
                        value: 5,
                        message: "⚠️ 최소 5글자 이상이어야 합니다."
                    }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="userPassword"
            />
            <ErrorMessage
                errors={passwordAndWalletErrors}
                name="userPassword"
                render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <Text style={styles.errorText} key={type}>{message}</Text>
                    ))
                }
            />

            <Text style={styles.label}>지갑 주소</Text>
            <Controller
                control={controlPasswordAndWallet}
                rules={{
                    required: '⚠️ 빈 칸으로 둘 수 없습니다.',
                    minLength: {
                        value: 10,
                        message: "⚠️ 최소 10글자 이상이어야 합니다."
                    }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.textInput}
                        placeholder="Wallet Adress"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="userWallet"
            />
            <ErrorMessage
                errors={passwordAndWalletErrors}
                name="userWallet"
                render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <Text style={styles.errorText} key={type}>{message}</Text>
                    ))
                }
            />

            <View style={styles.button}>
                {checkCode && duplicateId && !phoneErrors.phoneNumber && !idErrors.userId && !passwordAndWalletErrors.userPassword && !passwordAndWalletErrors.userWallet ?
                    <Button title="Submit" mode="contained-tonal" onPress={handleSubmitPasswordAndWallet(onPasswordAndWalletSubmit)}>
                        회원가입
                    </Button> :
                    <Button disabled title="Submit" mode="contained-tonal">
                        회원가입
                    </Button>}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 30
    },
    checkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        alignItems: 'center',
        marginBottom: 10
    },
    label: {
        margin: 10,
        marginLeft: 0,
        marginTop: 20
    },
    errorText: {
        color: 'red'
    },
    textInput: {
        //borderColor: "black",
        borderWidth: 1,
        height: 40,
        padding: 10,
        borderRadius: 4,
        marginBottom: 10,
        borderColor: '#cccccc'
    },
    checkTextInput: {
        //borderColor: "black",
        width: '60%',
        borderWidth: 1,
        height: 40,
        padding: 10,
        borderRadius: 4,
        marginBottom: 10,
        borderColor: '#cccccc'
    },
    button: {
        marginTop: 20,
        marginBottom: 50
    },
    checkButton: {
        width: '35%',
        marginBottom: 10
    }
});

export default Membership;