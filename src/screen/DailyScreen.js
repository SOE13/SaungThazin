import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../contacts/thems'
import Header from '../component/Header'
import NoData from '../component/NoData';
import Apploder from '../component/Apploder'
import firestore from '@react-native-firebase/firestore'
import Profit from '../component/Profit';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons'

const DailyScreen = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

   const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false)

   const onChange = (event, selectedDate) => {
   const currentDate = selectedDate;
   setShow(false)
   setDate(currentDate);
   setLoading(true)
    let year = currentDate.getFullYear();
      const tempMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      let month = tempMonth[currentDate.getMonth()];
      let day = currentDate.getDate()
      firestore()
            .collection('dailyProfit').where('day', '==', day).where('month', '==', month)
            .where('year', '==', year)
            .orderBy('createdAt', 'desc').get()
        .then((querySnapshot) => {
              console.log(querySnapshot)
              let temp = []
              querySnapshot.forEach((doc) => {
                temp.push(doc.data())
              })
              setData(temp)
              setLoading(false)
              setShow(false);
            })
  };


   const getAllProfit = async() => {
    setLoading(true)
    setRefreshing(true)
    firestore().collection('dailyProfit').orderBy('createdAt', 'desc')
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
      <Header title='Daily'>
        <Ionicons name="search" size={25} style={styles.icon} onPress={() => setShow(true)} />
      </Header>

       {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          onChange={onChange}
        />
      )}
      
      {data.length==0&&<NoData/>}
      {loading && <Apploder />}

       <FlatList
        data={data}
        onRefresh={getAllProfit}
        refreshing={refreshing}
        keyExtractor={item=>Math.random()}
        renderItem={({ item }) => <Profit item={item} children={<Text style={{ color: COLORS.black, fontSize: 12, textAlign: 'right' }}>{item.month} {item.day}, {item.year} </Text>} />}
        contentContainerStyle={{padding:20}}
      />

    </SafeAreaView>
  )
}

export default DailyScreen

const styles = StyleSheet.create({
   icon:{
    marginRight:10,
    marginLeft:10,
    color:COLORS.white,
  }
})