import React from "react";
import TabNavigator from "./TabNavigator";
import { TransferCreateScreen } from "../screen";
import { createStackNavigator,TransitionPresets } from "@react-navigation/stack";

const Stack=createStackNavigator();
const MainStackNavigator=({initialRoute="TabNavigatorScreen"})=>{
    return(
        <Stack.Navigator initialRoute={initialRoute}  screenOptions={{headerShown:false}}>
            <Stack.Group>
                <Stack.Screen name="TabNavigatorScreen" component={TabNavigator}/>
            </Stack.Group>    
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="TransferScreen" component={TransferCreateScreen}/>
            </Stack.Group>
            {/* <Stack.Group screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
                <Stack.Screen name="DetailScreen" component={DetailScreen}/>
                <Stack.Screen name="ImageScreen" component={ImageScreen}/>
            </Stack.Group> */}
           
        </Stack.Navigator>
    )
}

export default MainStackNavigator;