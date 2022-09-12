import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../contacts/thems'

const NoData = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Data not found!</Text>
    </View>
  )
}

export default NoData

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:100,
        borderRadius:10,
        backgroundColor:COLORS.lightGray+90,
        shadowColor:COLORS.black,
        shadowOffset:{
          width:0,
          height:10,
        },
        shadowOpacity:0.3,
        shadowRadius:20,
        padding:10,
        margin:20
      },
      text:{
        fontSize:20,
        fontWeight:'bold',
        paddingVertical:30,
        color:COLORS.black+50
      }
})