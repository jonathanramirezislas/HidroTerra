import {  View,ActivityIndicator, Dimensions,Text,StyleSheet,ToastAndroid } from 'react-native';
import PureChart from 'react-native-pure-chart';
import React, { useState} from 'react';
import { Button,Container, Header, Content, DatePicker,Icon,Body,Right,H2 } from 'native-base';
import axios from 'axios';

   

class screen2 extends React.PureComponent  {
  state = {
    data: []
  }
  constructor(props) {
    super(props);
    this.state = { 
      data:[],
      firstDate: new Date(),
      secondDate: new Date(),
      showload:true,
    };

    this.setFirstDate = this.setFirstDate.bind(this);
    this.setSecondDate = this.setSecondDate.bind(this);

  
  }
  setFirstDate(newDate) {
  this.setState({ firstDate: newDate });
}

setSecondDate(newDate) {
  this.setState({ secondDate: newDate });
}



componentDidMount() {
  const {data} = this.state;
  axios.get('http://proyectosita.com/terrarium/getdatafirst.php')
  .then(response => {

    const data = response.data;
    this.setState({ data });  
    this.setState({
      showload:false
    });
  })
}


filterData = async() => {
  let formData =new FormData();

  var firstFormattedDate = this.state.firstDate.getFullYear() + "-" + (this.state.firstDate.getMonth() + 1) + "-" + this.state.firstDate.getDate()
  var secondFormattedDate = this.state.secondDate.getFullYear() + "-" + (this.state.secondDate.getMonth() + 1) + "-" + this.state.secondDate.getDate()
 
  formData.append('firstDate',firstFormattedDate) 
 formData.append('secondDate', secondFormattedDate) 

 console.log('firstDate',firstFormattedDate)
 console.log('secondDate', secondFormattedDate)
await axios ({
  method:'post',
  url:'http://proyectosita.com/terrarium/getdatabyfilterdate.php',
  data:formData,
  config:{headers:{'Content-Type':'multipart/form-data'}}
}).then(response=>{
  const data = response.data;
 if(data[0].data[0] === undefined){

 
  ToastAndroid.showWithGravity(
    "No Results!",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
  
  
  }else{

    
    this.setState({ data });  
  console.log(data[0].data[0]);

  }
 

}).catch(error=>{
  console.log('Error', error)
  return false;
})

}


  render() {    
    const {data} = this.state;

    return (

<Container>

<Header noShadow style = {{backgroundColor:'green'}}>
        
        <Body>
          <H2 style = {{color:'white',alignContent:'center'}}>Records</H2>
        </Body>
    
      </Header>

        <Content>



  

 {
 this.state.showload? //if showload is true
         <View>
            <ActivityIndicator size="large" color="green" />
         </View>
       
        
          :  //else showload is false

 <PureChart data={data}
            type='line' 
            width={'80%'}
            height={200}
 
 />

 }
<View style={styles.container}>
    <Button  style = {{margin: '1%',padding:'1%'}} >
    <Icon name='ios-water' /> 
      <Text  style = {{color:'white'}}>Humidity</Text>
    </Button>
    <Button  success  style = {{margin: '1%',padding:'1%'}}>
    <Icon name='ios-leaf' /> 
      <Text>Soil</Text>
    </Button>
    <Button warning style = {{marginTop: '1%',padding:'1%'}}>
    <Icon name='md-sunny' /> 

      <Text>Temperature</Text>
    </Button>
</View>

<Text  style={styles.textStyle}>Select the date to filter records</Text>
<View style={styles.container}>

          <DatePicker
            defaultDate={new Date(2020, 1, 1)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2100, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select first date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setFirstDate}
            disabled={false}
            />
            <Text style={{fontWeight: 'bold'}}>&</Text>

            <DatePicker
            defaultDate={new Date(2020, 1, 1)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2100, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select second date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setSecondDate}
            disabled={false}
            />

</View>

   
<Button rounded info 
style = {{marginTop:'10%',padding: '5%', alignSelf: 'center'}}
onPress={this.filterData}>
<Icon name='md-calendar' /> 
<Text>Filter by dates</Text>
</Button>

        </Content>
      </Container>
    )}
}




const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignSelf: 'flex-start',
    alignItems:'center'
  },
  textStyle:{
 
    color: 'black',
 
    fontSize: 20,
 
    fontStyle: 'italic',
 
    fontWeight: 'bold',
    textAlign: 'center',
     
    marginBottom:'5%',
    marginTop:'5%',
    fontFamily: 'serif',
 
    textShadowRadius: 4,
 
    textShadowOffset: {width: 2, height: 2},

  
 
  },  textStyleFilter:{
 
    color: 'black',
 
    fontSize: 20,
 
    fontStyle: 'italic',
 
    fontWeight: 'bold',
 
    lineHeight: 30,
 
    textAlign: 'center',
 
    fontFamily: 'sans-serif',
 
    textShadowRadius: 4,
 
    textShadowOffset: {width: 2, height: 2},
 
    textTransform: 'uppercase',
 
    textAlignVertical : 'top',

    marginTop:'2%',
    marginBottom:'2%'
  
 
  }
});


export default screen2
