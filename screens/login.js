import React, { Component,useState } from 'react';
import { Text, View, StyleSheet,ImageBackground,ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-paper';
import {Button,Icon} from 'native-base';

import Axios from 'axios';
import {baseUrl} from './shared/baseUrl';


const image = { uri: baseUrl + 'sources/backg.png' };

class login extends Component{
 
  constructor (){ 
    super ()
    this.state={ 
      email:'',
      pass:'',
      
    };

   }
 
 

  
   //Go to SignUp Screen
handleSignUp  = () =>  {
  this.props.navigation.navigate('SignupStackScreen');

}

// log in to validate user 
   handleSubmit = async() => {
  
    let formData =new FormData();
    formData.append('email', this.state.email)
    formData.append('pass', this.state.pass)
console.log(this.state.email)
console.log(this.state.pass)
  await Axios ({
    method:'post',
    url:baseUrl +'login.php',
    data:formData,
    config:{headers:{'Content-Type':'multipart/form-data'}}
  }).then(response=>{

    console.log(response.data[0])
    
    if(response.data[0].status=="ok"){
      ToastAndroid.showWithGravity(
        "Welcome",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      this.props.navigation.navigate('HomeTabScreen');

    }else{
      ToastAndroid.showWithGravity(
        "Incorrect, Check Email and password!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }

    

  }).catch(error=>{
    console.log('Error Login', error)
    return false;
  })
  }
  
  static navigationOptions = {
    tabBarVisible: false,
  };

render(){

    return (
      
      <View style={styles.container}>
    {/* Background image */}
       <ImageBackground source={image} style={styles.image}>
  
     
      <TextInput
          value={this.state.email}
           onChangeText={(email) => this.setState({email})}
          label='Email'
          style={styles.input}
        />
        <TextInput
          value={this.state.pass}
           onChangeText={(pass) => this.setState({pass})}
          label='Password'
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button rounded  success style = {{margin:'5%',padding: '5%'}}
                        onPress={this.handleSubmit} >
                        <Text style={{color:'white',fontSize:20}}>Log in</Text>
                        <Icon name='ios-log-in' /> 
                        
                </Button>



      <Text style={{color:'white'}}>Don't have an account?</Text>
  
                <Button  transparent
                        onPress={this.handleSignUp} >
                        <Text style={{color:'#00FF00'}}>Sign up</Text>
                       
                </Button>


        </ImageBackground>
      </View>

 

    );
  
}
}

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems:"center"
    
  },
  input: {
    width: 200,
    height: 44,
    marginLeft:25,
    marginBottom: 10,
  },
  inputext: {
    width: 200,
    height: 44,
    marginLeft:25,
    textAlign:'center',
    fontWeight:'bold',
    
    marginBottom: 10,
  },
});


export default login;

