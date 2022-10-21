import {StatusBar} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from './src/contacts/thems'
import MainStackNavigator from './src/navigator/MainStackNavigator'
import firestore from '@react-native-firebase/firestore'

 const App=()=> {
   firestore().collection('user').doc('ABC0123456789').get().then(documentSnapshot => {
     if (!documentSnapshot.exists) {
       firestore().collection('user').doc('ABC0123456789')
         .set({
           name: "Counter",
           account: "Counter",
           accountNo:"Counter",
           imageUri: "",
           amount: 0,
           deleted: false
         })
  .then(() => {
    console.log('User added!');
  });
     }
   })
   

  return (
      <NavigationContainer>
        <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.backgroung}/>
        <MainStackNavigator/>
      </NavigationContainer>
  )
}

export default App;