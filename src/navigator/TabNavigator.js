import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet} from "react-native";
import { COLORS } from "../contacts/thems";
import { DailyScreen, HomeScreen, MonthlyScreen, YearlyScreen,UserListScreen } from "../screen";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const Tab=createBottomTabNavigator();

const TabNavigator=()=>{
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarLabel:'',
            tabBarInactiveTintColor:COLORS.unclick,
            tabBarActiveTintColor: COLORS.primary,
            tabBarStyle:{
                backgroundColor:COLORS.white,
                borderRadius: 15,
                // height:0,
                ...styles.shadow
            }
            }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name="home" color={color} size={30} />
                ),tabBarLabel:"Home"
             }}/>
            <Tab.Screen name="DailyScreen" component={DailyScreen} options={{
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="view-list-outline" color={color} size={35} />
            ),tabBarLabel:'Daily'
            }}/>
            <Tab.Screen name="MonthlyScreen" component={MonthlyScreen} options={{
               tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="calendar-month" color={color} size={28} />
            ),tabBarLabel:'Monthly'
            }}/>
            <Tab.Screen name="YearlyScreen" component={YearlyScreen} options={{
               tabBarIcon: ({ color }) => (
                <FontAwesome name="list-alt" color={color} size={28} />
            ),tabBarLabel:'Yearly'
            }} />
            <Tab.Screen name="UserListScreen" component={UserListScreen} options={{
               tabBarIcon: ({ color }) => (
                <FontAwesome5 name="users" color={color} size={28} />
            ),tabBarLabel:'Users'
            }}/>
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    shadow:{
        shadowColor:COLORS.lightGray,
        shadowOffset:{
            width:0,
            height:10
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    },
})