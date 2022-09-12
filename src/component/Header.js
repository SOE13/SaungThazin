import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../contacts/thems'

const Header = ({children,title}) => {
  const navigation=useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{title}</Text>
      <View style={styles.iconContainer}>
        {children}
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:20,
        height:60,
        backgroundColor:COLORS.primary,
    },
    logo:{
       fontSize:30,
       color:COLORS.white,
    },
    iconContainer:{
        flexDirection:'row',
    },
    icon:{
        marginRight:10,
        marginLeft:10,
        color:COLORS.white,
    }
})