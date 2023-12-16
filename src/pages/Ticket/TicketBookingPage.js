import * as React from 'react';
import { StyleSheet, View, Image, Keyboard, ScrollView } from 'react-native';
import { Text, Button, IconButton, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

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

                    {/* 제목은 스크롤하지 않을 경우 <ScrollView showsVerticalScrollIndicator={false}> */}

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

                    {/* </ScrollView> */}

                </ScrollView>
            </View>

            {/* <View style={{ flex: 1, marginLeft: 30 }}>
        <Text style={{ textAlign: 'right', marginRight: 25 }} variant="titleLarge">{route.params.ticket.ticketPrice} ETH</Text>
      </View> */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderColor: 'lightgray' }}>
                <Button mode="contained-tonal" onPress={() => navigation.navigate('SeatSelectPage', { ticket: route.params.ticket })} style={{ width: '90%' }}>좌석 선택하기</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignContent: 'center',
        backgroundColor: '#fff'// 없을때 색상 'gainsboro'
    },
    imageStyle: {
        width: "100%",
        height: "100%",
        //alignItems: "center",
        //justifyContent: "center"
    }
});

export default TicketBookingPage;



// import * as React from 'react';
// import { StyleSheet, View, Image, Keyboard, ScrollView } from 'react-native';
// import { Text, Button, IconButton, Divider } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import Axios from 'axios';

// import SeatPicker from "react-seat-picker";

// const TicketSelectPage = ({ route }) => {

//     const [loading, setLoading] = React.useState(false);

//     const addSeatCallback = ({ row, number, id }, addCb) => {

//         setLoading(true);

//         async () => {
//             await new Promise(resolve => setTimeout(resolve, 1500));
//             console.log(`Added seat ${number}, row ${row}, id ${id}`);
//             const newTooltip = `tooltip for id-${id} added by callback`;
//             addCb(row, number, id, newTooltip);
//             setLoading(false);
//         }
//     };

//     const addSeatCallbackContinousCase = (
//         { row, number, id },
//         addCb,
//         params,
//         removeCb
//     ) => {
//         setLoading(true);
//         async () => {
//             if (removeCb) {
//                 await new Promise(resolve => setTimeout(resolve, 750));
//                 console.log(
//                     `Removed seat ${params.number}, row ${params.row}, id ${params.id}`
//                 );
//                 removeCb(params.row, params.number);
//             }
//             await new Promise(resolve => setTimeout(resolve, 750));
//             console.log(`Added seat ${number}, row ${row}, id ${id}`);
//             const newTooltip = `tooltip for id-${id} added by callback`;
//             addCb(row, number, id, newTooltip);
//             setLoading(false);
//         }

//     };

//     const removeSeatCallback = ({ row, number, id }, removeCb) => {

//         setLoading(true);

//         async () => {
//             await new Promise(resolve => setTimeout(resolve, 1500));
//             console.log(`Removed seat ${number}, row ${row}, id ${id}`);
//             // A value of null will reset the tooltip to the original while '' will hide the tooltip
//             const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
//             removeCb(row, number, newTooltip);
//             setLoading(false);
//         }

//     };


//     const rows = [
//         [
//             { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
//             { id: 2, number: 2, tooltip: "Cost: 15$" },
//             null,
//             {
//                 id: 3,
//                 number: "3",
//                 isReserved: true,
//                 orientation: "east",
//                 tooltip: "Reserved by Rogger"
//             },
//             { id: 4, number: "4", orientation: "west" },
//             null,
//             { id: 5, number: 5 },
//             { id: 6, number: 6 }
//         ],
//         [
//             {
//                 id: 7,
//                 number: 1,
//                 isReserved: true,
//                 tooltip: "Reserved by Matthias Nadler"
//             },
//             { id: 8, number: 2, isReserved: true },
//             null,
//             { id: 9, number: "3", isReserved: true, orientation: "east" },
//             { id: 10, number: "4", orientation: "west" },
//             null,
//             { id: 11, number: 5 },
//             { id: 12, number: 6 }
//         ],
//         [
//             { id: 13, number: 1 },
//             { id: 14, number: 2 },
//             null,
//             { id: 15, number: 3, isReserved: true, orientation: "east" },
//             { id: 16, number: "4", orientation: "west" },
//             null,
//             { id: 17, number: 5 },
//             { id: 18, number: 6 }
//         ],
//         [
//             { id: 19, number: 1, tooltip: "Cost: 25$" },
//             { id: 20, number: 2 },
//             null,
//             { id: 21, number: 3, orientation: "east" },
//             { id: 22, number: "4", orientation: "west" },
//             null,
//             { id: 23, number: 5 },
//             { id: 24, number: 6 }
//         ],
//         [
//             { id: 25, number: 1, isReserved: true },
//             { id: 26, number: 2, orientation: "east" },
//             null,
//             { id: 27, number: "3", isReserved: true },
//             { id: 28, number: "4", orientation: "west" },
//             null,
//             { id: 29, number: 5, tooltip: "Cost: 11$" },
//             { id: 30, number: 6, isReserved: true }
//         ]
//     ];

//     return (
//         <View>
//             <Text>Seat Picker</Text>
//             <View style={{ marginTop: "100px" }}>
//                 <SeatPicker
//                     addSeatCallback={addSeatCallback}
//                     removeSeatCallback={removeSeatCallback}
//                     rows={rows}
//                     maxReservableSeats={3}
//                     alpha
//                     visible
//                     selectedByDefault
//                     loading={loading}
//                     tooltipProps={{ multiline: true }}
//                 />
//             </View>
//             <Text>Seat Picker Continuous Case</Text>
//             <View style={{ marginTop: "100px" }}>
//                 <SeatPicker
//                     addSeatCallback={addSeatCallbackContinousCase}
//                     removeSeatCallback={removeSeatCallback}
//                     rows={rows}
//                     maxReservableSeats={3}
//                     alpha
//                     visible
//                     selectedByDefault
//                     loading={loading}
//                     tooltipProps={{ multiline: true }}
//                     continuous
//                 />
//             </View>
//         </View>
//     );
// }

// export default TicketSelectPage;