import * as React from 'react';
import { StyleSheet, View, Image, Keyboard, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import Loading from '../../components/Loading';

const ShowInfo = ({ route }) => {
    const navigation = useNavigation();
    const [qrcode, setQrcode] = React.useState("");

    React.useEffect(() => {
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

    const onSubmit = (event) => {
        event.preventDefault();
        Keyboard.dismiss();

        console.log("양도 버튼 누름");

        const load = async () => {
            try {
                wallet = await AsyncStorage.getItem('wallet_address');

                const variables = {
                    showId: parseInt(route.params.item.showid),
                    ticketId: parseInt(route.params.item.ticketId),
                    userAddr: wallet
                }

                await Axios.post('http://3.37.125.95:3000/tx/resell', variables)
                    .then(response => {
                        if (response.data.success) {
                            console.log(response.data.message);
                        } else {
                            console.log('티켓 양도 실패');
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
        load();

        navigation.replace('MainNavigator');// 양도하고 홈페이지로 나가기 - MainStackNavigator도 겉만 봐서는 똑같이 실행됨 - login과 mypage 페이지와 같음
        //navigation.dispatch(CommonActions.navigate('MainNavigator'));// 이것도 똑같이 작동하네? > 왜 refresh는 안 되는것 같지..?
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
            </View>
            <View style={{ flex: 5 }}>
                {qrcode ? <Image source={{ uri: qrcode }} style={styles.imageStyle}></Image> : <Loading />}
            </View>
            <Text />
            <Text />
            <View style={{ flex: 4 }}>
                <Text style={{ textAlign: 'center' }} variant="titleLarge">{route.params.item.showname}</Text><Text />
                <Text style={{ textAlign: 'center' }} variant="titleMedium">일시 : {route.params.item.showdate} / {route.params.item.showtime}</Text>
                <Text style={{ textAlign: 'center' }} variant="titleMedium">장소 : {route.params.item.place}</Text>
                <Text style={{ textAlign: 'center' }} variant="titleMedium">좌석 : {route.params.item.seats}</Text>
            </View>
            <View style={{ flex: 2, marginTop: 30 }}>
                <Button mode="outlined" onPress={() => Alert.alert(
                    '알림',
                    '양도하시겠습니까?',
                    [
                        {
                            text: '아니오',
                            onPress: () => console.log('Cancel Button Pressed'),
                            style: 'cancel',
                        },
                        { text: '예', onPress: () => onSubmit },
                    ],
                    { cancelable: true },
                )}>양도하기</Button>
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