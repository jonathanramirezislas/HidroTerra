import * as React from 'react';
import { Text, View, TouchableOpacity,Image,StyleSheet} from 'react-native';
import {Button,Icon} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from './screens/screen1';
import Screen2 from './screens/screen2';
import Controls from './screens/controls';
import login from './screens/login';
import Signup from './screens/signup';
import Components from './screens/components';
import Pets from './screens/pets';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
 



const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();




//Configuration for my tab -- I am not using this configutation
function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}




//TAB 
function HomeTabScreen({navigation}){
  navigation.setOptions({ tabBarVisible: true})
  
  return (
  /*   <Tab.Navigator tabBar={props => <MyTabBar {...props} />} > CONFIGURATION BEFORE */
  <Tab.Navigator  tabBarOptions={{
    activeTintColor: 'yellow', //Color of  the Tab selected
    inactiveTintColor: 'white',
    style: {
      backgroundColor: 'green',
    },
  
  }}  >

    <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="home" color={focused ? "yellow" : "white"} size={25} />
          ),
        }}  />

    <Tab.Screen name="Screen1" component={Screen1} options={{
          tabBarLabel: 'Real-time data',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="chart-areaspline" color={focused ? "yellow" : "white"} size={25} />
          ),
        }} />
     
    <Tab.Screen name="Screen2" component={Screen2} options={{
          tabBarLabel: 'Records',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="database-search" color={focused ? "yellow" : "white"} size={25} />
          ),
        }} />

     <Tab.Screen name="Controls" component={Controls} options={{
          tabBarLabel: 'Controls',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="car-cruise-control" color={focused ? "yellow" : "white"} size={25} />
          ),
        }} />



     
</Tab.Navigator>
  );
}

 
//Sign up screen
function SignupStackScreen({navigation }) {  
  return (
// screenOptions={{ headerShown: true}} ==> Helps to hide header 
    <Stack.Navigator screenOptions={{ headerShown: true}}>
    {/* Screens that we will use in Signup screen */}
      <Stack.Screen name="Signup" component={Signup}  />  
      <Stack.Screen name="Login" component={loginStackScreen} />
    </Stack.Navigator>
          );
        }


//Login Screen
function loginStackScreen({navigation }) {
  /// navigation.setOptions({ tabBarVisible: true }) ==> HELPS TO HIDE TAB BAR 
 // navigation.setOptions({ tabBarVisible: true })
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} >
    {/* Screens that we will use in login screen */}
      <Stack.Screen name="login" component={login} />  
      <Stack.Screen name="SignupStackScreen" component={SignupStackScreen} />
      <Stack.Screen name="HomeTabScreen" component={HomeTabScreen} />
      <Stack.Screen name="componentsStackScreen" component={componentsStackScreen} />
      <Stack.Screen name="petsStackScreen" component={petsStackScreen} />

    </Stack.Navigator>
          );
        }


function componentsStackScreen({navigation }) {
  /// navigation.setOptions({ tabBarVisible: true }) ==> HELPS TO HIDE TAB BAR 
 // navigation.setOptions({ tabBarVisible: true })
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} >
    {/* Screens that we will use in login screen */}
      <Stack.Screen name="Components" component={Components}  />  
      <Stack.Screen name="HomeTabScreen" component={HomeTabScreen}  />
    </Stack.Navigator>
          );
        }

           
function petsStackScreen({navigation }) {
  /// navigation.setOptions({ tabBarVisible: true }) ==> HELPS TO HIDE TAB BAR 
 // navigation.setOptions({ tabBarVisible: true })
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} >
    {/* Screens that we will use in login screen */}
      <Stack.Screen name="Pets" component={Pets}  />  
      <Stack.Screen name="HomeTabScreen" component={HomeTabScreen}  />
    </Stack.Navigator>
          );
        }



          
       


///HOME SCREEN 
          function HomeScreen({ navigation,route }) {
            navigation.setOptions({tabBarVisible:false})
            return (
            
       
              <View >
               
                <Image source={{uri: 'http://proyectosita.com/terrarium/sources/homeleaves.gif'}} style={{width:'100%' , height: 300}} />
          
                <Button rounded block success style = {{margin:'5%',padding: '5%'}}
                        onPress={() => { navigation.navigate('Screen1'); }} >
                        <Text style={styles.textStyle}>Terrarium</Text>
                        <Icon name='ios-leaf' /> 
                        
                </Button>
    
                <Button rounded block success style = {{margin:'5%',padding: '5%'}}
                        onPress={() => {navigation.navigate('componentsStackScreen',);  }} >
                        <Text style={styles.textStyle}>Components</Text>
                        <Icon name='md-cog' /> 
                </Button>
                <Button rounded block success style = {{margin:'5%',padding: '5%'}}
                        onPress={() => {navigation.navigate('petsStackScreen',);  }} >
                        <Text style={styles.textStyle}>Pets</Text>
                        <Icon name='ios-bug' /> 
                    
                </Button>
      
          
         
          
              </View>
            );
          }



          

const styles = StyleSheet.create({

  textStyle:{
 
    color: 'white',
 
    fontSize: 30,
 
    fontStyle: 'italic',
 
    fontWeight: 'bold',
    textAlign: 'center',
     
    marginBottom:'5%',
    marginTop:'5%',
    fontFamily: 'serif',
 
    textShadowRadius: 4,
 
    textShadowOffset: {width: 2, height: 2}
  }
});


// principal explore of screens
          export default function App() {
  
            return (
              <NavigationContainer>
                <Stack.Navigator  screenOptions={{ headerShown: false}}>
                  <Stack.Screen name="login" component={loginStackScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            );
          }



