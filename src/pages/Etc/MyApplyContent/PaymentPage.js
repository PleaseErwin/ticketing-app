import * as React from 'react';
import { StyleSheet, View, Keyboard, Image } from 'react-native';
import { Text, List, Button, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PaymentPage = ({ route }) => {
    const navigation = useNavigation();

    const variables = {
        showId: route.params.item.showid,
        hash: 0
    }

    const onSubmit = (event) => {
        event.preventDefault();
        Keyboard.dismiss();

        console.log("결제 버튼 누름");

        const load = async () => {
            try {
                wallet = await AsyncStorage.getItem('wallet_address');

                const variables = {
                    showId: route.params.item.showid,
                    ticketOwner: wallet
                }
                Axios.post('http://3.37.125.95:3000/payTicket', variables)
                    .then(response => {
                        if (response.data.success) {
                            alert('결제 성공');
                            navigation.replace('MainNavigator');
                            // const save = async () => {// 해시값 저장
                            //     try {
                            //         await AsyncStorage.setItem('hash', response.data.hash);
                            //         navigation.replace('MainStackNavigator');
                            //     } catch (error) {
                            //         console.log(error);
                            //     }
                            // }
                            // save();
                        } else {
                            alert('결제 실패');
                        }
                    })

            } catch (error) {
                console.log(error);
            }
        }
        load();
    }

    return (
        // <View style={styles.container}>
        //     <View style={{ flex: 1 }}></View>
        //     <View style={{ flex: 5 }}>
        //         <Card style={{ height: '50%', marginBottom: 10, justifyContent: 'center' }}>
        //             <Card.Content>
        //                 <Text style={{ textAlign: 'center', marginBottom: 10 }} variant="titleLarge">{route.params.item.showname}</Text>
        //                 <Text style={{ textAlign: 'center' }} variant="bodyLarge">일시 : {route.params.item.showdate}</Text>
        //                 <Text style={{ textAlign: 'center' }} variant="bodyLarge">장소 : {route.params.item.place}</Text>
        //             </Card.Content>
        //         </Card>
        //         <Card style={{ height: '40%', justifyContent: 'center' }}>
        //             <Card.Content>
        //                 <Text style={styles.textStyle} variant="bodyLarge">장당 가격 {route.params.item.ticketPrice}ETH</Text>
        //                 <Divider />
        //                 <Text style={styles.textStyle} variant="bodyLarge">구매 수량 1장</Text>
        //                 <Divider />
        //                 <Text style={styles.textStyle} variant="bodyLarge">총 가격 {route.params.item.ticketPrice}ETH</Text>
        //             </Card.Content>
        //         </Card>
        //     </View>
        //     <View style={{ flex: 2 }}>
        //         <Button mode="outlined" onPress={onSubmit}>결제하기</Button>
        //     </View>
        // </View>
        <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 7 }}>
                <View style={{ flex: 1, margin: 30, padding: 20, borderWidth: 3, borderRadius: 5, borderColor: 'gainsboro' }}>
                    <View style={{ flex: 7, margin: 10, marginTop: 5, padding: 5 }}>
                        <Image style={styles.imageStyle} source={require('../../../../src/assets/Ethereum-Logo.png')}></Image>
                    </View>
                    <Divider bold={true} />
                    <View style={{ flex: 2, margin: 10, marginTop: 15 }}>
                        <Text style={{ textAlign: 'center', marginBottom: 10 }} variant="titleLarge">{route.params.item.showname}</Text>
                        <Text style={{ textAlign: 'center' }} variant="bodyLarge">{route.params.item.ticketPrice}ETH</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 2, marginHorizontal: 30 }}>
                <Button mode="outlined" onPress={onSubmit}>결제하기</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        // margin: 20,
        // padding: 20,
        // textAlign: 'center'
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