import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainNavigator from './MainNavigator';

import HomePage from '../pages/Home/HomePage';
import ShowInfo from '../pages/Home/ShowInfo';

import TicketingPage from '../pages/Ticket/TicketingPage';
import TicketApplyPage from '../pages/Ticket/TicketApplyPage';
import TicketBookingPage from '../pages/Ticket/TicketBookingPage';
import SeatSelectPage from '../pages/Ticket/SeatSelectPage';
import LocationGuide from '../pages/Ticket/LocationGuide';

import TransactionPage from '../pages/Transaction/TransactionPage';
import SellingTicketPage from '../pages/Transaction/SellingTicketPage';
import TicketBuyPage from '../pages/Transaction/TicketBuyPage';

import MyPage from '../pages/Etc/MyPage';
import MyTransaction from '../pages/Etc/MyTransactionContent/MyTransaction';
import MyApply from '../pages/Etc/MyApplyContent/MyApply';
import ShowApplyResult from '../pages/Etc/MyApplyContent/ShowApplyResult';
import PaymentPage from '../pages/Etc/MyApplyContent/PaymentPage';

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
            <MainStack.Screen name="TicketBookingPage" component={TicketBookingPage} options={{title: '상세 페이지'}}/>
            <MainStack.Screen name="SeatSelectPage" component={SeatSelectPage} options={{title: '좌석 선택 페이지'}}/>
            <MainStack.Screen name="LocationGuide" component={LocationGuide} options={{title: ''}}/>

            <MainStack.Screen name="TransactionPage" component={TransactionPage} options={{headerShown: false}} />
            <MainStack.Screen name="SellingTicketPage" component={SellingTicketPage} options={{title: '거래 가능 티켓 목록'}} />
            <MainStack.Screen name="TicketBuyPage" component={TicketBuyPage} options={{title: '상세 페이지'}}/>

            <MainStack.Screen name="MyPage" component={MyPage} options={{headerShown: false}} />
            <MainStack.Screen name="MyTransaction" component={MyTransaction} options={{title: '거래 목록'}}/>
            <MainStack.Screen name="MyApply" component={MyApply} options={{title: '응모 목록'}}/>
            <MainStack.Screen name="ShowApplyResult" component={ShowApplyResult} options={{title: '결과 확인'}}/>
            <MainStack.Screen name="PaymentPage" component={PaymentPage} options={{title: '결제창'}}/>

            <MainStack.Screen name="ModifyPassword" component={ModifyPassword} options={{title: '비밀번호 설정'}}/>
            <MainStack.Screen name="Logout" component={Logout} options={{title: '로그아웃'}}/>
        </MainStack.Navigator>
    );
}

export default MainStackNavigator;