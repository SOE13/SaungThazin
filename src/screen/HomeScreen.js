import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../contacts/thems'
import Header from '../component/Header'
import NoData from '../component/NoData';
import Apploder from '../component/Apploder'
import firestore from '@react-native-firebase/firestore'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import TransferList from '../component/TransferList'
import DateTimePicker from '@react-native-community/datetimepicker';

const HomeScreen = ({navigation}) => {

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
            .collection('transition').where('day', '==', day).where('month', '==', month)
            .where('year', '==', year)
            .orderBy('date', 'desc').get()
            .then((querySnapshot) => {
              let temp = []
              querySnapshot.forEach((doc) => {
                temp.push(doc.data())
              })
              setData(temp)
              setLoading(false)
              setShow(false);
            })
  };

  const getAllTransfer = async() => {
    setLoading(true)
    setRefreshing(true)
    firestore().collection('transition').orderBy('date', 'desc').limit(15)
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
    getAllTransfer()
  },[])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroung }}>
      <Header title='Saung Thazin'>
        <Ionicons name="add-circle-outline" size={25} style={styles.icon} onPress={()=>navigation.navigate('TransferCreateScreen')} />
        <AntDesign name="book" size={25} style={styles.icon} onPress={()=>navigation.navigate('CradicListScreen')} />
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
        onRefresh={getAllTransfer}
        refreshing={refreshing}
        keyExtractor={item=>Math.random()}
        renderItem={({item})=><TransferList onPressHandle={getAllTransfer} navigation={navigation} item={item}/>}
        contentContainerStyle={{padding:20}}
      />

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