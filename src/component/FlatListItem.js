import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../contacts/thems';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { images } from '../contacts/images'
import { TouchableOpacity } from 'react-native-gesture-handler';


function commify(n) {
  var parts = n.toString().split(".");
  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
}

const FlatListItem = ({item,navigation}) => {
  if(item.imageUri!==''){
    return (
      <TouchableOpacity onPress={()=>navigation.navigate("ImageScreen",{url:item.imageUri})} style={styles.item}>
          <View style={styles.wrapIcon}>
          <Image style={styles.image} source={images(item.from)} resizeMode="contain"/> 
          <View style={styles.icon}>
               <MaterialCommunityIcons name='chevron-triple-right' color={COLORS.listText} size={20}/>
          </View>
          <Image style={styles.image} source={images(item.to)} resizeMode="contain"/> 
          </View>
           <View style={styles.wapperText}>
            <Text style={{fontSize:16,fontWeight:'bold',color:COLORS.black}}>{commify(item.amount)+' '}MMK</Text>
            <Text style={{fontSize:14,color:COLORS.listText}}>{item.name}</Text>
            <Text style={{fontSize:12,color:COLORS.listText}}>{item.month} {item.day}, {item.year} {item.time}</Text>
          </View>
        </TouchableOpacity>
    )
  }else{
    return (
      <View style={styles.item}>
          <View style={styles.wrapIcon}>
          <Image style={styles.image} source={images(item.from)} resizeMode="contain"/> 
          <View style={styles.icon}>
               <MaterialCommunityIcons name='chevron-triple-right' color={COLORS.listText} size={20}/>
          </View>
          <Image style={styles.image} source={images(item.to)} resizeMode="contain"/> 
          </View>
           <View style={styles.wapperText}>
            <Text style={{fontSize:16,fontWeight:'bold',color:COLORS.black}}>{commify(item.amount)+' '}MMK</Text>
            <Text style={{fontSize:14,color:COLORS.listText}}>{item.name}</Text>
            <Text style={{fontSize:12,color:COLORS.listText}}>{item.month} {item.day}, {item.year} {item.time}</Text>
          </View>
        </View>
    )
  }
 
}

export default FlatListItem

const styles = StyleSheet.create({
      image:{
        width:50,
        height:50,
        borderRadius:15,
        borderColor:COLORS.black,
        borderWidth:0.1
      },
      wapperText:{
        flex:1,
        marginLeft:15,
        justifyContent:'center',
      },
      item:{
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
      wrapIcon:{
        alignItems:'center',
        flexDirection:'row',
        marginLeft:5,
        width:'45%',
      },
      icon:{
        marginHorizontal:10
      }
})