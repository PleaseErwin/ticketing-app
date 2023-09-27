import * as React from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Card, Text, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import Loading from '../../../components/Loading';

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
                            console.log(response.data.data);
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

    let applyView = (applyList.length > 0 ? <FlatList data={applyList} renderItem={(itemData) => {
        return (
            // <TouchableOpacity onPress={() => navigation.navigate('ShowApplyResult', { item: itemData.item })}>
            //     <View style={{ padding: 10, margin: 10, borderRadius: 10, backgroundColor: 'white', borderBottomWidth: 3, borderColor: 'gainsboro' }}>
            <Card contentStyle={{ backgroundColor: 'white', padding: 15, paddingBottom: 12 }} mode='elevated' style={styles.box} onPress={() => navigation.navigate('ShowApplyResult', { item: itemData.item })}>
                {/* <Card.Content style={{ backgroundColor: 'white', padding: 0 }}> */}
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image style={{ height: 70, width: 70 }} source={{ uri: `data:image/jpg;base64,${itemData.item.imgEncode}` }} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 13, marginBottom: 3 }}>
                            <View style={{ flex: 3 }}>
                                <Text />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text variant="bodyMedium">{itemData.item.showdate}</Text><Text variant="bodyMedium"> / A3석</Text>
                            </View>
                        </View>
                    </View>
                    <Badge style={{ position: 'absolute', right: 15, top: 15, borderRadius: 3, paddingHorizontal: 5, backgroundColor: 'lightsteelblue' }}>추첨완료</Badge>
                    <Text style={{ marginTop: 5 }} numberOfLines={1} variant="titleMedium">{itemData.item.showname}</Text>
                {/* </Card.Content> */}
            </Card>
            //     </View>
            // </TouchableOpacity>
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