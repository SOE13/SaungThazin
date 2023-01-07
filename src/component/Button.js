import {Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { COLORS } from '../contacts/thems';

const Button = ({label,isPrimary,style,handleOnPress}) => {
  return (
    <TouchableOpacity 
    activeOpacity={0.8}
    onPress={handleOnPress}
    style={{
        paddingVertical:5,
        backgroundColor:isPrimary ? COLORS.primary : COLORS.white,
        borderWidth:1.5,
        borderColor:isPrimary ? COLORS.primary :COLORS.black,
        borderRadius:5,
        width:'100%',
        alignItems:"center",
        marginVertical:5,
        ...style
    }}
    >
        <Text style={{
            color:isPrimary ? COLORS.white : COLORS.black,
            fontSize:16,
            fontWeight:'bold',
        }}>
            {label}
        </Text>

    </TouchableOpacity>
  )
}

export default Button;