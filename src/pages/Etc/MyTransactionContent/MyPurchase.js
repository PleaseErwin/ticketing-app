import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text, List, Button } from 'react-native-paper';

const MyPurchase = () => {
    // const userId = props.match.params.userId;// 리덕스 아니면 asyncstorage?
    // const variable = {
    //     userId: userId
    // }

    const [item, setItem] = React.useState([]);

    // React.useEffect(() => {// DOM이 업데이트될 때 한번만 실행 - mytransaction에서 한번만 받아올까?
    //     Axios.post('/api/video/getVideoDetail', variable)// import Axios from 'axios';
    //     .then(response => {
    //         if (response.data.success) {// response.data = Object 형태
    //             setItem(response.data.videoDetail);
    //         } else {
    //             alert('Failed to load');
    //         }
    //     })
    // }, []);

    return (
    <View style={styles.container}>
        {item.length > 0 ? <Text>구매 화면</Text> : <Text>데이터가 없습니다.</Text>}
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default MyPurchase;