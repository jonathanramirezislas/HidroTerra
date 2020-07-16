import * as React from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
//
import Tab from './Tab';


function Feed(){
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text> Feed</Text>
</View>

    )
}


function Article(){
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text> Article screen</Text>
</View>

    )
}


const Drawer = createDrawerNavigator();

function MyDrawer(){

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Tab" component={Tab}></Drawer.Screen>
            <Drawer.Screen name="Article" component={Article}></Drawer.Screen>

        </Drawer.Navigator>

    );

}

export default MyDrawer;