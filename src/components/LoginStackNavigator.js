import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login/Login';
import Membership from '../pages/Login/Membership';

const LoginStack = createNativeStackNavigator();

const LoginStackNavigator = () => {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <LoginStack.Screen name="Membership" component={Membership} options={{title: '회원가입'}} />
        </LoginStack.Navigator>
    );
}

export default LoginStackNavigator;