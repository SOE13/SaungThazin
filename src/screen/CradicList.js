import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../contacts/thems'
import Header from '../component/Header'
import NoData from '../component/NoData';
import Apploder from '../component/Apploder'
import firestore from '@react-native-firebase/firestore'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Cradic from '../component/Cradic';

const CradicList = ({navigation}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    

     const getAllUsers = async() => {
    setLoading(true)
    setRefreshing(true)
    firestore().collection('cradic').orderBy('date','desc')
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
    getAllUsers()
  },[])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroung }}>
       <Header title='Cradic List'>
        <Ionicons name="md-list-outline" size={25} style={styles.icon} onPress={()=>navigation.navigate('PaymentListScreen')} />
       </Header>
      {data.length==0&&<NoData/>}
      {loading && <Apploder />}
          
      <FlatList
        data={data}
        onRefresh={getAllUsers}
        refreshing={refreshing}
        keyExtractor={item=>item.id}
        renderItem={({item})=><Cradic action={getAllUsers} item={item}/>}
        contentContainerStyle={{padding:20}}
      />
    </SafeAreaView>
  )
}

export default CradicList

const styles = StyleSheet.create({
    icon:{
    marginRight:10,
    marginLeft:10,
    color:COLORS.white,
  }
})