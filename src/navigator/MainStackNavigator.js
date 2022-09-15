import React from "react";
import TabNavigator from "./TabNavigator";
import { CradicList, TransferCreateScreen, UserAmountUpdateList, UserCreateScreen, UserEditScreen } from "../screen";
import { createStackNavigator,TransitionPresets } from "@react-navigation/stack";

const Stack=createStackNavigator();
const MainStackNavigator=({initialRoute="TabNavigatorScreen"})=>{
    return(
        <Stack.Navigator initialRoute={initialRoute}  screenOptions={{headerShown:false}}>
            <Stack.Group>
                <Stack.Screen name="TabNavigatorScreen" component={TabNavigator}/>
            </Stack.Group>    
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="TransferCreateScreen" component={TransferCreateScreen} />
                <Stack.Screen name="UserCreateScreen" component={UserCreateScreen}/>
            </Stack.Group>
            <Stack.Group screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
                <Stack.Screen name="UserAmountUpdateList" component={UserAmountUpdateList}/>
                <Stack.Screen name="UserEditScreen" component={UserEditScreen} />
                <Stack.Screen name="CradicListScreen" component={CradicList} />
            </Stack.Group>
           
        </Stack.Navigator>
    )
}

export default MainStackNavigator;