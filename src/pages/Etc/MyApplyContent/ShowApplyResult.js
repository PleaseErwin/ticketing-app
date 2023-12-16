import * as React from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Divider, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const ShowApplyResult = ({ route }) => {
    const navigation = useNavigation();

    const [applyWinState, setApplyWinState] = React.useState(0);

    React.useEffect(() => {
        const load = async () => {
            try {
                userid = await AsyncStorage.getItem('user_id');

                const variables = {
                    showid: route.params.item.showid,
                    userid: userid
                }

                Axios.post('http://3.37.125.95:3000/users/checkPayable', variables)
                    .then(response => {
                        if (response.data.success) {
                            console.log('당첨');
                            setApplyWinState(response.data.code);
                            console.log(response.data.code);
                        } else {
                            console.log('결제버튼 비활성화');
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
        load();
    }, []);

    const onSubmit = (event) => {// 눌러서 결제창 띄우기
        event.preventDefault();
        Keyboard.dismiss();

        navigation.navigate('PaymentPage', { item: route.params.item });
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={{ marginBottom: 20 }} variant="titleLarge">{route.params.item.showname} 추첨제 결과 확인</Text>
                <Divider style={{ marginBottom: 20 }} horizontalInset="true" />
                <View style={{ justifyContent: 'center' }}>
                    {
                        (applyWinState === 111 ? <Text variant="titleMedium">아쉽지만 당첨되지 않았습니다. 응모해주셔서 감사합니다.</Text>
                            : applyWinState === 222 ?
                                <View><Text variant="titleMedium">당첨을 축하드립니다.</Text><Text />
                                    <Text variant="titleMedium">아래 "결제하기" 버튼을 눌러 결제하실 수 있습니다.</Text>
                                    <Text style={{ marginBottom: 15 }} variant="titleMedium">결제 후 홈화면에서 좌석을 확인하실 수 있습니다.</Text>

                                    <Text style={{ marginBottom: 5 }} variant="titleMedium">- 당첨자는 정해진 기간 내 결제해야 하며, 기간 내 결제하지 않을 경우 당첨이 자동 취소됩니다.</Text>
                                    <Text style={{ marginBottom: 20 }} variant="titleMedium">- 당첨자 미결제 잔여분은 하단의 거래 탭에 등록되어 선착순으로 구매하실 수 있습니다.</Text>
                                    <Text style={{ marginBottom: 5 }} variant="titleMedium">* 결제 기간   {route.params.item.paystart.substring(0, 10)} ~ {route.params.item.payend.substring(0, 10)}</Text></View>
                                : applyWinState === 333 ?
                                    <View><Text variant="titleMedium">당첨을 축하드립니다.</Text><Text />
                                        <Text variant="titleMedium">아래 "결제하기" 버튼을 눌러 결제하실 수 있습니다.</Text>
                                        <Text style={{ marginBottom: 15 }} variant="titleMedium">결제 후 홈화면에서 좌석을 확인하실 수 있습니다.</Text>

                                        <Text style={{ marginBottom: 5 }} variant="titleMedium">- 당첨자는 정해진 기간 내 결제해야 하며, 기간 내 결제하지 않을 경우 당첨이 자동 취소됩니다.</Text>
                                        <Text style={{ marginBottom: 20 }} variant="titleMedium">- 당첨자 미결제 잔여분은 하단의 거래 탭에 등록되어 선착순으로 구매하실 수 있습니다.</Text>
                                        <Text style={{ marginBottom: 5 }} variant="titleMedium">* 결제 기간   {route.params.item.paystart.substring(0, 10)} ~ {route.params.item.payend.substring(0, 10)}</Text></View>

                                    : <View><Text style={{ marginBottom: 20 }} variant="titleMedium">기간 내 결제하지 않아 당첨이 취소되었습니다.</Text>
                                    <Text style={{ marginBottom: 5 }} variant="titleMedium">* 결제 기간   {route.params.item.paystart.substring(0, 10)} ~ {route.params.item.payend.substring(0, 10)}</Text></View>)
                    }
                </View>

            </View>
            <View style={{ marginVertical: 20, margin: 20, marginBottom: 30 }}>
                {
                    (applyWinState === 111 ? <View></View>
                        : applyWinState === 222 ? <Button disabled mode="contained-tonal">결제완료</Button>
                            : applyWinState === 333 ? <Button mode="contained-tonal" onPress={onSubmit}>결제하러 가기</Button>
                                : <View></View>)
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 10,
    },
    imageStyle: {
        width: "100%",
        height: "100%",
        backgroundColor: 'black'
    }
});

export default ShowApplyResult;