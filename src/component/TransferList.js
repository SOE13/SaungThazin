import { Alert, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { COLORS } from '../contacts/thems'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { images } from '../contacts/images'
import firestore from '@react-native-firebase/firestore'

function commify(n) {
  var parts = n.toString().split(".");
  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
}

const TransferList = ({ item ,navigation}) => {
    const onLongPressHandle = () => {
         Alert.alert('', 'Aue you sure to Refund?',
        [{text: "Cancel",},{text: "Ok",onPress: () => edit()},],{
             cancelable: true,
         })
    }
    const onPress = () => {
        if (item.imageUri != "") {
            navigation.navigate("ImageScreen",{url:item.imageUri})
        }
    }
    const edit = () => {
        firestore()
            .collection('transition')
            .doc(item.id)
            .update({ status: true })
        firestore().collection('cradic').doc(item.id).delete()
        firestore()
            .collection('user')
                    .doc(item.formUser.id)
                    .get().then(documentSnapshot => {
                    if (item.option === 'Cash Out') {
                        let amount = documentSnapshot.data().amount - parseInt(item.fromAmount)
                        firestore()
                            .collection('user')
                            .doc(item.formUser.id)
                            .update({ amount })
                    } else {
                        let amount = documentSnapshot.data().amount + parseInt(item.fromAmount)
                        firestore()
                            .collection('user')
                            .doc(item.formUser.id)
                            .update({ amount })
                    }
                    })
    }
    if (item.status) {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.item}>
        <View style={styles.personWapper}>
              <View style={styles.userImage}>
                {
                    item.formUser.imageUri!=='' ?
                            <Image resizeMode='stretch' style={styles.image} source={{ uri: item.formUser.imageUri }} />
                        :
                            <Image style={styles.image} source={images('user')} resizeMode="stretch" />
                }
                  <Text style={styles.name}>{item.formUser.account }</Text>
              </View>
              <View style={styles.icon}>
                  <MaterialCommunityIcons name='chevron-triple-right' color={COLORS.listText} size={20}/>
              </View>
              <View style={styles.userImage}>
                  <Image style={styles.image} source={images(item.customer)} resizeMode="stretch" />
                  <Text style={styles.name}>{item.customer }</Text>
              </View>
          </View>
          <View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText,marginRight:40}}>Description</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 13, color: COLORS.listText }}>{item.description}</Text>
                  </View>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText,marginRight:68}}>Option</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 13, color: COLORS.listText }}>{item.option}</Text>
                  </View>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText,marginRight:30 }}>User Amount</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 13, color: COLORS.black }}>{commify(item.fromAmount) + ' '}Kyats</Text>
                  </View>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>Customer Amount</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 13, color: COLORS.black }}>{commify(item.toAmount) + ' '}MMK</Text>
                  </View>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText ,marginRight:75}}>Profit</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 13, color: COLORS.black }}>{commify(item.profit) + ' '}MMK</Text>
                  </View>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText ,marginRight:55}}>Operator</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 13, color: COLORS.listText }}>{item.operator}</Text>
                  </View>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText ,marginRight:65}}>Refund</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 12, color:"#ffcc00" }}>Yes</Text>
                  </View>
              </View>
                    
            <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText ,marginRight:79}}>Date</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 12, color: COLORS.listText }}>{item.month} {item.day}, {item.year} {item.time}</Text>
                  </View>
              </View>   
          </View>
                </View>
                </TouchableWithoutFeedback>
  )
    } else {
        return (
            <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPressHandle}>
                <View style={styles.item}>
        <View style={styles.personWapper}>
              <View style={styles.userImage}>
                {
                    item.formUser.imageUri!=='' ?
                            <Image resizeMode='stretch' style={styles.image} source={{ uri: item.formUser.imageUri }} />
                        :
                            <Image style={styles.image} source={images('user')} resizeMode="stretch" />
                }
                  <Text style={styles.name}>{item.formUser.account }</Text>
              </View>
              <View style={styles.icon}>
                  <MaterialCommunityIcons name='chevron-triple-right' color={COLORS.listText} size={20}/>
              </View>
              <View style={styles.userImage}>
                  <Image style={styles.image} source={images(item.customer)} resizeMode="stretch" />
                  <Text style={styles.name}>{item.customer }</Text>
              </View>
          </View>
          <View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText,marginRight:40}}>Description</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 13, color: COLORS.listText }}>{item.description}</Text>
                  </View>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText,marginRight:68}}>Option</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 13, color: COLORS.listText }}>{item.option}</Text>
                  </View>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText,marginRight:30 }}>User Amount</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 13, color: COLORS.black }}>{commify(item.fromAmount) + ' '}Kyats</Text>
                  </View>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>Customer Amount</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 13, color: COLORS.black }}>{commify(item.toAmount) + ' '}MMK</Text>
                  </View>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText ,marginRight:75}}>Profit</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 13, color: COLORS.black }}>{commify(item.profit) + ' '}MMK</Text>
                  </View>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText ,marginRight:55}}>Operator</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 13, color: COLORS.listText }}>{item.operator}</Text>
                  </View>
              </View>
              <View style={styles.personWapper}>
                  <Text style={{ fontSize: 13, color: COLORS.listText ,marginRight:80}}>Date</Text>
                  <Text style={{ fontSize: 13, color: COLORS.listText }}>  :  </Text>
                  <View style={styles.wapperText}>
                      <Text style={{ fontSize: 12, color: COLORS.listText }}>{item.month} {item.day}, {item.year} {item.time}</Text>
                  </View>
              </View>
          </View>
    </View>
            </TouchableWithoutFeedback>
  )
    }
  
}

export default TransferList

const styles = StyleSheet.create({
    item: {
        flex: 1,
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
    personWapper: {
        flexDirection: 'row',
        alignItems:'center',
    },
    userImage: {
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
        fontSize: 15,
        padding: 10,
        color:COLORS.black
    },
    icon:{
        marginHorizontal:10
    },
    wapperText:{
        flex:1,
        marginLeft:15,
        justifyContent:'center',
    },
})