import * as React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import Loading from '../../components/Loading';
import Dash from 'react-native-dash-2';

const SellingTicketPage = ({ route }) => {
    const navigation = useNavigation();

    const [ticketList, setTicketList] = React.useState([]);
    const [loading, setLoading] = React.useState(null);

    React.useEffect(() => {
        const getAndLoad = async () => {
            try {
                setLoading(true);

                const variables = {
                    showId: route.params.show.showid,
                }

                await Axios.post('http://3.37.125.95:3000/tx', variables)
                    .then(response => {
                        if (response.data.success) {
                            setTicketList(response.data.data);
                            console.log('티켓 로딩 성공');
                            console.log(response.data.message);
                            console.log(Object.keys(response.data.data[0]));
                        } else {
                            console.log('티켓 로딩 실패');
                        }
                    })
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        getAndLoad();
    }, []);


    let ticketView = (ticketList.length > 0 ? <FlatList data={ticketList} renderItem={(itemData) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('TicketBuyPage', { ticket: itemData.item })}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", margin: 20, marginBottom: 0 }}>
                    <View
                        style={{
                            flex: 1, width: '95%', height: 120, backgroundColor: "white", borderRadius: 8,
                            borderBottomWidth: 4, borderColor: 'grey',
                            flexDirection: 'row'
                        }}>

                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        </View>
                        <View style={{ flex: 3, backgroundColor: 'mediumaquamarine', borderRadius: 8 }}>
                            <View style={{ margin: 20, marginTop: 17, marginLeft: 30 }}>
                                <Text variant="labelLarge">Event Ticket</Text>
                                <Text style={{ fontWeight: 'bold' }} numberOfLines={1} variant="titleMedium">{itemData.item.showname}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <IconButton
                                        disabled
                                        style={{ margin: 0 }}
                                        icon="calendar"
                                        size={20}
                                        onPress={() => { console.log('티켓') }}
                                        iconColor='pink'
                                    />
                                    <Text style={{ color: 'grey' }} variant="bodyMedium">{itemData.item.showdate}</Text>
                                    <Text style={{ color: 'grey' }} variant="bodyMedium">   {itemData.item.showtime.substring(0, 5)}</Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                position: "absolute", width: 40, height: 40, borderRadius: 20,
                                left: 70, top: -30, backgroundColor: "gainsboro"
                            }}
                        />
                        <View
                            style={{
                                position: "absolute", width: 40, height: 40, borderRadius: 20,
                                left: 70, bottom: -30, backgroundColor: "gainsboro",
                                borderTopWidth: 4, borderColor: 'grey'
                            }}
                        />
                    </View>
                    <Dash dashgap={10} dashColor='black' style={{ height: 80, flexDirection: 'column', position: 'absolute', left: '28%', top: '15%' }} />
                </View>
            </TouchableOpacity>
        );
    }} />
        : <View style={styles.container}><Text>거래 가능한 티켓이 없습니다.</Text></View>)


    return (
        <View style={{ flex: 1, backgroundColor: 'gainsboro' }}>
            {loading ? <Loading /> : <View style={{ flex: 1 }}>
                {ticketView}
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
    imageStyle: {
        width: "100%",
        height: '100%',
    }
});

export default SellingTicketPage;