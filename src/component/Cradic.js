import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../contacts/thems'
import { images } from '../contacts/images'
import Entypo from 'react-native-vector-icons/Entypo'
import { addPay,addPayAll } from '../firebase/pay'

const Cradic = ({ item,action }) => {
  const [visible, setVisible] = useState(false)
  const [pay, setPay] = useState('')
  const handleOnPress = () => {
    addPay(item, pay)
    setVisible(false)
  }
  const deleteHandle = () => {
    addPayAll(item)
    setVisible(false)
  }
  return (
     <View style={styles.item}>
      <View style={styles.userImage}>
         <TouchableOpacity onPress={()=>setVisible(true)} >
          <Image style={styles.image} source={images(item.customer)} resizeMode="stretch" />
          </TouchableOpacity>
        <Text style={styles.name}>{ item.cradicAmount} Kyats</Text>
      </View>
      <View style={styles.wapper}>
              <View style={styles.accountText}>
                  <Text style={{color:COLORS.black}}>Customer</Text>
                  <Text style={{color:COLORS.black}}>    : {item.customer}</Text>
              </View>
              <View style={styles.accountText}>
                  <Text style={{color:COLORS.black}}>Operator</Text>
                  <Text style={{color:COLORS.black}}>      : {item.operator}</Text>
              </View>
              <View style={styles.accountText}>
                  <Text style={{color:COLORS.black}}>Option</Text>
                  <Text style={{color:COLORS.black}}>          : {item.option}</Text>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{color:COLORS.black}}>Refund</Text>
                  <Text style={{ color:COLORS.black }}>         :  </Text>
                  <View style={styles.wapperText}>
            <Text style={{ color: COLORS.black }}>{ item.description}</Text>
                  </View>
              </View>
      </View>
      <Modal transparent visible={visible}>
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity style={styles.modalHeader} onPress={()=>setVisible(false)}>
            <Entypo name='circle-with-cross' size={30} color={COLORS.black} />
          </TouchableOpacity>
          <View style={{ width: '100%', alignContent: 'center' }}>
          <TextInput  value={pay}
                  placeholder='Pay Amount'
                  keyboardType={'number-pad'}
                  onChangeText={(value)=>setPay(value)}
          style={{
            color:COLORS.black,
            padding:10,
            backgroundColor:COLORS.white,
            borderRadius:5,
            paddingVertical:5,
            borderBottomWidth: 1,
            borderBottomColor:COLORS.primary
            }} />


                <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={deleteHandle}
                        style={styles.buttom}>
                        <Text style={{fontSize:16,fontWeight:'bold',color:'#fff'}}>All</Text>
                    </TouchableOpacity>
                        <TouchableOpacity onPress={handleOnPress}
                          style={styles.buttom}>
                        <Text style={{fontSize:16,fontWeight:'bold',color:'#fff'}}>Pay</Text>
                    </TouchableOpacity>
                </View> 
                </View>
               
          </View>
        </View>
      </View>
        </View>
      </Modal>
    </View>
  )
}

export default Cradic

const styles = StyleSheet.create({
  item: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        marginBottom:20,
        borderRadius:10,
        backgroundColor:COLORS.white,
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
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    wapper: {
        flex: 2,
        justifyContent: 'center',
        alignItems:'center'
    },
    image: {
        width:60,
        height:60,
        borderRadius:50,
        margin:10,
    },
    name: {
        fontSize: 13,
        padding: 10,
        color:COLORS.black
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color:COLORS.black
    },
    accountText: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        margin: 5,
        color:COLORS.black
  },
    personWapper: {
        flexDirection: 'row',
        alignItems:'center',
  },
    wapperText:{
        flex:1,
        marginLeft:15,
        justifyContent:'center',
  },
    modalBackground:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.1)',
    justifyContent:'center',
    alignItems:'center',
  },
  modalContainer:{
    width:'80%',
    backgroundColor:COLORS.white,
    padding:20,
    borderRadius:15,
    elevation:20,
  },
  modalHeader:{
    width:'100%',
    height:40,
    alignItems:'flex-end',
    justifyContent:'center',
  },
  buttom: {
        paddingVertical:5,
        borderWidth:1.5,
        borderRadius:5,
        alignItems:"center",
        marginVertical: 5,
        width: 60,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        marginRight: 20
        
  }
})