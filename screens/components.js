import React, { Component,useState } from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { Container, Header, Content,Accordion ,H2,Body } from "native-base";


import Axios from 'axios';


const dataArray = [
  { title: "Water pump", content: "It is a fully submersible mini water pump with an operating voltage of 2.5v to 6v DC, it will allow a flow of up to 2 liters of water per minute (from 80-120l / h)." },
  { title: "humidifier", content: "5050 NEBULIZER ULTRASONIC WITH LIGHTS aromatherapy AC24V voltage , Watts 16 w capacity 350 ml / h Temperature range 10-30 ° c" },
  { title: "Spot light", content: "Focus Exo-Terra Sun Glo 40 w. Features: * Broad spectrum lamp for terrariums. Generates heat gradients for thermoregulation. Air temperature increases. Stimulates the reproductive behavior of reptiles using ultraviolet light A" },
  { title: "DHT11",      content:"The DHT11 is a low cost digital humidity and temperature sensor. It uses a capacitive humidity sensor and a thermistor to measure the surrounding air, and displays the data using a digital signal on the data pin (no analog input pins)."},
  { title:  "Soil Moisture Sensor", content:"This Soil Moisture Sensor can be used to detect the moisture of soil or judge if there is water around the sensor, let the plants in your garden reach out for human help. Insert this module into the soil and then adjust the on-board potentiometer to adjust the sensitivity"}

]
;

class components extends Component{
 
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
    url:'http://proyectosita.com/terrarium/login.php',
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
      
      <Container>

<Header noShadow style = {{backgroundColor:'green'}}>
        
        <Body>
          <H2 style = {{color:'white',alignContent:'center'}}>Components</H2>
        </Body>
      
      </Header>

      <View>
      <Image source={{uri: 'http://proyectosita.com/terrarium/sources/logohidroterra.jpg'}} style={{width:280 , height: 150,margin:'5%'}} />

      </View>
      <Content padder>
     

        <Accordion dataArray={dataArray} expanded={0}
            icon="add"
            expandedIcon="remove"
            iconStyle={{ color: "green" }}
            expandedIconStyle={{ color: "red" }}
            headerStyle={{ backgroundColor: "#DAFDC8" }}
            contentStyle={{ backgroundColor: "#ddecf8" }}
        />
      </Content>
    </Container>

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

export default components;

