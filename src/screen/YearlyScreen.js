import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../contacts/thems'
import Header from '../component/Header'
import NoData from '../component/NoData';
import Apploder from '../component/Apploder'
import firestore from '@react-native-firebase/firestore'
import Profit from '../component/Profit';

const YearlyScreen = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

   const getAllProfit = async() => {
    setLoading(true)
    setRefreshing(true)
    firestore().collection('yearlyProfit').orderBy('createdAt', 'desc')
      .get().then((querySnapshot) => {
          let temp=[]
          querySnapshot.forEach((doc) => {
            temp.push({ id: doc.id, ...doc.data() })
          })
          setData(temp)
          setLoading(false)
      }, e => {console.log(e)})
    setRefreshing(false)
  }

  useEffect(() => {
    getAllProfit()
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroung }}>
      <Header title='Yearly' />
      
      {data.length==0&&<NoData/>}
      {loading && <Apploder />}

       <FlatList
        data={data}
        onRefresh={getAllProfit}
        refreshing={refreshing}
        keyExtractor={item=>Math.random()}
        renderItem={({ item }) => <Profit item={item} children={<Text style={{ color: COLORS.black, fontSize: 12, textAlign: 'right' }}>{ item.year}</Text>} />}
        contentContainerStyle={{padding:20}}
      />

    </SafeAreaView>
  )
}

export default YearlyScreen

const styles = StyleSheet.create({})