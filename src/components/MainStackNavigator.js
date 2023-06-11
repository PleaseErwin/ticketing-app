import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainNavigator from './MainNavigator';

import HomePage from '../pages/Home/HomePage';
import ShowInfo from '../pages/Home/ShowInfo';

import TicketingPage from '../pages/Ticket/TicketingPage';
import TicketApplyPage from '../pages/Ticket/TicketApplyPage';

import TransactionPage from '../pages/Transaction/TransactionPage';
import TicketBuyPage from '../pages/Transaction/TicketBuyPage';

import MyPage from '../pages/Etc/MyPage';
import MyTransaction from '../pages/Etc/MyTransaction';
import MyApply from '../pages/Etc/MyApplyContent/MyApply';
import ModifyPassword from '../pages/Etc/ModifyPassword';
import Logout from '../pages/Etc/Logout';

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="MainNavigator" component={MainNavigator} options={{headerShown: false}} />

            <MainStack.Screen name="HomePage" component={HomePage} options={{headerShown: false}} />
            <MainStack.Screen name="ShowInfo" component={ShowInfo} options={{title: '공연 정보'}}/>

            <MainStack.Screen name="TicketingPage" component={TicketingPage} options={{headerShown: false}} />
            <MainStack.Screen name="TicketApplyPage" component={TicketApplyPage} options={{title: '상세 페이지'}}/>

            <MainStack.Screen name="TransactionPage" component={TransactionPage} options={{headerShown: false}} />
            <MainStack.Screen name="TicketBuyPage" component={TicketBuyPage} options={{title: '상세 페이지'}}/>

            <MainStack.Screen name="MyPage" component={MyPage} options={{headerShown: false}} />
            <MainStack.Screen name="MyTransaction" component={MyTransaction} options={{title: '거래 목록'}}/>
            <MainStack.Screen name="MyApply" component={MyApply} options={{title: '응모 목록'}}/>
            <MainStack.Screen name="ModifyPassword" component={ModifyPassword} options={{title: '비밀번호 설정'}}/>
            <MainStack.Screen name="Logout" component={Logout} options={{title: '로그아웃'}}/>
        </MainStack.Navigator>
    );
}

export default MainStackNavigator;