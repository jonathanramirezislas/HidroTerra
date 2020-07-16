import React, { Component,useState } from 'react';
import { ActivityIndicator, View, StyleSheet,ToastAndroid} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { Text,Switch, Right } from 'native-base'
import { Container, Header, Content, Card, CardItem, Thumbnail, Left, Body } from 'native-base'

import axios from 'axios';
import {  SafeAreaView, ScrollView } from 'react-native';



class controls extends Component{
 
  state = {
    data: []
  }

  constructor (){ 
    super ()
    this.state={ 
      showToast: false,
      data:[],
      spotlight:'',
      pump:'',
      humidifier:'',
      SwitchValue: false,
      showload:true,
     
    };
   }

          
   componentDidMount() {

   

    this._interval = setInterval(() => {
      
      axios.get('http://proyectosita.com/terrarium/sensorsdata.php')
      .then(res => {

        const data = res.data;
        this.setState({ data });
        
        this.setState({
          showload:false
        });


      })

    }, 3000);// Execute this each 3 seconds  

    this.setState({
      showload:false
    });

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


 

  
   //Go to SignUp Screen
handleSignUp  = () =>  {
  this.props.navigation.navigate('SignupStackScreen');

}

// log in to validate user 
   handleSubmit = async() => {
  
    let formData =new FormData();

    formData.append('option','components')
    this.state.pump > 0 ? formData.append('pump', this.state.pump) : formData.append('pump',0);
    this.state.humidifier > 0 ?  formData.append('humidifier', this.state.humidifier) :  formData.append('humidifier', this.state.humidifier);

    
 
  
  await axios ({
    method:'post',
    url:'http://proyectosita.com/terrarium/controls.php',
    data:formData,
    config:{headers:{'Content-Type':'multipart/form-data'}}
  }).then(response=>{
  
    if(response.data[0].status=="ok"){
      ToastAndroid.showWithGravity(
        "Working components",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
  
    }else{
      ToastAndroid.showWithGravity(
        "Insert proper values for components",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }

  }).catch(error=>{
    console.log('Error Login', error)
    return false;
  })
  }




  handleValueChangeSpotlight=async(value)=>{
    
    this.setState({switchValue: value})
    let formData =new FormData();
    formData.append('option','spotlight')
    this.state.switchValue?formData.append('spotlightValue','0') :formData.append('spotlightValue','1') 

  console.log('data send ',formData);
    await axios ({
      method:'post',
      url:'http://proyectosita.com/terrarium/controls.php',
      data:formData,
      config:{headers:{'Content-Type':'multipart/form-data'}}
    }).then(response=>{
      
    //  console.log(response)
    }).catch(error=>{
      console.log('Error Login', error)
      return false;
    })

  }


render(){
  const {data} = this.state;
  const dataArray = [
    { title: "Spotlight", content: "Spotlight Moon Night Black Light Moonlight 75 W Terrarium" },
    { title: "Water pump", content: "It can provide a flow of up to: 33.3ml / s" },
    { title: "Humidifier", content: "Humidification capacity:6ml/m" }
  ];
    return (
      
      <Container padder>
 

 <Header /> 
            {
            this.state.showload? //if showload is true
         <View>
            <ActivityIndicator size="large" color="green" />
         </View>
       
        
          :  //else showload is false

<View>
            

       {data.map(sensor =>(
      <Card transparent>
     
      <CardItem >
                    <Thumbnail source={{uri: 'https://sciencebite.com/wp-content/uploads/2018/10/Temperature-Extremes.png'}} />
                    <Left>
                    <Body>
                     <Text>Temperature:{' '}{sensor.temperature}{'°C'}</Text>
                   </Body>
                    </Left>
                   
                </CardItem>



                <CardItem>
               
                <Text>Spotlight</Text>  
       <Text>Night</Text>
         <Switch             
         onValueChange ={this.handleValueChangeSpotlight}
         value={this.state.switchValue}
    />
     <Text>Day</Text>
         <Switch             
    />
               
                    </CardItem>

                <CardItem>
                
                    <Thumbnail source={{uri: 'https://www.farmmanagement.pro/wp-content/uploads/2017/10/soil-moisture-620x330.jpg'}} />
                   
                    <Left>
                      <Body>
                      <Text>Soil Moisture{':'}{sensor.soilmoisture}{'%'}</Text>   

                      </Body>
                    </Left>
                </CardItem>
                <CardItem>
                <TextInput
          value={this.state.pump}
          onChangeText={(pump) => this.setState({pump})}
          label='Seconds for Pump'
          keyboardType = 'numeric'
          style={styles.input}
        />
                </CardItem>

                <CardItem>
                
                <Thumbnail source={{uri: 'https://www.scienceabc.com/wp-content/uploads/2017/12/Humidity-water-drops-on-glass.jpg'}} />
                   <Left>
                   <Body>
                    
                    <Text>Humidity{':'}{sensor.humidity}{'%'}</Text>  
                  </Body>
                             
                   </Left>
                  
                </CardItem>

                <CardItem>
                <TextInput
          value={this.state.humidifier}
           onChangeText={(humidifier) => this.setState({humidifier})}
          label='Seconds for Humidifier '
         
          style={styles.input}
          keyboardType = 'numeric'
        />

                </CardItem>
                <CardItem>
       
         <Text>{'    '}</Text>
               <Button
          title={'Apply settings'}
          style={styles.input}
          onPress={this.handleSubmit}
         />
                </CardItem>
               
            
       

        </Card>
        ))}
</View>
            }
 

      </Container>
      
   
 

    );
}


}

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    margin:20,
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


export default controls;

