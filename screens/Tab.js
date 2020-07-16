import * as React from 'react';
import { View, Text, Button, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Tab } from 'native-base';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from "react-native-vector-icons";


function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Inicio</Text>
        
      </View>
    );
  }
  
  //const Stack = createStackNavigator(); solo se debe tener 1
  //se pueden cambiar o quitar los estilos
  function SettingsScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        
      </View>
    );
  }

  //const tabs = createMaterialBottomTabNavigator();
  const tabs = createMaterialTopTabNavigator();

  function MyTabs(){
      return(
          <Tab.navigator
            initialRouteName="Feed"
            activeColor="#e91e63"
            labelStyle={{fontSize: 12}}
            style={{backgoundColor:'tomato'}}
          >
              <Tab.Screen 
                name="Feed"
                component={HomeScreen}
                options={{
                  tabBarLabel:'Home',
                  tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="home"
                    color={color} size={size}/>
                  ),
                }}
                />
                <Tab.Screen 
                name="Notifications"
                component={SettingsScreen}
                options={{
                  tabBarLabel:'Updates',
                  tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="bell"
                    color={color} size={size}/>
                  ),
                }}
                />
          </Tab.navigator>
      );
  }