import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import HomePage from '../pages/Home/HomePage';
import TicketingPage from '../pages/Ticket/TicketingPage';
import TransactionPage from '../pages/Transaction/TransactionPage';
import MyPage from '../pages/Etc/MyPage';

const HomeRoute = () => <HomePage/>;

const TicketingRoute = () => <TicketingPage/>;

const TransactionRoute = () => <TransactionPage/>;

const MyPageRoute = () => <MyPage/>;

const MainNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: '홈', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'ticketing', title: '예매', focusedIcon: 'ticket', unfocusedIcon: 'ticket-outline' },
    { key: 'transaction', title: '거래', focusedIcon: 'handshake', unfocusedIcon: 'handshake-outline' },
    { key: 'myPage', title: '더보기', focusedIcon: 'account-settings', unfocusedIcon: 'account-settings-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    ticketing: TicketingRoute,
    transaction: TransactionRoute,
    myPage: MyPageRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MainNavigator;