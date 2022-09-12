import { StyleSheet, View } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

export default function Apploder() {
  return (
    <View style={[StyleSheet.absoluteFillObject,styles.container]}>
      <Lottie source={require('./loader.json')} autoPlay loop />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        zIndex:1,
        backgroundColor:'rgba(0,0,0,0.6)'
    }
})