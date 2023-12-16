import * as React from 'react';
import { StyleSheet, View, Keyboard, FlatList, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import Seat from '../../components/Seat';

import { io } from "socket.io-client";
const socket = io.connect("http://3.37.125.95:3000/");

const SeatSelectPage = ({ route }) => {
    const navigation = useNavigation();

    const [seatData, setSeatData] = React.useState([]);

    const [selectedSeats, setSelectedSeats] = React.useState([]);// 선택한 좌석
    const [selectedCount, setSelectedCount] = React.useState(0);// 선택한 좌석 개수

    React.useEffect(() => {
        const load = async () => {
            try {
                const variables = {
                    showId: route.params.ticket.showid
                }

                Axios.post('http://3.37.125.95:3000/seatInfo', variables)
                    .then(response => {
                        if (response.data.success) {
                            console.log(response.data.data)
                            setSeatData(response.data.data);
                        } else {
                            console.log("좌석 현황 로딩 실패")
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
        load();

    }, []);

    React.useEffect(() => {
        socket.on("reservedSeat", (seats) => {
            setSeatData(seats);
        });
        socket.on("unreservedSeat", (seats) => {
            setSeatData(seats);
        });
    }, [socket]);

    const onBook = () => {
        Keyboard.dismiss();

        const load = async () => {
            try {
                wallet = await AsyncStorage.getItem('wallet_address');
                userid = await AsyncStorage.getItem('user_id');

                const variables = {
                    showId: route.params.ticket.showid,
                    ticketOwner: wallet,
                    userId: userid,
                    seats: selectedSeats
                }

                await socket.emit("reserveSeat", variables);
                Alert.alert(
                    '알림',
                    '예매 완료되었습니다.',
                    [
                        { text: '확인', onPress: () => {} },
                    ],
                    { cancelable: true },
                )
                navigation.replace('MainNavigator');

            } catch (error) {
                console.log(error);
            }
        }
        load();
    }

    let seatsList = (<FlatList numColumns={8} style={{ flex: 1 }}
        contentContainerStyle={{ padding: 10, paddingHorizontal: 20 }}
        columnWrapperStyle={{ margin: 5 }}
        data={seatData} renderItem={(itemData) => {
            return (
                <Seat onChangeCount={setSelectedCount} count={selectedCount}
                    onChangeSeat={setSelectedSeats} seat={selectedSeats}
                    location={itemData.item.location} state={itemData.item.state}></Seat>
            );
        }} />
    );

    let seats = (<FlatList numColumns={4} data={selectedSeats} renderItem={(itemData) => {
        return (
            <Text variant="titleMedium"> A{itemData.item} </Text>
        );
    }} />
    );

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center' }}>
                <View style={{ flex: 1, width: '90%', borderBottomStartRadius: 20, borderBottomEndRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey' }}>
                    <Text variant="titleLarge">Stage</Text>
                </View>
            </View>
            <View style={{ flex: 5, backgroundColor: 'black' }}>
                {seatsList}
            </View >
            <View style={{ flex: 1, margin: 20, marginTop: 15, marginBottom: 50, }}>
                <Text style={{ fontWeight: 'bold' }} variant="titleMedium">{route.params.ticket.showname}  A구역</Text>
                <Text variant="bodySmall" />
                <View style={{ flexDirection: 'row' }}>
                    <Text variant="titleMedium">선택한 좌석   </Text>
                    {seats}
                </View>
                <Text style={{ textAlign: 'right', marginRight: 10 }} variant="titleMedium">{route.params.ticket.ticketPrice * selectedCount} ETH</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderColor: 'lightgray' }}>
                {
                    (selectedCount > 0 ? <Button mode="contained-tonal" onPress={() => Alert.alert(
                        '알림',
                        '예매하시겠습니까?',
                        [
                            {
                                text: '아니오',
                                onPress: () => console.log('Cancel Button Pressed'),
                                style: 'cancel',
                            },
                            { text: '예', onPress: onBook },
                        ],
                        { cancelable: true },
                    )} style={{ width: '90%' }}>예매하기</Button>
                        : <Button disabled mode="contained-tonal" style={{ width: '90%' }}>예매하기</Button>)
                }
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageStyle: {
        width: "100%",
        height: "100%",
    }
});

export default SeatSelectPage;