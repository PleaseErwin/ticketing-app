import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text, List, Button } from 'react-native-paper';

const MySoldOut = () => {
    const [item, setItem] = React.useState(0);

    return (
    <View style={styles.container}>
        {item.length > 0 ? <Text>양도완료 화면</Text> : <Text>데이터가 없습니다.</Text>}
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default MySoldOut;