import * as React from 'react';
import { StyleSheet, View, Image, Keyboard, ScrollView } from 'react-native';
import { Text, Button, IconButton, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

const TicketApplyPage = ({ route }) => {
  const navigation = useNavigation();

  const [applyState, setApplyState] = React.useState(0);

  React.useEffect(() => {
    const load = async () => {
      try {
        userid = await AsyncStorage.getItem('user_id');

        const variables = {
          showid: route.params.ticket.showid,
          userid: userid
        }

        Axios.post('http://3.37.125.95:3000/shows/detail', variables)
          .then(response => {
            if (response.data.success) {
              console.log(response.data.code)
              setApplyState(response.data.code);
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

        Axios.post('http://3.37.125.95:3000/users/apply', variables, { headers: { authorization: token } })
          .then(response => {
            if (response.data.success) {
              alert('응모 성공');
              setApplyState(response.data.code);
            } else {
              alert('응모 실패');
            }
          })
      } catch (error) {
        console.log(error);
      }
    }
    load();
  }

  return (
    <View style={styles.container}>

      <View style={{ flex: 3 }}>
        <Image style={styles.imageStyle} source={{ uri: `data:image/gif;base64,${route.params.ticket.imgEncode}` }}></Image>
      </View>
      <View style={{ flex: 4, margin: 25, marginBottom: 0 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text variant="headlineSmall">{route.params.ticket.showname}</Text>
          <Text />
          <Divider />
          <Text />

          <Text style={{ fontWeight: 'bold' }} variant="titleMedium">공연정보</Text>
          <View style={{ backgroundColor: 'whitesmoke', marginTop: 10, marginBottom: 20, padding: 15, borderRadius: 7 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text variant="titleMedium">공연일자</Text><Text variant="titleMedium">{route.params.ticket.showdate}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text variant="titleMedium">공연시간</Text><Text variant="titleMedium">{route.params.ticket.showtime.substring(0, 5)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text variant="titleMedium">공연장소</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text variant="titleMedium">{route.params.ticket.place}</Text>
                <IconButton
                  style={{ margin: 0 }}
                  icon="map"
                  size={20}
                  onPress={() => navigation.navigate('LocationGuide')}
                />
              </View>
            </View>
          </View>

          <Text style={{ fontWeight: 'bold' }} variant="titleMedium">가격정보</Text>
          <View style={{ backgroundColor: 'whitesmoke', marginTop: 10, marginBottom: 20, padding: 15, borderRadius: 7 }}>
            <Text variant="titleMedium">{route.params.ticket.ticketPrice} ETH</Text>
          </View>

          <Text style={{ fontWeight: 'bold' }} variant="titleMedium">유의사항</Text>
          <View style={{ backgroundColor: 'whitesmoke', marginTop: 10, marginBottom: 20, padding: 15, borderRadius: 7 }}>
            <Text style={{ marginBottom: 5 }}>- 추첨제 참여 방법 안내</Text>
            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>     응모하기 {'>'} 당첨확인 {'>'} 결제하기 {'>'} 좌석확인</Text>
            <Text style={{ marginBottom: 5 }}>- 각 공연에 대해 응모는 한 번만 가능합니다.</Text>
            <Text style={{ marginBottom: 5 }}>- 각 공연 당 1매 예매가 가능합니다.</Text>
            <Text style={{ marginBottom: 5 }}>- 당첨자는 정해진 기간 내 결제해야 하며, 미결제 시 당첨이 자동 취소됩니다.</Text>
            <Text style={{ marginBottom: 5 }}>- 당첨자 미결제 잔여분은 하단의 거래 탭에 등록되어 선착순으로 구매하실 수 있습니다.</Text>
          </View>

          <Text style={{ fontWeight: 'bold' }} variant="titleMedium">취소 및 환불 규정</Text>
          <View style={{ backgroundColor: 'whitesmoke', marginTop: 10, marginBottom: 20, padding: 15, borderRadius: 7 }}>
            <Text style={{ marginBottom: 10 }}>- 가스비 환불 불가</Text>
            <Text style={{ marginBottom: 3 }}>관람일 7일 전 · 100% 환불</Text>
            <Text style={{ marginBottom: 3 }}>관람일 6일 ~ 3일 전 · 80% 환불</Text>
            <Text style={{ marginBottom: 3 }}>관람일 2일 ~ 1일 전 · 50% 환불</Text>
            <Text style={{ marginBottom: 3 }}>관람일 당일 · 환불 불가</Text>
          </View>

        </ScrollView>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderColor: 'lightgray' }}>
        {
          (applyState === 111 ? <Button disabled mode="contained-tonal" style={{ width: '90%' }}>신청 기간이 아닙니다.</Button>
            : applyState === 222 ? <Button disabled mode="contained-tonal" style={{ width: '90%' }}>신청 완료되었습니다.</Button>
              : applyState === 333 ? <Button mode="contained-tonal" onPress={onSubmit} style={{ width: '90%' }}>신청하기</Button>
                : <Button disabled mode="contained-tonal" style={{ width: '90%' }}>신청 종료</Button>)
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  }
});

export default TicketApplyPage;