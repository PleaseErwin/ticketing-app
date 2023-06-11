import React from 'react';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './src/components/StackNavigator';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    //primaryContainer: 'white'
    //primary: '#034748',
    //accent: '#11B5E4',
    background: 'white',
    //surface: '#F1F7ED',
    //text: '#001021',
    //error: '#B71F0E',
    //disabled: '#BEC6C6',
    //placeholder: '#1481BA',
    //backdrop: '#001021',
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App;