import * as React from 'react';
import { StyleSheet, View, Image, Keyboard } from 'react-native';
import { Divider, Text, List, Button } from 'react-native-paper';

const ShowInfo = ({ route }) => {

    const onSubmit = (event) => {
        event.preventDefault();
        Keyboard.dismiss();

        console.log("양도 버튼 누름");

        // const variables = {
        //     id: form.id
        // }
        // console.log(variables);

        // Axios.post('http://3.37.125.95:3000/', variables)
        //     .then(response => {
        //         if (response.data.success) {
        //             alert('양도 성공');
        //             console.log(response.data.message);
        //             navigation.pop();// 뒤로 돌아간 다음에 새로고침 해야하나?
        //         } else {
        //             alert('양도 실패');
        //         }
        //     })
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
            </View>
            <View style={{ flex: 3 }}>
                <Image source={{ uri: 'https://picsum.photos/300/300' }} style={styles.imageStyle}></Image>
            </View>
            <Text />
            <Text />
            <View style={{ flex: 3 }}>
                <Text style={{ textAlign: 'center' }} variant="titleLarge">{route.params.item.title}</Text><Text />
                <Text style={{ textAlign: 'center' }} variant="titleMedium">일시 : {route.params.item.time}</Text>
                <Text style={{ textAlign: 'center' }} variant="titleMedium">장소 : {route.params.item.place}</Text>
                <Text style={{ textAlign: 'center' }} variant="titleMedium">좌석 : {route.params.item.seats}</Text>
            </View>
            <View style={{ flex: 2 }}>
                <Button mode="outlined" onPress={onSubmit}>양도하기</Button>
            </View>
        </View>
    );
};// qr코드 공연정보 양도버튼

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignContent: 'center',
        //justifyContent: 'center',
        margin: 20,
        padding: 50,
        textAlign: 'center'
    },
    imageStyle: {
        width: "100%",
        height: "100%",
    }
});

export default ShowInfo;