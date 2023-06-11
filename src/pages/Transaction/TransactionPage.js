import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Button, Card, Text } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Axios from 'axios';

const TransactionPage = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();// goback이나 pop함수를 직접 쓴게 아닌데 적용될까?

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [ticketList, setTicketList] = React.useState([]);

    React.useEffect(() => {
        Axios.post('http://3.37.125.95:3000/')
            .then(response => {
                if (response.data.success) {
                    setTicketList(response.data.data);
                    console.log(response.data.data);
                    alert('로딩 성공');
                } else {
                    alert('로딩 실패');
                }
            })
    }, [isFocused]);

    const onKeywordSubmit = (event) => {
        event.preventDefault();
        Keyboard.dismiss();

        const variables = {
            keyword: searchQuery,
        }
        console.log(variables);

        Axios.post('http://3.37.125.95:3000/', variables)
            .then(response => {
                if (response.data.success) {
                    setTicketList(response.data.data);
                } else {
                    alert('검색 실패');
                }
            })
    }

    let ticketView = (ticketList.length > 0 ? ticketList.map((ticket, index) => {
        return (
            <Card style={styles.box} key={index} onPress={() => navigation.navigate('TicketApplyPage', { ticket: ticket })}>
                <Card.Content style={{ margin: 10 }}>
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

    return (
        <View>
            <Searchbar
                placeholder="티켓 검색"
                onChangeText={onChangeSearch}
                value={searchQuery}
                inputStyle={{ opacity: 1 }}
                style={{ margin: 10 }}
                onIconPress={onKeywordSubmit}
            />
            { }
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
        margin: 20,
        marginTop: 10,
        marginBottom: 10
    }
});

export default TransactionPage;