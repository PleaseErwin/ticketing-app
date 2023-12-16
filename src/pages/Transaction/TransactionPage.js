import * as React from 'react';
import { View, StyleSheet, Keyboard, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView, Image } from 'react-native';
import { Searchbar, Card, Text, Badge, IconButton } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Axios from 'axios';
import Loading from '../../components/Loading';

const TransactionPage = () => {
    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [showList, setShowList] = React.useState([]);
    const [loading, setLoading] = React.useState(null);

    React.useEffect(() => {
        const getAndLoad = async () => {
            try {
                setLoading(true);
                await Axios.post('http://3.37.125.95:3000/shows/issuableShow')
                    .then(response => {
                        if (response.data.success) {
                            setShowList(response.data.data);
                            console.log('거래탭 로딩 성공');
                        } else {
                            console.log('거래탭 로딩 실패');
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

        Axios.post('http://3.37.125.95:3000/shows/keywordTx', variables)
            .then(response => {
                if (response.data.success) {
                    setShowList(response.data.data);
                } else {
                    alert('검색 실패');
                }
            })
    }

    const mounted = React.useRef(false);// 검색어 업데이트 될 때만 실행하려고 추가

    React.useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        }
        else {
            console.log(searchQuery);

            const variables = {
                keyword: searchQuery,
            }

            Axios.post('http://3.37.125.95:3000/shows/keywordTx', variables)
                .then(response => {
                    if (response.data.success) {
                        setShowList(response.data.data);
                    } else {
                        alert('검색 실패');
                    }
                })
        }
    }, [searchQuery]);

    let showView = (showList.length > 0 ? <FlatList data={showList} renderItem={(itemData) => {
        return (
            // <TouchableOpacity onPress={() => navigation.navigate('SellingTicketPage', { show: itemData.item })}>
            //     <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10 }}>
            //         <View>
            //             <Image style={{ height: 100, width: 100 }} source={{ uri: `data:image/jpg;base64,${itemData.item.imgEncode}` }} />
            //         </View>
            //         <View style={{ margin: 10, flex: 1 }}>
            //             <View style={{ flex: 1 }}>
            //                 <Text numberOfLines={1} variant="titleMedium">{itemData.item.showname}</Text>
            //                 <Text />
            //             </View>
            //             <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            //                 <Text variant="bodyMedium">{itemData.item.showdate}</Text>
            //                 <Text variant="bodyLarge">{itemData.item.showtime.substring(0, 5)}</Text>
            //             </View>
            //         </View>
            //     </View>
            //     <Divider horizontalInset="true" />
            // </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SellingTicketPage', { show: itemData.item })}>
                <View style={{ margin: 20, marginHorizontal: 25 }}>
                    <Card>
                        <Card.Cover style={{ height: 140 }} source={{ uri: `data:image/jpg;base64,${itemData.item.imgEncode}` }} />
                    </Card>
                    <Card style={{ position: 'absolute', top: 50, right: 10, left: 10, backgroundColor: 'white', padding: 10 }}>
                        <Text style={{ fontWeight: 'bold' }} numberOfLines={1} variant="titleMedium">{itemData.item.showname}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <IconButton
                                disabled
                                style={{ margin: 0 }}
                                icon="map-marker"
                                size={20}
                                onPress={() => { console.log('위치버튼') }}
                            />
                            <Text style={{ color: 'grey' }} variant="titleSmall">{itemData.item.place}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text variant="bodyMedium">{itemData.item.showdate}</Text>
                            <Text variant="bodyMedium"> | {itemData.item.showtime.substring(0, 5)}</Text>
                        </View>
                    </Card>
                </View>
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
                {/* <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 5, marginBottom: 10, marginHorizontal: 20 }}>
                        <Button mode="contained" children="tour" style={{ marginHorizontal: 5, borderRadius: 20 }} onPress={() => onButtonSubmit('tour')} />
                        <Button mode="contained" children="2023" style={{ marginHorizontal: 5, borderRadius: 20 }} onPress={() => onButtonSubmit('2023')} />
                        <Button mode="contained" children="팬미팅" style={{ marginHorizontal: 5, borderRadius: 20 }} onPress={() => onButtonSubmit('팬미팅')} />
                    </ScrollView>
                </View> */}
                {showView}
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
        marginBottom: 10
    }
});

export default TransactionPage;