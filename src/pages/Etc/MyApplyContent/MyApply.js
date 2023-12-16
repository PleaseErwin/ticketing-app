import * as React from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Card, Text, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import Loading from '../../../components/Loading';
import moment from 'moment';

const MyApply = () => {
    const navigation = useNavigation();

    const [applyList, setApplyList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                token = await AsyncStorage.getItem('token');

                const variables = {
                }
                await Axios.post('http://3.37.125.95:3000/users/applyList', variables, { headers: { authorization: token } })
                    .then(response => {
                        if (response.data.success) {
                            console.log('응모 내역 로딩 성공');
                            console.log(Object.keys(response.data.data[0]));
                            setApplyList(response.data.data);
                        } else {
                            console.log('응모 내역 로딩 실패');
                        }
                    })
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        load();
    }, []);

    // // <TouchableOpacity onPress={() => navigation.navigate('ShowApplyResult', { item: itemData.item })}>
    // //     <View style={{ padding: 10, margin: 10, borderRadius: 10, backgroundColor: 'white', borderBottomWidth: 3, borderColor: 'gainsboro' }}>
    // <Card contentStyle={{ backgroundColor: 'white', padding: 15, paddingBottom: 12, elevation: 3 }} mode='elevated' style={styles.box} onPress={() => navigation.navigate('ShowApplyResult', { item: itemData.item })}>
    //     {/* <Card.Content style={{ backgroundColor: 'white', padding: 0 }}> */}
    //     <View style={{ flexDirection: 'row' }}>
    //         <View>
    //             <Image style={{ height: 70, width: 70 }} source={{ uri: `data:image/jpg;base64,${itemData.item.imgEncode}` }} />
    //         </View>
    //         <View style={{ flex: 1, marginLeft: 13, marginBottom: 3 }}>
    //             <View style={{ flex: 3 }}>
    //                 <Text />
    //             </View>
    //             <View style={{ flex: 1 }}>
    //                 <Text variant="bodyMedium">당첨자 발표 - {itemData.item.paystart.substring(0, 10)}</Text>
    //             </View>
    //         </View>
    //     </View>
    //     <Badge style={{ position: 'absolute', right: 15, top: 15, borderRadius: 3, paddingHorizontal: 5, backgroundColor: 'lightsteelblue' }}>추첨완료</Badge>
    //     <Badge style={{ position: 'absolute', right: 15, top: 15, borderRadius: 3, paddingHorizontal: 5, backgroundColor: 'crimson' }}>추첨전</Badge>
    //     <Text style={{ marginTop: 5 }} numberOfLines={1} variant="titleMedium">{itemData.item.showname}</Text>
    //     {/* </Card.Content> */}
    // </Card>
    // //     </View>
    // // </TouchableOpacity>

    const moment = require("moment");
    const today = moment();

    let applyView = (applyList.length > 0 ? <FlatList data={applyList} renderItem={(itemData) => {
        let beforeWinning = today.isBefore(itemData.item.paystart.substring(0, 10));
        return (
            (!beforeWinning ?
                <Card contentStyle={{ backgroundColor: 'white', padding: 15, paddingBottom: 12, elevation: 3 }} mode='elevated' style={styles.box} onPress={() => navigation.navigate('ShowApplyResult', { item: itemData.item })}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image style={{ height: 70, width: 70 }} source={{ uri: `data:image/jpg;base64,${itemData.item.imgEncode}` }} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 13, marginBottom: 3 }}>
                            <View style={{ flex: 3 }}>
                                <Text />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text variant="bodyMedium">당첨자 발표 - {itemData.item.paystart.substring(0, 10)}</Text>
                            </View>
                        </View>
                    </View>
                    <Badge style={{ position: 'absolute', right: 15, top: 15, borderRadius: 3, paddingHorizontal: 5, backgroundColor: 'lightsteelblue' }}>추첨완료</Badge>
                    <Text style={{ marginTop: 5 }} numberOfLines={1} variant="titleMedium">{itemData.item.showname}</Text>
                </Card> :
                <Card contentStyle={{ backgroundColor: 'white', padding: 15, paddingBottom: 12, elevation: 3 }} mode='elevated' style={styles.box} onPress={() => Alert.alert(
                    '알림',
                    '당첨자 확인 및 결제 기간이 아닙니다.',
                    [
                        { text: '예', onPress: () => console.log('확인 Button Pressed') },
                    ],
                    { cancelable: true },
                )}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image style={{ height: 70, width: 70 }} source={{ uri: `data:image/jpg;base64,${itemData.item.imgEncode}` }} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 13, marginBottom: 3 }}>
                            <View style={{ flex: 3 }}>
                                <Text />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text variant="bodyMedium">당첨자 발표 - {itemData.item.paystart.substring(0, 10)}</Text>
                            </View>
                        </View>
                    </View>
                    <Badge style={{ position: 'absolute', right: 15, top: 15, borderRadius: 3, paddingHorizontal: 5, backgroundColor: 'crimson' }}>추첨전</Badge>
                    <Text style={{ marginTop: 5 }} numberOfLines={1} variant="titleMedium">{itemData.item.showname}</Text>
                </Card>)
        );
    }} />
        : <View style={styles.container}><Text>응모 내역이 없습니다.</Text></View>)

    return (
        <View style={{ flex: 1, margin: 20 }}>
            {loading ? <Loading /> : <View style={{ flex: 1 }}>
                {applyView}
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        //alignContent: 'center',
        marginBottom: 15
    }
});

export default MyApply;