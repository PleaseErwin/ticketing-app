import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginStackNavigator from './LoginStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import InitialPage from '../pages/InitialPage';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="InitialPage" component={InitialPage} options={{headerShown: false}} />
            <Stack.Screen name="LoginStackNavigator" component={LoginStackNavigator} options={{headerShown: false}} />
            <Stack.Screen name="MainStackNavigator" component={MainStackNavigator} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

export default StackNavigator;