import * as React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const MyApply = () => {
    const navigation = useNavigation();

    const [applyList, setApplyList] = React.useState([]);

    React.useEffect(() => {
        const load = async () => {
          try {
            token = await AsyncStorage.getItem('token');
    
            const variables = {
            }
    
            Axios.post('http://3.37.125.95:3000/applyList', variables, {headers:{authorization: token}})
              .then(response => {
                if (response.data.success) {
                    setApplyList(response.data.data);
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

    let itemView = (applyList.length > 0 ? ticketList.map((item, index) => {
        return (
            <Card style={styles.box} key={index} onPress={() => {}}>
                <Card.Content style={{ margin: 10 }}>
                    <Text variant="titleLarge">{item.showname}</Text>
                    <Text />
                    <View style={{ flexDirection: 'row' }}>
                        <Text variant="bodyLarge">{item.showtime}</Text>
                        <Text variant="bodyLarge" style={{ flex: 1, textAlign: 'right' }}>{item.ticketPrice}</Text>
                    </View>
                </Card.Content>
            </Card>
        );
    }) : <View><Text>응모 내역이 없습니다.</Text></View>)

    return (
        <ScrollView contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
            {itemView}
        </ScrollView>
    );
}

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

export default MyApply;