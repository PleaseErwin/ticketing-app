import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import HomePage from '../pages/Home/HomePage';
import TicketingPage from '../pages/Ticket/TicketingPage';
import TransactionPage from '../pages/Transaction/TransactionPage';
import MyPage from '../pages/Etc/MyPage';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="home"
        component={HomePage}
        options={{
          tabBarLabel: '홈',
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            return ( focused ? <Icon name="home" size={size} color={color} /> : <Icon name="home-outline" size={size} color={color} />);
          },
        }}
      />
      <Tab.Screen
        name="ticketing"
        component={TicketingPage}
        options={{
          tabBarLabel: '예매',
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            return ( focused ? <Icon name="ticket" size={size} color={color} /> : <Icon name="ticket-outline" size={size} color={color} />);
          },
        }}
      />
      <Tab.Screen
        name="transaction"
        component={TransactionPage}
        options={{
          tabBarLabel: '거래',
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            return ( focused ? <Icon name="handshake" size={size} color={color} /> : <Icon name="handshake-outline" size={size} color={color} />);
          },
        }}
      />
      <Tab.Screen
        name="myPage"
        component={MyPage}
        options={{
          tabBarLabel: '더보기',
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            return ( focused ? <Icon name="account-settings" size={size} color={color} /> : <Icon name="account-settings-outline" size={size} color={color} />);
          },
        }}
      />
    </Tab.Navigator>

  );
}

export default MainNavigator;