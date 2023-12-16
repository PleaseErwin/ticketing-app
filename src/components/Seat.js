import * as React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-paper';

const Seat = (props) => {
   
    const [selected, setSelectedState] = React.useState(props.state);// 이미 예매됨 / 선택안됨 / 선택됨 3가지

    const onChange = () => {
        if (selected === 333) {// 취소
            setSelectedState(222);
            props.onChangeCount(count => count - 1);
            props.onChangeSeat(props.seat.filter((seat) => seat !== props.location));
        }
        else {// 선택
            if (props.count === 4) {
                Alert.alert(
                    '알림',
                    '좌석은 최대 4석까지 선택 가능합니다.',
                    [
                        {
                            text: '확인',
                            onPress: () => {
                                return;
                            },
                            style: 'default',
                        },
                    ],
                    {
                        cancelable: true,
                        onDismiss: () => { },
                    },
                );
            }
            else {
                setSelectedState(333);
                props.onChangeCount(count => count + 1);
                props.onChangeSeat([...props.seat, props.location])
            }
        }
    }

    let seat = (selected === 111 ? <TouchableOpacity disabled>
        <View style={{
            width: 30, height: 40, margin: 5, backgroundColor: 'grey', elevation: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 5
        }}><Text>{props.location}</Text></View></TouchableOpacity>
        : selected === 222 ? <TouchableOpacity onPress={onChange}>
            <View style={{
                width: 30, height: 40, margin: 5, backgroundColor: 'white', elevation: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 5
            }}><Text>{props.location}</Text></View></TouchableOpacity>
            : <TouchableOpacity onPress={onChange}>
                <View style={{
                    width: 30, height: 40, margin: 5, backgroundColor: 'pink', elevation: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 5
                }}><Text>{props.location}</Text></View></TouchableOpacity>
    )

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {seat}
        </View>
    );
}

export default Seat;