import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '../contacts/images'
import { COLORS } from '../contacts/thems'

const Payment = ({ items }) => {
  return (
    <View style={styles.item}>
      <View style={styles.userImage}>
         <TouchableOpacity onPress={()=>setVisible(true)} >
          <Image style={styles.image} source={images(items.item.customer)} resizeMode="stretch" />
          </TouchableOpacity>
        <Text style={styles.name}>{ items.pay} Kyats</Text>
      </View>
      <View style={styles.wapper}>
              <View style={styles.accountText}>
                  <Text style={{color:COLORS.black}}>Customer</Text>
                  <Text style={{color:COLORS.black}}>    : {items.item.customer}</Text>
              </View>
              <View style={styles.accountText}>
                  <Text style={{color:COLORS.black}}>Operator</Text>
                  <Text style={{color:COLORS.black}}>      : {items.item.operator}</Text>
              </View>
              <View style={styles.accountText}>
                  <Text style={{color:COLORS.black}}>Option</Text>
                  <Text style={{color:COLORS.black}}>          : {items.item.option}</Text>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{color:COLORS.black}}>Date    </Text>
                  <Text style={{ color:COLORS.black }}>         :  </Text>
                  <View style={styles.wapperText}>
            <Text style={{ color: COLORS.black ,fontSize:12}}>{items.month} {items.day}, {items.year} {items.time}</Text>
                  </View>
              </View>
      </View>
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:20,
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
        marginLeft:5,
        justifyContent:'center',
  },
})