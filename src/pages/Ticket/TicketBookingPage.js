import * as React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Text, Button, IconButton, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const TicketBookingPage = ({ route }) => {
    const navigation = useNavigation();

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
                        <Text>- 각 공연당 한 번에 4매까지 예매가 가능합니다.</Text>
                    </View>

                    <Text style={{ fontWeight: 'bold' }} variant="titleMedium">취소 및 환불 규정</Text>
                    <View style={{ backgroundColor: 'whitesmoke', marginTop: 10, marginBottom: 20, padding: 15, borderRadius: 7 }}>
                        <Text style={{ marginBottom: 5 }}>- 가스비 환불 불가</Text>
                        <Text style={{ marginBottom: 3 }}>관람일 7일 전 · 100% 환불</Text>
                        <Text style={{ marginBottom: 3 }}>관람일 6일 ~ 3일 전 · 80% 환불</Text>
                        <Text style={{ marginBottom: 3 }}>관람일 2일 ~ 1일 전 · 50% 환불</Text>
                        <Text style={{ marginBottom: 3 }}>관람일 당일 · 환불 불가</Text>
                    </View>

                </ScrollView>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderColor: 'lightgray' }}>
                <Button mode="contained-tonal" onPress={() => navigation.navigate('SeatSelectPage', { ticket: route.params.ticket })} style={{ width: '90%' }}>좌석 선택하기</Button>
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

export default TicketBookingPage;