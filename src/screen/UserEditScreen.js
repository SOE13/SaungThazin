import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import Apploder from '../component/Apploder'
import { COLORS } from '../contacts/thems'
import { images } from '../contacts/images'
import { updateAmountRecord } from '../firebase/userdatabase'

const UserEditScreen = ({ navigation, route }) => {
    let id = route.params.id

    const [name, setName] = useState('')
    const [account, setAccount] = useState('')
    const [accountNo, setAccountNo] = useState('')
    const [loading, setLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState('')
    const [amount, setAmount] = useState(0)
    const [tempAmount,setTempAmount]=useState(0)
    
    const saveHandle = async () => {
        setLoading(false)
        firestore()
            .collection('user')
            .doc(id)
            .update({ amount })
            .then(() => {
                setLoading(true)
                let record=amount-tempAmount
                updateAmountRecord(name,account,accountNo,imageUrl,record)
                navigation.goBack()
            });  
    }

    const deleteHandle = ()=>{
        Alert.alert('', 'Are you sure to delete this user?',
        [{text: "Cancel",},{text: "Ok",onPress: () => removeUser()},],{
        cancelable: true,})
    }

    const removeUser = async () => {
        setLoading(false)
        firestore()
            .collection('user')
            .doc(id)
            .update({deleted:true})
            .then(() => {
                setLoading(true)
                navigation.goBack()
            });
    }

    const getUser = async (id) => {
        setLoading(false)
        firestore()
            .collection('user')
            .doc(id)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    setName(documentSnapshot.data().name)
                    setAccount(documentSnapshot.data().account)
                    setAccountNo(documentSnapshot.data().accountNo)
                    setImageUrl(documentSnapshot.data().imageUri)
                    setAmount(documentSnapshot.data().amount)
                    setTempAmount(documentSnapshot.data().amount)
                    setLoading(true)
                }
            });
    }

    useEffect(() => {
        getUser(id)
    },[])
  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.item}>
              <View style={styles.userImage}>
                  {imageUrl ?
                      <Image resizeMode='stretch' style={styles.image} source={{ uri: imageUrl }} /> :
                      <Image style={styles.image} source={images('user')} resizeMode="stretch" />
                  }
                  <Text style={styles.name}>{name}</Text>
              </View>
              <View style={styles.wapper}>
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                      <TextInput value={amount.toString()} keyboardType={'number-pad'}
                        onChangeText={(value)=>setAmount(value)}
                        style={styles.amountInput} />
                      <Text style={styles.amount}> Kyats</Text>
                  </View>
                <View style={styles.accountText}>
                    <Text style={{color:COLORS.black}}>Account</Text>
                    <Text style={{color:COLORS.black}}>  : {account}</Text>
                </View>
                <View style={styles.accountText}>
                    <Text style={{color:COLORS.black}}>Account No</Text>
                    <Text style={{color:COLORS.black}}>  : {accountNo}</Text>
                </View>
            </View>
          </View>
          
          <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={deleteHandle}
                  style={{
                      ...styles.buttom, backgroundColor: '#ab0303',
                      borderColor: '#ab0303', marginRight: 20
                  }}>
                  <Text style={{fontSize:16,fontWeight:'bold',color:'#fff'}}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveHandle}
                  style={{
                      ...styles.buttom, backgroundColor: COLORS.primary,
                      borderColor: COLORS.primary,
                  }}>
                  <Text style={{fontSize:16,fontWeight:'bold',color:'#fff'}}>Save</Text>
              </TouchableOpacity>
          </View>
          
        
      {loading == false && <Apploder />}  
    </SafeAreaView>
  )
}

export default UserEditScreen

const styles = StyleSheet.create({
    container:{
    flex:1,
    backgroundColor:COLORS.backgroung,
    padding: 20,
    justifyContent: 'center',
    alignItems:'center'
    },
    item: {
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
        borderRadius:10,
        shadowColor:COLORS.black,
        shadowOffset:{
          width:0,
          height:10,
        },
        shadowOpacity:0.3,
        shadowRadius:20,
        padding:10,
    },
    userImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:20,
    },
    wapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width:100,
        height:100,
        borderRadius: 50,
        margin:10,
    },
    name: {
        fontSize: 15,
        padding: 10,
        color:COLORS.black
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color:COLORS.black
    },
    amountInput: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 14,
        color:COLORS.black
    },
    accountText: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        margin:5,
    },
    buttom: {
        paddingVertical:5,
        borderWidth:1.5,
        borderRadius:5,
        alignItems:"center",
        marginVertical: 5,
        width:60,
    }
})