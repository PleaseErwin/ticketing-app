import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-paper';

const LocationGuide = ({ route }) => {
    
    return (
        <View style={styles.container}>
            <View style={{ margin: 25, flex: 1 }}>
                <View style={{ flex: 2 }}>
                    <Text style={{ fontWeight: 'bold' }} variant="titleMedium">장소안내</Text>
                    <View style={{ backgroundColor: 'whitesmoke', marginTop: 10, marginBottom: 20, padding: 15, borderRadius: 7 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text variant="titleSmall">장소</Text><Text variant="titleSmall">고척스카이돔</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text variant="titleSmall">주소</Text><Text variant="titleSmall">서울특별시 구로구 경인로 430</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text variant="titleSmall">주차</Text><Text variant="titleSmall">주차불가(인근 주차장 이용 권장)</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 4 }}>
                    <Image style={styles.imageStyle} source={require('../../../src/assets/mapSample.png')}></Image>
                </View>

                <View style={{ flex: 3 }}></View>
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
        height: '100%',
    }
});

export default LocationGuide;