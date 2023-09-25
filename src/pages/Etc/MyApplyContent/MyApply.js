import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Card, Text } from 'react-native-paper';
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

    // let applyView = (applyList.length > 0 ? applyList.map((item, index) => {
    //     return (
    //         <Card mode='outlined' style={styles.box} key={index} onPress={() => navigation.navigate('ShowApplyResult', { item: item })}>
    //             <Card.Content style={{ margin: 10 }}>
    //                 <Text variant="titleLarge">{item.showname}</Text>
    //                 {/* <Text />
    //                 <View style={{ flexDirection: 'row' }}>
    //                     <Text variant="bodyLarge">{item.showtime}</Text>
    //                     <Text variant="bodyLarge" style={{ flex: 1, textAlign: 'right' }}>{item.ticketPrice} ETH</Text>
    //                 </View> */}
    //             </Card.Content>
    //         </Card>
    //     );
    // }) : <View style={styles.container}><Text>응모 내역이 없습니다.</Text></View>)

    let applyView = (applyList.length > 0 ? <FlatList data={applyList} renderItem={(itemData) => {
        return (
            <Card mode='outlined' style={styles.box} onPress={() => navigation.navigate('ShowApplyResult', { item: itemData.item })}>
                <Card.Content style={{ margin: 10 }}>
                    <Text variant="titleLarge">{itemData.item.showname}</Text>
                    {/* <Text />
                    <View style={{ flexDirection: 'row' }}>
                        <Text variant="bodyLarge">{itemData.item.showtime}</Text>
                        <Text variant="bodyLarge" style={{ flex: 1, textAlign: 'right' }}>{itemData.item.ticketPrice} ETH</Text>
                    </View> */}
                </Card.Content>
            </Card>
        );
    }} />
        : <View style={styles.container}><Text>응모 내역이 없습니다.</Text></View>)

    return (
        <View style={{ flex: 1, marginHorizontal: 25 }}>
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
        alignContent: 'center',
        marginVertical: 15
    }
});

export default MyApply;