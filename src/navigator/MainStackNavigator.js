import React from "react";
import TabNavigator from "./TabNavigator";
import { CradicList, PaymentList, TransferCreateScreen, UserAmountUpdateList, UserCreateScreen, UserEditScreen } from "../screen";
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
                <Stack.Screen name="PaymentListScreen" component={PaymentList} />
            </Stack.Group>
           
        </Stack.Navigator>
    )
}

export default MainStackNavigator;