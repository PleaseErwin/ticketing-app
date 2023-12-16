import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { TabView, TabBar } from 'react-native-tab-view';

import MyPurchase from './MyPurchase';
import MyOnSale from './MyOnSale';
import MySoldOut from './MySoldOut';

const FirstRoute = () => (
  <MyPurchase/>
);

const SecondRoute = () => (
  <MyOnSale/>
);

const ThirdRoute = () => (
  <MySoldOut/>
);

const renderScene = ({ route }) => {
  switch (route.key) {
    case 'first':
      return <FirstRoute />;
    case 'second':
      return <SecondRoute />;
    case 'third':
      return <ThirdRoute />;
    default:
      return null;
  }
};

const MyTransaction = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '구매' },
    { key: 'second', title: '양도중' },
    { key: 'third', title: '양도완료' }
  ]);

  return (
    <View style={{ flex: 1 }}>
      <Card contentStyle={{ margin: 40 }}>
        <Card.Content>
          
        </Card.Content>
      </Card>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => <TabBar {...props} 
        style={{backgroundColor: 'white'}}
        indicatorStyle={{backgroundColor: 'lavenderblush'}}
        renderLabel={({route, color}) => (
          <Text style={{color: 'black', margin: 15}}>{route.title}</Text>
        )}/>}
      />
    </View>
  );
}

export default MyTransaction;