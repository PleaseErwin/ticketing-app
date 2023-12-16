import * as React from 'react';
import { View, StyleSheet, ScrollView, Keyboard, TouchableOpacity, FlatList, Image } from 'react-native';
import { Searchbar, Text, Divider, Button, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import Loading from '../../components/Loading';

const TicketingPage = () => {
    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [ticketList, setTicketList] = React.useState([]);
    const [popularKeyword, setPopularKeyword] = React.useState([]);

    const [loading, setLoading] = React.useState(null);

    React.useEffect(() => {
        const getAndLoad = async () => {
            try {
                setLoading(true);
                await Axios.post('http://3.37.125.95:3000/shows')
                    .then(response => {
                        if (response.data.success) {
                            setTicketList(response.data.data);
                            console.log(Object.keys(response.data.data[0]));
                            console.log('예매탭 로딩 성공');
                        } else {
                            console.log('예매탭 로딩 실패');
                        }
                    })

                await Axios.post('http://3.37.125.95:3000/shows/search')
                    .then(response => {
                        if (response.data.success) {
                            setPopularKeyword(response.data.data);
                            console.log(response.data.data);
                            console.log('인기 검색어 로딩 성공');
                        } else {
                            console.log('인기 검색어 로딩 실패');
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

    const mounted = React.useRef(false);

    React.useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        }
        else {
            console.log(searchQuery);

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
        }
    }, [searchQuery]);

    const onButtonSubmit = (key) => {
        setSearchQuery(key);
    }

    let ticketView = (ticketList.length > 0 ? <FlatList ItemSeparatorComponent={<Divider horizontalInset="true" />}
        data={ticketList} renderItem={(itemData) => {
            return ((itemData.item.isLottery === 0 ?
                <TouchableOpacity onPress={() => navigation.navigate('TicketBookingPage', { ticket: itemData.item })}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10 }}>
                        <View>
                            <Image style={{ height: 100, width: 100 }} source={{ uri: `data:image/jpg;base64,${itemData.item.imgEncode}` }} />
                            <Badge style={{ position: 'absolute', right: 0, borderRadius: 0, paddingHorizontal: 5, backgroundColor: 'lightpink' }}>예매</Badge>
                        </View>
                        <View style={{ margin: 10, flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={1} variant="titleMedium">{itemData.item.showname}</Text>
                                <Text />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text variant="bodyMedium">{itemData.item.showdate}</Text>
                                <Text variant="bodyLarge">{itemData.item.showtime.substring(0, 5)}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity> :
                
                <TouchableOpacity onPress={() => navigation.navigate('TicketApplyPage', { ticket: itemData.item })}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10 }}>
                        <View>
                            <Image style={{ height: 100, width: 100 }} source={{ uri: `data:image/jpg;base64,${itemData.item.imgEncode}` }} />
                            <Badge style={{ position: 'absolute', right: 0, borderRadius: 0, paddingHorizontal: 5, backgroundColor: 'lightskyblue' }}>추첨</Badge>
                        </View>
                        <View style={{ margin: 10, flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={1} variant="titleMedium">{itemData.item.showname}</Text>
                                <Text />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text variant="bodyMedium">{itemData.item.showdate}</Text>
                                <Text variant="bodyLarge">{itemData.item.showtime.substring(0, 5)}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>)
            );
        }} />
        : <View style={styles.container}><Text>검색 결과가 없습니다.</Text></View>)

    let popularKeywordView = (popularKeyword.length > 0 ? <FlatList numColumns={10} data={popularKeyword} renderItem={(itemData) => {
        return (
            <Button mode="contained" children={itemData.item.word} style={{ marginHorizontal: 5, borderRadius: 20 }} onPress={() => onButtonSubmit(itemData.item.word)} />
        );
    }} />
        : <View style={styles.container}><Text>인기 검색어가 없습니다.</Text></View>)

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
                        {popularKeywordView}
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
        justifyContent: 'center',
    },
    box: {
        alignContent: 'center',
        margin: 25,
        marginTop: 10,
        marginBottom: 20,
    }
});

export default TicketingPage;