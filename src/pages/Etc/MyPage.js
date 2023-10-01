import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Card, Text, List, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import Loading from '../../components/Loading';

// Styled Components 설치해서 일괄 적용? 높이 말고도 글씨 크기도 나중에 변경

const MyPage = () => {
    const navigation = useNavigation();

    const [myId, setMyId] = React.useState("");
    const [myCoin, setMyCoin] = React.useState(0);

    const [loading, setLoading] = React.useState(null);

    React.useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                userid = await AsyncStorage.getItem('user_id');
                wallet = await AsyncStorage.getItem('wallet_address');
                setMyId(userid);

                const variables = {
                    wallet: wallet
                }

                Axios.post('http://3.37.125.95:3000/users/getETH', variables)
                    .then(response => {
                        if (response.data.success) {
                            console.log('정보 불러오기 성공');
                            setMyCoin(response.data.balance);
                        } else {
                            console.log('정보 불러오기 실패');
                        }
                    })
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        load();

    }, []);

    return (<View style={{ flex: 1 }}>
        <Card contentStyle={styles.box}>
            <Card.Content>
                {loading ? <Loading /> : <><Text variant="headlineSmall">환영합니다, {myId}님</Text><Text />
                    <Text variant="titleLarge" style={{ textAlign: 'right' }}>{myCoin} ETH</Text></>}
            </Card.Content>
        </Card>
        {/* <List.Item onPress={() => { }} title="비밀번호 설정"
            style={{ height: 60, justifyContent: 'center' }} />
        <Divider />
        <List.Item onPress={() => { }} title="키워드 설정"
            style={{ height: 60, justifyContent: 'center' }} />
        <Divider />
        <List.Item onPress={() => { }} title="코인 충전"
            style={{ height: 60, justifyContent: 'center' }} />
        <Divider /> */}
        <Menu.Item style={{ marginVertical: 5 }} leadingIcon="inbox-full" onPress={() => navigation.navigate('MyTransaction', {})} title="거래 내역" />
        <Divider />
        <Menu.Item style={{ marginVertical: 5 }} leadingIcon="newspaper-variant-outline" onPress={() => navigation.navigate('MyApply', {})} title="응모 내역" />
        <Divider />
        <Menu.Item style={{ marginVertical: 5 }} leadingIcon="logout" onPress={() => navigation.navigate('Logout', {})} title="로그아웃" />
        <Divider />
        {/* format-list-checkbox / playlist-check / view-list */}
    </View>
    );
};

const styles = StyleSheet.create({
    box: {
        margin: 10
    }
});

export default MyPage;