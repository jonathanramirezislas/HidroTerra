import React, { Component,useState } from 'react';
import {  View, StyleSheet,ToastAndroid} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button,Text } from 'react-native-elements';
import Axios from 'axios';


const image = { uri: "http://proyectosita.com/terrarium/sources/logohidroterra.jpg" };

class signup extends Component{
 
  constructor (){ 
    super ()
    this.state={ 
      
      email:'',
      pass1:'',
      pass2:'',
      name:'',
      lastname:'',
      
    };

   }

 

   

   //Go to SignUp Screen
handleSignUp  = () =>  {
  this.props.navigation.navigate('SignupStackScreen');

}



   handleSubmit = async() => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   
    if(this.state.name==="" || this.state.lastname===""  || this.state.email===""  || this.state.pass1==="" || this.state.pass2===""  ){
     
      ToastAndroid.showWithGravity(
        "There are empty fields!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
    }else if(this.state.pass1!==this.state.pass2){
      ToastAndroid.showWithGravity(
        "Password mismatch!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
    }else  if (reg.test(this.state.email) === false) {
      ToastAndroid.showWithGravity(
        "Verify your email!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
    }else{



      let formData =new FormData();
      formData.append('name', this.state.name)
      formData.append('lastname', this.state.name)
      formData.append('pass', this.state.pass1)
      formData.append('email', this.state.email)
    await Axios ({
      method:'post',
      url:'http://proyectosita.com/terrarium/signup.php',
      data:formData,
      config:{headers:{'Content-Type':'multipart/form-data'}}
    }).then(response=>{
      
console.log(response)
      if(response.data[0].status=="ok"){
        ToastAndroid.showWithGravity(
          "Success!",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
        this.props.navigation.navigate('login');

      }else if(response.data[0].status=="exist"){
        ToastAndroid.showWithGravity(
          "We have already the email in our Data base!",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        )
      }else{
        ToastAndroid.showWithGravity(
          "Error!",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      }



    }).catch(error=>{
      console.log('Error Login', error)
      return false;
    })
    }
  }
  
  static navigationOptions = {
    tabBarVisible: false,
  };

  validate_name = (name) => {
    this.setState({ name: name })
    if (name==="") 
      console.log("Name empty");
  }
  validate_lastname = (lastname) => {
    this.setState({ lastname: lastname })
    if (lastname==="") 
      console.log("last name empty");
  }




render(){

    return (

      <View style={styles.container}>
     <Text style={styles.text} h3>Create a New Account{"\n"} </Text>

     <TextInput
          value={this.state.name}
          onChangeText={(text) => this.validate_name(text)}
          id='name'
          label='name'
          style={styles.input}
        />

<TextInput
          value={this.state.lastname}
          onChangeText={(text) => this.validate_lastname(text)}
          label='last name'
          style={styles.input}
        />
     
     
      <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          label='Email'
          style={styles.input}
        />
           <TextInput
          value={this.state.pass1}
          onChangeText={(pass1) => this.setState({pass1})}
          label='Password'
          secureTextEntry={true}
          style={styles.input}
        />
         <TextInput
          value={this.state.pass2}
          onChangeText={(pass2) => this.setState({pass2})}
          label='Reapeat password'
          secureTextEntry={true}
          style={styles.input}
        />
        
        
        <Button
          title={'Sign Up'}
          style={styles.input}
          onPress={this.handleSubmit}
      />
   

      </View>

 

    );
  
}
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    flexDirection:"column",
    alignItems:'center'
  },
  input: {
    width: 200,
    height: 44,
    marginLeft:25,
    marginBottom: 10,
  },
  text: {
    textAlign:'center'
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


export default signup;