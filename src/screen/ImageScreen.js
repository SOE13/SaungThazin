import { Image, ScrollView, StyleSheet} from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { COLORS } from '../contacts/thems'
import { Dimensions } from 'react-native';

const ImageScreen = ({navigation,route}) => {
    let url=route.params.url
  return (
    <ScrollView style={styles.container}>
      <EvilIcons name='arrow-left' size={40} color={COLORS.black} onPress={()=>navigation.goBack()}/>
      <Image resizeMode='stretch' style={styles.image} source={{uri:url}}/>
    </ScrollView>
  )
}

export default ImageScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.backgroung,
        padding:10,
    },
    image:{
        width:'100%', 
        height:Dimensions.get('window').height-70,
        marginTop:10,
        borderRadius:10
    }
})