import * as React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import CarouselCards from '../../components/CarouselCards';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import Loading from '../../components/Loading';

const HomePage = () => {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(null);

    React.useEffect(() => {
        console.log('홈페이지 등장');

        const load = async () => {
            setLoading(true);
            try {
                wallet = await AsyncStorage.getItem('wallet_address');

                const variables = {
                    userAddr: wallet
                }
                await Axios.post('http://3.37.125.95:3000/home', variables)
                    .then(response => {
                        if (response.data.success) {
                            setData(response.data.data);
                        } else {
                            console.log('홈페이지 로딩 실패');
                        }
                    })
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        load();

    }, []);

    return (
        <View style={styles.container}>
            {loading ? <Loading /> : <CarouselCards data={data} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        flex: 1
    },
});

export default HomePage;