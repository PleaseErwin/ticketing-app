import * as React from 'react';
import { StyleSheet, View, Keyboard, Image, Alert } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PaymentPage = ({ route }) => {
    const navigation = useNavigation();

    const variables = {
        showId: route.params.item.showid,
        hash: 0
    }

    const onSubmit = () => {
        //event.preventDefault();
        Keyboard.dismiss();

        console.log("결제 버튼 누름");

        const load = async () => {
            try {
                wallet = await AsyncStorage.getItem('wallet_address');
                userid = await AsyncStorage.getItem('user_id');

                const variables = {
                    showId: route.params.item.showid,
                    userId: userid,
                    ticketOwner: wallet,
                    numberOfSeats: 1
                }
                Axios.post('http://3.37.125.95:3000/payTicket', variables)
                    .then(response => {
                        if (response.data.success) {
                            // Alert.alert('결제 성공');
                            // navigation.replace('MainNavigator');
                            const loadAlert = async () => {
                                try {
                                    Alert.alert('결제 성공');// 이거 잘 되나? > 안 됨
                                    //navigation.replace('MainStackNavigator');
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                            loadAlert();
                            navigation.replace('MainNavigator');
                        } else {
                            Alert.alert('결제 실패');
                        }
                    })

            } catch (error) {
                console.log(error);
            }
        }
        load();
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 7 }}>
                <View style={{ marginHorizontal: 40 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }} variant="titleLarge">{route.params.item.showname}</Text>
                </View>
                <View style={{ flex: 1, margin: 40, marginTop: 15, marginBottom: 20, padding: 20, borderWidth: 3, borderRadius: 5, borderColor: 'gainsboro' }}>
                    <View style={{ flex: 8, margin: 10, marginTop: 0, padding: 5 }}>
                        <Image style={styles.imageStyle} source={require('../../../../src/assets/Ethereum-Logo.png')}></Image>
                    </View>
                    <Divider bold={true} />
                    <View style={{ flex: 2, margin: 5, marginTop: 20, marginBottom: 0, padding: 10, backgroundColor: 'whitesmoke', borderRadius: 3, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text variant="bodyLarge">가격</Text><Text variant="bodyLarge">{route.params.item.ticketPrice} ETH</Text>
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text variant="bodyLarge">좌석</Text><Text variant="bodyLarge">A3 석</Text>
                        </View> */}
                    </View>
                </View>
            </View>
            <View style={{ flex: 2, marginHorizontal: 40 }}>
                <Button buttonColor='grey' textColor='white' mode="elevated" onPress={() => Alert.alert(
                    '알림',
                    '결제하시겠습니까?',
                    [
                        {
                            text: '아니오',
                            onPress: () => console.log('Cancel Button Pressed'),
                            style: 'cancel',
                        },
                        { text: '예', onPress: onSubmit },
                    ],
                    { cancelable: true },
                )}>결제하기</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',// 양옆 margin이 자동으로 주어지는건가?
        backgroundColor: '#fff'
    },
    imageStyle: {
        width: "100%",
        height: "100%",
    },
    textStyle: {
        textAlign: 'center',
        margin: 10
    }
});

export default PaymentPage;