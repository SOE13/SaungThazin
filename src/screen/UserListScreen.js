import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../contacts/thems'
import Header from '../component/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'

const UserListScreen = ({navigation}) => {
  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroung }}>
      <Header title='User Lists'>
        <Ionicons name="person-add" size={25} style={styles.icon} onPress={() => {navigation.navigate('UserCreateScreen')}} />
      </Header>
    </SafeAreaView>
  )
}

export default UserListScreen

const styles = StyleSheet.create({
  icon:{
    marginRight:10,
    marginLeft:10,
    color:COLORS.white,
  }
  
})