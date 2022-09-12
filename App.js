import {StatusBar} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from './src/contacts/thems'
import MainStackNavigator from './src/navigator/MainStackNavigator'

 const App=()=> {

  return (
      <NavigationContainer>
        <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.backgroung}/>
        <MainStackNavigator/>
      </NavigationContainer>
  )
}

export default App;