import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { COLORS } from '../contacts/thems'
import Button from '../component/Button'
import Entypo from 'react-native-vector-icons/Entypo'
import { images } from '../contacts/images';
import { addTransition } from '../database/database'
import { launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';
import Apploder from '../component/Apploder'

const TransferCreateScreen = ({ navigation }) => {
  
  const [fromVisible,setFromVisible]=useState(false)
  const [optionVisible, setOptionVisible] = useState(false)
  const [cradicVisible, setCradicVisible] = useState(false)
  const [activeInput,setActiveInput]=useState(null);
  
  const [description, setDescription] = useState('')
  const [option, setOption] = useState('')
  const [profit, setProfit] = useState(0)
  const [operator, setOperator] = useState('')
  const [cradic,setCradic]=useState(true)
  const[fromAmount,setFromAmount]=useState('')
  const [toAmount, settoAmount] = useState('')
  
  const[imageUrl,setImageUrl]=useState('')
  const [loading, setLoading] = useState(true)

  const selectedImage=()=>{
      launchImageLibrary(
        {mediaType:'photo'},
        ({assets})=>{
          if(assets&&assets.length>0){
            setImageUrl(assets[0].uri)
          }
        }
      )
  }

  const optionVisibleToggle = () => { setOptionVisible(!optionVisible) }
  const selectOption = (value) => {
    setOption(value)
    optionVisibleToggle()
  }

  const cradicVisibleToggle = () => { setCradicVisible(!cradicVisible) }
  const selectCardic = (value) => {
    setCradic(value)
    cradicVisibleToggle()
  }

  const handleOnPress = () => {
    
  }
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Transition</Text>

      <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Description</Text>
          <TextInput onFocus={()=>setActiveInput('description')}
           value={description}
           placeholder='Description'
           onChangeText={(value)=>setDescription(value)}
          style={{
            color:COLORS.black,
            padding:10,
            backgroundColor:COLORS.white,
            borderRadius:5,
            paddingVertical:10,
            borderWidth:1,
            borderColor: activeInput == 'description' ? COLORS.primary : COLORS.white,
          }} />
      </View>
      <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Option</Text>
        {option === '' ? < TouchableOpacity onPress={optionVisibleToggle} style={styles.option} /> : 
        <TouchableOpacity style={styles.optionItem} onPress={optionVisibleToggle}>
            <Text style={{ color: COLORS.black }}>{ option}</Text>
        </TouchableOpacity>
        }
      </View>
      {/* //form amount and to amount */}

      <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Profit</Text>
          <TextInput onFocus={()=>setActiveInput('profit')}
           value={profit}
           keyboardType={'number-pad'}
           placeholder='Profit'
           onChangeText={(value)=>setProfit(value)}
          style={{
            color:COLORS.black,
            padding:10,
            backgroundColor:COLORS.white,
            borderRadius:5,
            paddingVertical:10,
            borderWidth:1,
            borderColor: activeInput == 'profit' ? COLORS.primary : COLORS.white,
            textAlign:'right'
          }} />
      </View>

      <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Operator</Text>
          <TextInput onFocus={()=>setActiveInput('operator')}
           value={operator}
           placeholder='Operator'
           onChangeText={(value)=>setOperator(value)}
            style={{
            color:COLORS.black,
            padding:10,
            backgroundColor:COLORS.white,
            borderRadius:5,
            paddingVertical:10,
            borderWidth:1,
            borderColor: activeInput == 'operator' ? COLORS.primary : COLORS.white,
          }} />
      </View>

      <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Paid Or Cradic</Text>
        {cradic === '' ? < TouchableOpacity onPress={cradicVisibleToggle} style={styles.option} /> : 
        <TouchableOpacity style={styles.optionItem} onPress={cradicVisibleToggle}>
            {cradic ? <Text style={{ color: COLORS.black }}>Cradic</Text> :
              <Text style={{ color: COLORS.black }}>Paid</Text>}
        </TouchableOpacity>
        }
      </View>

      {imageUrl==''?
          <TouchableOpacity onPress={selectedImage} style={styles.formImage}>
            <Text style={styles.formImageText}>+ add image </Text>
          </TouchableOpacity>
        :
        <TouchableOpacity onPress={selectedImage}>
          <Image
          source={{uri:imageUrl}}
          resizeMode={'cover'}
          style={{width:'100%',borderRadius:5,height:150,marginBottom:10}}
          />
        </TouchableOpacity>
        }

      <Button handleOnPress={handleOnPress} label={'Add'} 
        isPrimary={true} style={{marginVertical:20,paddingVertical:10,marginBottom:20}}/>
      <View style={{ height: 50 }}></View>
      
      {/* cradic or paid modal */}
  <Modal transparent visible={cradicVisible}>
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity style={styles.modalHeader} onPress={cradicVisibleToggle}>
            <Entypo name='circle-with-cross' size={30} color={COLORS.black} />
          </TouchableOpacity>
          <View style={{width:'100%',alignContent:'center'}}>
            <TouchableOpacity style={styles.optionItem} onPress={()=>selectCardic(false)}>
              <Text style={{color:COLORS.black}}>Paid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem} onPress={()=>selectCardic(true)}>
              <Text style={{color:COLORS.black}}>Cradic</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </View>
      </Modal>

    {/* option modal */}
  <Modal transparent visible={optionVisible}>
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity style={styles.modalHeader} onPress={optionVisibleToggle}>
            <Entypo name='circle-with-cross' size={30} color={COLORS.black} />
          </TouchableOpacity>
          <View style={{width:'100%',alignContent:'center'}}>
            <TouchableOpacity style={styles.optionItem} onPress={()=>selectOption('OptionOne')}>
              <Text style={{color:COLORS.black}}>Option One</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem} onPress={()=>selectOption('OptionTwo')}>
              <Text style={{color:COLORS.black}}>Option Two</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </View>
      </Modal>
      {loading==false&&<Apploder/>}
    </ScrollView>
  )
}

export default TransferCreateScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:COLORS.backgroung,
    padding:20,
  },
  header:{
    fontSize:24,
    alignItems:'center',
    textAlign:'center',
    marginBottom:10,
    fontWeight:'bold',
    color:COLORS.black,
  },
  formGroup:{
    marginBottom:20
  },
  formLabel:{
    fontSize:18,
    opacity:0.5,
    marginBottom:5,
    color:COLORS.black,
  },
  option: {
    color:COLORS.black,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
    height:50
  },
  optionItem: {
    color:COLORS.black,
    padding: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    marginVertical:2
  },
  modalBackground:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'center',
    alignItems:'center'
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
  formImage:{
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor:COLORS.primary+'70',
    marginBottom:10,
    borderRadius:10,
  },
  formImageText:{
    color:COLORS.black,
    fontSize:15
  }
})