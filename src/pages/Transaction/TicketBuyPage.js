import * as React from 'react';
import { StyleSheet, View, Image, Keyboard } from 'react-native';
import { Divider, Text, Button, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Axios from 'axios';

const TicketBuyPage = ({ route }) => {
  const navigation = useNavigation();

  const [buyState, setBuyState] = React.useState(0);

  React.useEffect(() => {
    const load = async () => {
      try {
        userid = await AsyncStorage.getItem('user_id');

        const variables = {
          showid: route.params.ticket.showid,
          userid: userid// 어라 이거 토큰이 아니었나?
        }

        Axios.post('http://3.37.125.95:3000/shows/detail', variables)
          .then(response => {
            if (response.data.success) {
              console.log(response.data.code)
              setBuyState(response.data.code);
            } else {
              alert('로딩 실패');
            }
          })
      } catch (error) {
        console.log(error);
      }
    }
    load();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    Keyboard.dismiss();

    const load = async () => {
      try {
        token = await AsyncStorage.getItem('token');

        const variables = {
          showid: route.params.ticket.showid
        }

        Axios.post('http://3.37.125.95:3000/', variables, { headers: { authorization: token } })
          .then(response => {
            if (response.data.success) {
              alert('구매 성공');
              setApplyState(response.data.code);
              //navigation.dispatch(CommonActions.goBack()); 
            } else {
              alert('구매 실패');
            }
          })
      } catch (error) {
        console.log(error);
      }
    }
    load();
  }

  return (// 이부분 구매페이지로 꾸미기
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <Image source={require('./qr.png')} style={styles.imageStyle}></Image>
      </View>
      <View style={{ flex: 3, margin: 30 }}>
        <Text variant="headlineLarge">공연정보</Text>
        <Text />
        <Text variant="headlineSmall">- 공연일자 {route.params.ticket.showdate}</Text>
        <Text variant="headlineSmall">- 공연시간 {route.params.ticket.showtime}</Text>
        <Text variant="headlineSmall">- 공연장소 {route.params.ticket.place}</Text>
      </View>
      <View style={{ flex: 1, marginLeft: 30 }}>
        <Text variant="headlineSmall">{route.params.ticket.ticketPrice}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Button mode="contained-tonal" onPress={onSubmit} style={{ width: '90%' }}>구매하기</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    //alignItems: "center",
    //justifyContent: "center"
  }
});

export default TicketBuyPage;