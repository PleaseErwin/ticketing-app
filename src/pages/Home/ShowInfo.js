import * as React from 'react';
import { StyleSheet, View, Image, Keyboard, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import Loading from '../../components/Loading';

import { io } from "socket.io-client";
const socket = io.connect("http://3.37.125.95:3000/");

const ShowInfo = ({ route }) => {
    const navigation = useNavigation();
    const [qrcode, setQrcode] = React.useState("");
    const [isLottery, setIsLottery] = React.useState(0);// 추첨인지 예매인지 / isLottery
    const [onTransaction, setOnTransaction] = React.useState(0);// 양도중인지 아닌지 / status

    React.useEffect(() => {

        setIsLottery(route.params.item.isLottery);
        setOnTransaction(parseInt(route.params.item.status));

        console.log(Object.keys(route.params.item));
        console.log("route.params.item.status", route.params.item.status);
        console.log("route.params.item.isLottery", route.params.item.isLottery);

        const load = async () => {
            try {
                userid = await AsyncStorage.getItem('user_id');

                const variables = {
                    showid: parseInt(route.params.item.showid),
                    userid: userid
                }

                await Axios.post('http://3.37.125.95:3000/users/getQR', variables)
                    .then(response => {
                        if (response.data.success) {
                            console.log('qr코드 불러오기 성공');
                            setQrcode(response.data.url);
                        } else {
                            console.log('qr코드 불러오기 실패');
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
        load();
    }, []);

    const onResell = () => {
        Keyboard.dismiss();

        console.log("양도 버튼 누름");
        setOnTransaction(2);

        const load = async () => {
            try {
                const variables = {
                    bookingId: parseInt(route.params.item.bookingId)
                }

                await Axios.post('http://3.37.125.95:3000/tx/resell', variables)
                    .then(response => {
                        if (response.data.success) {
                            console.log(response.data.message);
                            Alert.alert(
                                '알림',
                                '양도 중으로 변경되었습니다.',
                                [
                                    { text: '확인', onPress: () => {} },
                                ],
                                { cancelable: true },
                            )
                        } else {
                            console.log('티켓 양도 실패');
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
        load();
    }

    const onCancelResell = () => {// 양도 취소
        Keyboard.dismiss();

        console.log("양도 취소 버튼 누름");
        setOnTransaction(0);

        const load = async () => {
            try {
                const variables = {
                    bookingId: parseInt(route.params.item.bookingId)
                }

                await Axios.post('http://3.37.125.95:3000/tx/cancelReselling', variables)
                    .then(response => {
                        if (response.data.success) {
                            console.log(response.data.message);
                            Alert.alert(
                                '알림',
                                '양도 취소되었습니다.',
                                [
                                    { text: '확인', onPress: () => {} },
                                ],
                                { cancelable: true },
                            )
                        } else {
                            console.log('티켓 양도 취소 실패');
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
        load();
    }

    const onCancelLotteryTicket = () => {// 추첨제 티켓 취소
        Keyboard.dismiss();

        console.log("추첨제 티켓 취소 버튼 누름");

        const load = async () => {
            try {
                const variables = {
                    bookingId: parseInt(route.params.item.bookingId),
                }

                await Axios.post('http://3.37.125.95:3000/tx/cancelLotteryTicket', variables)
                    .then(response => {
                        if (response.data.success) {
                            console.log(response.data.message);
                            Alert.alert(
                                '알림',
                                '취소되었습니다.',
                                [
                                    { text: '확인', onPress: () => {} },
                                ],
                                { cancelable: true },
                            )
                        } else {
                            console.log('추첨제 티켓 취소 실패');
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
        load();

        navigation.replace('MainNavigator');
    }

    const onCancelTicket = () => {// 일반 예매 티켓 취소
        Keyboard.dismiss();

        console.log("일반 예매 티켓 취소 버튼 누름");

        const load = async () => {
            try {
                const variables = {
                    showId: route.params.item.showid,
                    bookingId: parseInt(route.params.item.bookingId),
                }

                await socket.emit("unreserveSeat", variables);
                
                Alert.alert(
                    '알림',
                    '취소되었습니다.',
                    [
                        { text: '확인', onPress: () => {} },
                    ],
                    { cancelable: true },
                )
            } catch (error) {
                console.log(error);
            }
        }
        load();

        navigation.replace('MainNavigator');
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
            </View>
            <View style={{ flex: 5, paddingHorizontal: '10%' }}>
                {qrcode ? <Image source={{ uri: qrcode }} style={styles.imageStyle}></Image> : <Loading />}
            </View>
            <Text />
            <Text />
            <View style={{ flex: 4 }}>
                <Text style={{ textAlign: 'center' }} variant="titleLarge">{route.params.item.showname}</Text><Text />
                <Text style={{ textAlign: 'center', marginBottom: 5 }} variant="titleMedium">일시 : {route.params.item.showdate} / {route.params.item.showtime.substring(0, 5)}</Text>
                <Text style={{ textAlign: 'center', marginBottom: 5 }} variant="titleMedium">장소 : {route.params.item.place}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center' }} variant="titleMedium">좌석 : </Text>
                    {route.params.item.reservedSeat.map((seat, i) => {
                        return (
                            <Text key={i} variant="titleMedium">A{seat.seatid}  </Text>
                        );
                    })}
                </View>
            </View>
            <View style={{ flex: 2, marginTop: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                    {onTransaction === 0 ? <Button style={{ marginRight: 10 }} mode="outlined" onPress={() => Alert.alert(
                        '알림',
                        '양도하시겠습니까?',
                        [
                            {
                                text: '아니오',
                                onPress: () => console.log('Cancel Button Pressed'),
                                style: 'cancel',
                            },
                            { text: '예', onPress: onResell },
                        ],
                        { cancelable: true },
                    )}>양도하기</Button> :
                        onTransaction === 2 ? <Button style={{ marginRight: 10 }} mode="outlined" onPress={() => Alert.alert(
                            '알림',
                            '양도를 취소하시겠습니까?',
                            [
                                {
                                    text: '아니오',
                                    onPress: () => console.log('Cancel Button Pressed'),
                                    style: 'cancel',
                                },
                                { text: '예', onPress: onCancelResell },
                            ],
                            { cancelable: true },
                        )}>양도 취소</Button> :
                            onTransaction === 3 ?
                                <Button disabled style={{ marginRight: 10 }} mode="outlined" onPress={() => { }}>양도 불가</Button>
                                : <Button disabled style={{ marginRight: 10 }} mode="outlined" onPress={() => { }}>양도 불가</Button>}


                    {onTransaction === 0 ? (isLottery === 0 ?
                        <Button mode="outlined" onPress={() => Alert.alert(
                            '알림',
                            '취소하시겠습니까?',
                            [
                                {
                                    text: '아니오',
                                    onPress: () => console.log('Cancel Button Pressed'),
                                    style: 'cancel',
                                },
                                { text: '예', onPress: onCancelTicket },
                            ],
                            { cancelable: true },
                        )}>취소하기</Button> :
                        <Button mode="outlined" onPress={() => Alert.alert(
                            '알림',
                            '취소하시겠습니까?',
                            [
                                {
                                    text: '아니오',
                                    onPress: () => console.log('Cancel Button Pressed'),
                                    style: 'cancel',
                                },
                                { text: '예', onPress: onCancelLotteryTicket },
                            ],
                            { cancelable: true },
                        )}>취소하기</Button>) :
                        <Button disabled mode="outlined" onPress={() => { }}>취소불가</Button>}

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        padding: 50,
    },
    imageStyle: {
        width: "100%",
        height: "100%",
    }
});

export default ShowInfo;