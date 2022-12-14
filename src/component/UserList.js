import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '../contacts/images'
import { COLORS } from '../contacts/thems';

const UserList = ({ item, navigation,children,status }) => {
    const handleOnPress = (id) => {
        navigation.navigate('UserEditScreen',{id:id})
    }
  return (
      <View style={styles.item}>
          {children === undefined ?
              <View style={styles.userImage}> 
                {
                    item.imageUri ?
                        <TouchableOpacity onPress={()=>handleOnPress(item.id)} >
                            <Image resizeMode='stretch' style={styles.image} source={{ uri: item.imageUri }} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=>handleOnPress(item.id)} >
                            <Image style={styles.image} source={images('user')} resizeMode="stretch" />
                        </TouchableOpacity>
                }
              <Text style={styles.name}>{ item.name}</Text>
              </View> :
              <View style={styles.userImage}>
                {
                    item.imageUri ?
                            <Image resizeMode='stretch' style={styles.image} source={{ uri: item.imageUri }} />
                        :
                            <Image style={styles.image} source={images('user')} resizeMode="stretch" />
                }
              <Text style={styles.name}>{ item.name}</Text>
              </View>
        }
          
          <View style={styles.wapper}>
              {status ? <Text style={styles.amount}>{item.amount > 0 && '+'}
                  {item.amount} Kyats</Text>
                  :
                  <Text style={styles.amount}>{item.amount} Kyats</Text>
              }              
              <View style={styles.accountText}>
                  <Text style={{color:COLORS.black}}>Account</Text>
                  <Text style={{color:COLORS.black}}>        : {item.account}</Text>
              </View>
              <View style={styles.accountText}>
                  <Text style={{color:COLORS.black}}>Account No</Text>
                  <Text style={{color:COLORS.black}}>  : {item.accountNo}</Text>
              </View>
              <View style={styles.accountText}>
                  {children}
              </View>
          </View>
      </View>
  )
}

export default UserList

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
        flex: 2,
        justifyContent: 'center',
        alignItems:'center'
    },
    wapper: {
        flex: 3,
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
    accountText: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        margin: 5,
        color:COLORS.black
    },
})