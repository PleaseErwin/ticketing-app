import * as React from 'react';
import { StyleSheet, View, Image, Keyboard, Alert } from 'react-native';
import { Divider, Text, Button, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Axios from 'axios';
import Dash from 'react-native-dash-2';

const TicketBuyPage = ({ route }) => {
	const navigation = useNavigation();

	const onSubmit = () => {
		//event.preventDefault();
		Keyboard.dismiss();

		console.log("구매 버튼 누름");

		const load = async () => {
			try {
				wallet = await AsyncStorage.getItem('wallet_address');
				userid = await AsyncStorage.getItem('user_id');

				const variables = {
					userId: userid,
					userAddr: wallet,
					bookingId: route.params.ticket.bookingId
				}

				await Axios.post('http://3.37.125.95:3000/tx/buyTicket', variables)
					.then(response => {
						if (response.data.success) {
							console.log(response.data.message);
							Alert.alert('구매 성공');
							navigation.replace('MainNavigator');
						} else {
							Alert.alert('구매 실패');
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
			<View style={{ flex: 1 }}></View>

			<View style={{ flex: 7 }}>
				<View style={{ flex: 1, margin: 40, marginBottom: 25, padding: 10, borderRadius: 5, backgroundColor: 'white', elevation: 5 }}>
					<View style={{ flex: 1, margin: 5, marginTop: 20, padding: 10, justifyContent: 'center' }}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<Text variant="bodyLarge">제목</Text><Text variant="bodyLarge">{route.params.ticket.showname}</Text>
						</View>
						{/* <Divider style={{ marginVertical: 10 }} bold={true} /> */}
						<Dash dashgap={10} dashColor='black' style={{ width: '100%', marginVertical: 15 }} />

						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text variant="bodyLarge">장소</Text><Text variant="bodyLarge">{route.params.ticket.place}</Text>
						</View>
						<Dash dashgap={10} dashColor='black' style={{ width: '100%', marginVertical: 15 }} />

						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text variant="bodyLarge">날짜</Text><Text variant="bodyLarge">{route.params.ticket.showdate}</Text>
						</View>
						<Dash dashgap={10} dashColor='black' style={{ width: '100%', marginVertical: 15 }} />

						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text variant="bodyLarge">시간</Text><Text variant="bodyLarge">{route.params.ticket.showtime.substring(0, 5)}</Text>
						</View>
						<Dash dashgap={10} dashColor='black' style={{ width: '100%', marginVertical: 15 }} />

						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text variant="bodyLarge">가격</Text><Text variant="bodyLarge">{route.params.ticket.ticketPrice} ETH</Text>
						</View>
						<Dash dashgap={10} dashColor='black' style={{ width: '100%', marginVertical: 15 }} />

						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text variant="bodyLarge">좌석</Text>
							<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
								{route.params.ticket.reservedSeat.map((seat, i) => {
									return (
										<Text key={i} variant="titleMedium">A{seat.seatid}  </Text>
									);
								})}
								<Text variant="bodyLarge">석</Text>
							</View>
						</View>

						{/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ textAlign: 'center' }} variant="titleMedium">좌석 : </Text>
							{route.params.ticket.reservedSeat.map((seat, i) => {
								return (
									<Text key={i} variant="titleMedium">{seat.seatid} </Text>
								);
							})}
						</View> */}
					</View>
				</View>

				<View style={{
					position: "absolute", width: '20%', height: '15%', borderRadius: 40,
					left: '40%', top: 0, backgroundColor: "gainsboro", elevation: 6, backgroundColor: 'white', padding: 5
				}}>
					<Image style={styles.imageStyle} source={require('../../../src/assets/Ethereum-Logo.png')}></Image>
				</View>

			</View>

			<View style={{ flex: 2, marginHorizontal: 40 }}>
				<Button buttonColor='grey' textColor='white' mode="elevated" onPress={() => Alert.alert(
					'알림',
					'구매하시겠습니까?',
					[
						{
							text: '아니오',
							onPress: () => console.log('Cancel Button Pressed'),
							style: 'cancel',
						},
						{ text: '예', onPress: onSubmit },
					],
					{ cancelable: true },
				)}>구매하기</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageStyle: {
		width: "100%",
		height: "100%",
	}
});

export default TicketBuyPage;