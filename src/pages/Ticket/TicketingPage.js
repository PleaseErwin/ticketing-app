import * as React from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Searchbar, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

const TicketingPage = () => {
    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [ticketList, setTicketList] = React.useState([]);

    React.useEffect(() => {
        Axios.post('http://3.37.125.95:3000/shows')
        .then(response => {
            if (response.data.success) {
                setTicketList(response.data.data);
                console.log(response.data.data);
                alert('로딩 성공');
            } else {
                alert('로딩 실패');
            }
        })
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

    // Flatlist 이용하는 것으로 수정 > https://velog.io/@djaxornwkd12/React-Native-FlatList%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90 참고
    let ticketView = (ticketList.length > 0 ? ticketList.map((ticket, index) => {
        return (
            <Card mode='outlined' style={styles.box} key={index} onPress={() => navigation.navigate('TicketApplyPage', { ticket: ticket })}>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content style={{ margin: 10, marginBottom: 5 }}>
                    <Text variant="titleLarge">{ticket.showname}</Text>
                    <Text />
                    <View style={{ flexDirection: 'row' }}>
                        <Text variant="bodyLarge">{ticket.showdate}</Text>
                        <Text variant="bodyLarge" style={{ flex: 1, textAlign: 'right' }}>{ticket.ticketPrice}원</Text>
                    </View>
                </Card.Content>
            </Card>
        );
    }) : <View style={styles.container}><Text>검색 결과가 없습니다.</Text></View>)
    
    // const ticketView = ticketList.map((ticket, index) => {
    //     return (
    //         <Card style={styles.box} key={index} onPress={() => navigation.navigate('TicketApplyPage', { ticket: ticket })}>
    //             <Card.Content style={{ margin: 10 }}>
    //                 <Text variant="titleLarge">{ticket.title}</Text>
    //                 <Text />
    //                 <View style={{ flexDirection: 'row' }}>
    //                     <Text variant="bodyLarge">{ticket.date}</Text>
    //                     <Text variant="bodyLarge" style={{ flex: 1, textAlign: 'right' }}>{ticket.price}</Text>
    //                 </View>
    //             </Card.Content>
    //         </Card>
    //     );
    // });

    return (
        <ScrollView>
            <Searchbar
                placeholder="공연 검색"
                onChangeText={onChangeSearch}
                value={searchQuery}
                inputStyle={{ opacity: 1 }}
                style={{ margin: 10 }}
                onIconPress={onKeywordSubmit}
            />
            {ticketView}
        </ScrollView>
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
        margin: 20,
        marginTop: 10,
        marginBottom: 10
    }
});

export default TicketingPage;