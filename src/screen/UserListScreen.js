import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../contacts/thems'
import Header from '../component/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import UserList from '../component/UserList'
import NoData from '../component/NoData';
import Apploder from '../component/Apploder'
import firestore from '@react-native-firebase/firestore'

const UserListScreen = ({ navigation }) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const getAllTransfer = async() => {
    setLoading(true)
    setRefreshing(true)
    firestore().collection('user').where('deleted','==',false)
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
      <Header title='User Lists'>
        <Ionicons name="md-list-outline" size={25} style={styles.icon} onPress={() => {navigation.navigate('UserAmountUpdateList')}} />
        <Ionicons name="person-add" size={25} style={styles.icon} onPress={() => {navigation.navigate('UserCreateScreen')}} />
      </Header>
      {data.length==0&&<NoData/>}
      {loading&&<Apploder/>}
      <FlatList
        data={data}
        onRefresh={getAllTransfer}
        refreshing={refreshing}
        keyExtractor={item=>item.id}
        renderItem={({item})=><UserList navigation={navigation} item={item}/>}
        contentContainerStyle={{padding:20}}
      />

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