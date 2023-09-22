import * as React from 'react';
import { View, StyleSheet, ScrollView, Keyboard, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView, Image } from 'react-native';
import { Searchbar, Card, Text, Divider, Chip, Button } from 'react-native-paper';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Axios from 'axios';
import Loading from '../../components/Loading';

const TicketingPage = () => {
    const navigation = useNavigation();
    //const isFocused = useIsFocused();// goback이나 pop함수를 직접 쓴게 아닌데 적용될까? > 왜 다른페이지에서도 계속 로딩하지?

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [ticketList, setTicketList] = React.useState([]);

    const [loading, setLoading] = React.useState(null);

    React.useEffect(() => {
        const getAndLoad = async () => {
            try {
                setLoading(true);
                await Axios.post('http://3.37.125.95:3000/shows')
                    .then(response => {
                        if (response.data.success) {
                            setTicketList(response.data.data);
                            console.log(response.data.data);
                            console.log('티켓팅 로딩 성공');
                        } else {
                            console.log('티켓팅 로딩 실패');
                        }
                    })
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        getAndLoad();
    }, []);

    const onKeywordSubmit = (event) => {
        event.preventDefault();
        Keyboard.dismiss();

        const variables = {
            keyword: searchQuery,
        }
        console.log(variables);

        Axios.post('http://3.37.125.95:3000/shows/keyword', variables)
            .then(response => {
                if (response.data.success) {
                    setTicketList(response.data.data);
                } else {
                    alert('검색 실패');
                }
            })
    }

    React.useEffect(() => {// 처음 mount될때 실행됨 / 안에서 onKeywordSubmit를 부를수는 없나?
        console.log(searchQuery);// 계속 검색어가 바뀔때마다 render되면 부담되지 않을까?

        const variables = {
            keyword: searchQuery,
        }

        Axios.post('http://3.37.125.95:3000/shows/keyword', variables)
            .then(response => {
                if (response.data.success) {
                    setTicketList(response.data.data);
                } else {
                    alert('검색 실패');
                }
            })
    }, [searchQuery]);// 아 시발 직접 입력할때도 업데이트된다

    const onButtonSubmit = (key) => {
        setSearchQuery(key);
    }

    // Flatlist 이용하는 것으로 수정 > https://velog.io/@djaxornwkd12/React-Native-FlatList%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90 참고
    // let ticketView = (ticketList.length > 0 ? ticketList.map((ticket, index) => {// uri:`data:image/gif;base64,${ticket.imgEncode}`
    //     return (
    //         <Card mode='outlined' style={styles.box} key={index} onPress={() => navigation.navigate('TicketApplyPage', { ticket: ticket })}>
    //             <Card.Cover style={{ height: 160 }} source={{ uri: `data:image/jpg;base64,${ticket.imgEncode}` }} />
    //             <Card.Content style={{ margin: 10, marginBottom: 5 }}>
    //                 <Text numberOfLines={1} variant="titleLarge">{ticket.showname}</Text>
    //                 <Text />
    //                 <View style={{ flexDirection: 'row' }}>
    //                     <Text variant="bodyLarge">{ticket.showdate}</Text>
    //                     <Text variant="bodyLarge" style={{ flex: 1, textAlign: 'right' }}>{ticket.ticketPrice} ETH</Text>
    //                 </View>
    //             </Card.Content>
    //         </Card>
    //     );
    // }) : <View style={styles.container}><Text>검색 결과가 없습니다.</Text></View>)

    let ticketView = (ticketList.length > 0 ? <FlatList data={ticketList} renderItem={(itemData) => {
        return (
            // <Card mode='outlined' style={styles.box} onPress={() => navigation.navigate('TicketApplyPage', { ticket: itemData.item })}>
            //      <Card.Cover style={{ height: 160 }} source={{ uri: `data:image/jpg;base64,${itemData.item.imgEncode}` }} />
            //      <Card.Content style={{ margin: 10, marginBottom: 5 }}>
            //          <Text numberOfLines={1} variant="titleLarge">{itemData.item.showname}</Text>
            //          <Text />
            //          <View style={{ flexDirection: 'row' }}>
            //              <Text variant="bodyLarge">{itemData.item.showdate}</Text>
            //              <Text variant="bodyLarge" style={{ flex: 1, textAlign: 'right' }}>{itemData.item.ticketPrice} ETH</Text>
            //          </View>
            //      </Card.Content>
            //  </Card>
            <TouchableOpacity onPress={() => navigation.navigate('TicketApplyPage', { ticket: itemData.item })}>
                <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10 }}>
                    <View><Image style={{ height: 100, width: 100 }} source={{ uri: `data:image/jpg;base64,${itemData.item.imgEncode}` }} /></View>
                    <View style={{ margin: 10, flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Text numberOfLines={1} variant="titleMedium">{itemData.item.showname}</Text>
                            <Text />

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text variant="bodyMedium">{itemData.item.showdate}</Text>
                            <Text variant="bodyLarge">{itemData.item.showtime.substring(0,5)}</Text>
                        </View>
                    </View>
                </View>
                <Divider horizontalInset="true" />
            </TouchableOpacity>
        );
    }} />
        : <View style={styles.container}><Text>검색 결과가 없습니다.</Text></View>)

    return (
        <View style={{ flex: 1 }}>
            {loading ? <Loading /> : <View style={{ flex: 1 }}>
                <Searchbar
                    placeholder="공연 검색"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    inputStyle={{ opacity: 1 }}
                    style={{ margin: 20 }}
                    onIconPress={onKeywordSubmit}
                />
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 5, marginBottom: 10, marginHorizontal: 20 }}>
                        <Button mode="contained" children="tour" style={{ marginHorizontal: 5 }} onPress={() => onButtonSubmit('tour')} />
                        <Button mode="contained" children="2023" style={{ marginHorizontal: 5 }} onPress={() => onButtonSubmit('2023')} />
                        <Button mode="contained" children="예시2" style={{ marginHorizontal: 5 }} onPress={() => onButtonSubmit('예시2')} />
                        <Button mode="contained" children="예시3" style={{ marginHorizontal: 5 }} onPress={() => onButtonSubmit('예시3')} />
                        <Button mode="contained" children="예시4" style={{ marginHorizontal: 5 }} onPress={() => onButtonSubmit('예시4')} />
                    </ScrollView>
                </View>
                {ticketView}
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        alignContent: 'center',
        margin: 25,
        marginTop: 10,
        marginBottom: 20,
    }
});

export default TicketingPage;