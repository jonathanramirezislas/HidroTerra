import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet,ToastAndroid,SafeAreaView, ScrollView,Text} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button,Container, Header, Card, CardItem, Thumbnail, Left, Body,H2,Icon  } from 'native-base'
import axios from 'axios';
import ProgressCircle from 'react-native-progress-circle'
import Constants from 'expo-constants';


const image = { uri: "http://proyectosita.com/terrarium/sources/backg.png" };

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
      tempMinValue:'',
      tempMaxValue:'',
      humidityMinValue:'',
      humidityMaxValue:'',
      soilMoistureMinValue:'',
      soilMoistureMaxValue:'',
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

    axios.get('http://proyectosita.com/terrarium/parameters.php')
    .then(res => {

      const data = res.data;
      this.setState({ data });

      this.setState({
        tempMinValue:data[0].tempMinValue+'',
        tempMaxValue:data[0].tempMaxValue+'',
        humidityMinValue:data[0].humidityMinValue+'',
        humidityMaxValue:data[0].humidityMaxValue+'',
        soilMoistureMinValue:data[0].soilMoistureMinValue+'',
        soilMoistureMaxValue:data[0].soilMoistureMaxValue+''
      });

     
    
    })


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

    formData.append('option','components');
    //this.state.pump > 0 ? formData.append('pump', this.state.pump) : formData.append('pump',0);
    //this.state.humidifier > 0 ?  formData.append('humidifier', this.state.humidifier) :  formData.append('humidifier', this.state.humidifier);

    if(typeof parseInt(this.state.tempMinValue) == 'number'
    & typeof parseInt(this.state.tempMaxValue) == 'number'
    & typeof parseInt(this.state.humidityMinValue) == 'number'
    & typeof parseInt(this.state.humidityMaxValue) == 'number'
    & typeof parseInt(this.state.soilMoistureMinValue) == 'number'
    & typeof parseInt(this.state.soilMoistureMaxValue) == 'number'
  
    ){

      
    formData.append('tempMinValue', this.state.tempMinValue);
    formData.append('tempMaxValue', this.state.tempMaxValue);
    formData.append('humidityMinValue', this.state.humidityMinValue);
    formData.append('humidityMaxValue', this.state.humidityMaxValue);
    formData.append('soilMoistureMinValue', this.state.soilMoistureMinValue);
    formData.append('soilMoistureMaxValue', this.state.soilMoistureMaxValue);

    
console.log('sending values');
    }else{
      console.log('Error');
    }

  await axios ({
    method:'post',
    url:'http://proyectosita.com/terrarium/controls.php',
    data:formData,
    config:{headers:{'Content-Type':'multipart/form-data'}}
  }).then(response=>{
      if(response.data.status=="ok"){
      ToastAndroid.showWithGravity(
        "Changes done!!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      console.log('response:',response.data.status)
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
 
 <Header noShadow style = {{backgroundColor:'green'}}>  
        <Body>
          <H2 style = {{color:'white',alignContent:'center'}}>Controls</H2>
        </Body>
      </Header>
            {
            this.state.showload? //if showload is true
         <View>
            <ActivityIndicator size="large" color="green" />
         </View>
       
        
          :  //else showload is false

<View>
            

       {data.map(sensor =>(
      <Card transparent>

      <CardItem style={{backgroundColor:'green'}}>

       {/* Temperature */}
                <Left>
                    <Body style={{marginLeft:'-5%'}}>
                    <Text style={{color:'yellow'}}>Temperature</Text>
                     <ProgressCircle
            percent={sensor.temperature}
            radius={40}
            borderWidth={8}
            color="red"
            shadowColor="green"
            bgColor="green"
            key='2'
            id='2'
            alias='2'
            name='2'
          
               >
                    <Thumbnail style={{width: 70, height: 70, borderRadius: 70/2,margin:'2%'}} source={{uri: 'https://sciencebite.com/wp-content/uploads/2018/10/Temperature-Extremes.png'}} />
        </ProgressCircle>
        <Text style={{color:'white',textAlign:'center'}}>{sensor.temperature}{'°C'}</Text>
                   </Body>
                </Left>

                  {/* Soil Moisture */}
                   <Left>
                      <Body style={{marginLeft:'-5%'}}>
                      <Text style={{color:'yellow',textAlign:'center'}}>Soil Moisture</Text>
                      <ProgressCircle
            percent={sensor.soilmoisture}
            radius={60}
            borderWidth={8}
            color="blue"
            shadowColor="green"
            bgColor="green"
            key='1'
            id='1'
            alias='1'
            name='1'
        >
           <Thumbnail style={{width: 140, height: 140, borderRadius: 140/2, margin:'2%' }} source={{uri: 'https://www.farmmanagement.pro/wp-content/uploads/2017/10/soil-moisture-620x330.jpg'}} />
        </ProgressCircle>
                      <Text style={{color:'white',textAlign:'center'}}>{sensor.soilmoisture}{'%'}</Text>   
                      </Body>
                    </Left>
                   

       {/* Humidity */}
       <Left style={{marginLeft:'10%'}}>
                    <Body >
                    <Text style={{color:'yellow'}}>Humidity</Text>
                     <ProgressCircle
            percent={sensor.humidity}
            radius={40}
            borderWidth={8}
            color="#2EFEF7"
            shadowColor="green"
            bgColor="green"
            key='2'
            id='2'
            alias='2'
            name='2'
          
               >
                    <Thumbnail style={{width: 70, height: 70, borderRadius: 70/2,margin:'2%'}} source={{uri: 'https://www.scienceabc.com/wp-content/uploads/2017/12/Humidity-water-drops-on-glass.jpg'}} />
        </ProgressCircle>
        <Text style={{color:'white',textAlign:'center'}}>{sensor.humidity}{'°C'}</Text>
                   </Body>
                </Left>
        </CardItem>
            
       

        </Card>
        ))}
</View>
            }
 <Text style={styles.textStyle}>Settings</Text>
            <SafeAreaView style={styles.scrollContainer}>
      <ScrollView style={styles.scrollView}>
<Card>
  {/* temperature input */}
<Text style={{textAlign:'center'}}>Temperature</Text>
  <CardItem style={{alignItems:'center'}}>
 
  <TextInput

value={this.state.tempMinValue}
onChangeText={(tempMinValue) => this.setState({tempMinValue})}
label='Minimum Value'
keyboardType = 'numeric'
style={{width:150}}
/>
<TextInput
value={this.state.tempMaxValue}
onChangeText={(tempMaxValue) => this.setState({tempMaxValue})}
label='Maximum Value'
keyboardType = 'numeric'
style={{marginLeft:'5%',width:150}}
/>
  </CardItem>

  {/* soil moisture inputs */}
  <Text style={{textAlign:'center'}}>Soil Moisture</Text>

  <CardItem>
  <TextInput

value={this.state.soilMoistureMinValue}
onChangeText={(soilMoistureMinValue) => this.setState({soilMoistureMinValue})}
label='Minimum Value'
keyboardType = 'numeric'
style={{width:150}}
/>

<TextInput
value={this.state.soilMoistureMaxValue}
onChangeText={(soilMoistureMaxValue) => this.setState({soilMoistureMaxValue})}
label='Maximum Value'
keyboardType = 'numeric'
style={{marginLeft:'5%',width:150}}
/>
  </CardItem>

    {/* humidity inputs */}
  <Text style={{textAlign:'center'}}>Humidity</Text>

  <CardItem>

<TextInput
value={this.state.humidityMinValue}
onChangeText={(humidityMinValue) => this.setState({humidityMinValue})}
label='Minimum Value'
keyboardType = 'numeric'
style={{width:150}}
/>
<TextInput

value={this.state.humidityMaxValue}
onChangeText={(humidityMaxValue) => this.setState({humidityMaxValue})}
label='Maximum Value'
keyboardType = 'numeric'
style={{marginLeft:'5%',width:150}}
/>
  </CardItem>



<Button rounded dark 
style = {{margin:'5%',padding: '5%', alignItems: 'center', width:'60%'}}
onPress={this.handleSubmit}>
<Text style={{color:'white',textAlign:'center',fontSize:40}}>Apply</Text>
<Icon name='ios-cloud-upload' style={{fontSize: 40,marginTop:10}} /> 
</Button>

</Card>
          

</ScrollView>
    </SafeAreaView>

      </Container>
    );
}


}

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
    
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems:"center"
    
  },
  inputext: {
    width: 200,
    height: 44,
    marginLeft:25,
    textAlign:'center',
    fontWeight:'bold',
    
    marginBottom: 10,
  },
  scrollContainer:{
    flex:1,
    marginTop: Constants.statusBarHeight,
   
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 5,
   
  },
  textStyle:{
 
    color: 'green',
 
    fontSize: 20,
 
    fontStyle: 'italic',
 
    fontWeight: 'bold',
 
    lineHeight: 40,
 
    textAlign: 'center',
 
    textDecorationLine: 'underline',
    
    textShadowColor: '#00FF00',
 
    fontFamily: 'sans-serif',
 
    textShadowRadius: 4,
 
    textShadowOffset: {width: 2, height: 2},
 
    textTransform: 'uppercase',
 
    textAlignVertical : 'top',
  
 
  }
});


export default controls;

