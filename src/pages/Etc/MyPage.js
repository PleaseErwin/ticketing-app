import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Card, Text, List, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Styled Components 설치해서 일괄 적용? 높이 말고도 글씨 크기도 나중에 변경

const MyPage = () => {
    const navigation = useNavigation();

    return (<View style={{ flex: 1 }}>
        <Card contentStyle={styles.box}>
            <Card.Content>
                <Text variant="headlineLarge">이름</Text>
                <Text variant="headlineSmall" style={{textAlign: 'right'}}>0.XXX ETH</Text>
            </Card.Content>
        </Card>
        <List.Item onPress={() => navigation.navigate('MyTransaction', { })} title="거래 내역" 
        style={{height: 60, justifyContent: 'center'}}/>
        <Divider />
        <List.Item onPress={() => navigation.navigate('MyApply', { })} title="응모 내역" 
        style={{height: 60, justifyContent: 'center'}}/>
        <Divider />
        <List.Item onPress={() => { }} title="비밀번호 설정" 
        style={{height: 60, justifyContent: 'center'}}/>
        <Divider />
        <List.Item onPress={() => { }} title="키워드 설정" 
        style={{height: 60, justifyContent: 'center'}}/>
        <Divider />
        <List.Item onPress={() => { }} title="코인 충전" 
        style={{height: 60, justifyContent: 'center'}}/>
        <Divider />
        <List.Item onPress={() => navigation.navigate('Logout', { })} title="로그아웃" 
        style={{height: 60, justifyContent: 'center'}}/>
        <Divider />
    </View>
    );
};

const styles = StyleSheet.create({
    box: {
        margin: 20
    }
});

export default MyPage;