import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../contacts/thems'
import Header from '../component/Header'
import NoData from '../component/NoData';
import Apploder from '../component/Apploder'
import firestore from '@react-native-firebase/firestore'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HomeScreen = ({navigation}) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroung }}>
      <Header title='Saung Thazin'>
        <Ionicons name="add-circle-outline" size={25} style={styles.icon} onPress={()=>navigation.navigate('TransferCreateScreen')} />
        <Ionicons name="search" size={25} style={styles.icon} onPress={() => {}} />
      </Header>
      {data.length==0&&<NoData/>}
      {loading && <Apploder />}
      

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
   icon:{
    marginRight:10,
    marginLeft:10,
    color:COLORS.white,
  }
})