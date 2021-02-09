import React, {Component} from 'react';
import axios from 'axios';
import {ActivityIndicator,View,StyleSheet,ToastAndroid,Text } from 'react-native';
import { Button,Container, Content,Icon,Header,H2, Left, Right, Body } from 'native-base'
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'

import {baseUrl} from './shared/baseUrl';


//Data for charts
const dataTemperature = []
const dataSoilMoisture = []
const dataHumidity = []
const contentInset = { top: 20, bottom: 20 }

class chart extends Component{

    state = {
        data: []
      }
        constructor (){
         super ()
         this.state={
          data:[],
          showload:true,
          temperature:'',
          humidity:'',
          soilmoisture:''
          

         }
         
        }

        
        
    componentDidMount() {

      this._interval = setInterval(() => {
        
        axios.get(baseUrl+'sensorsdata.php')
        .then(res => {
  
          const data = res.data;
          this.setState({ data });
          console.log("ata",data);
          this.setState({temperature:data[0].temperature})
          this.setState({humidity:data[0].humidity})
          this.setState({soilmoisture:data[0].soilmoisture})

          dataTemperature.push(data[0].temperature);
          dataHumidity.push(data[0].humidity);
          dataSoilMoisture.push(data[0].soilmoisture);
          //sate for load change to false
          this.setState({
            showload:false
          });

        })

      }, 300000000000);// Execute this each 3 seconds  
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

 
      saveData = async() => {
        const {data} = this.state;
        let formData =new FormData();
    
      
        formData.append('temperature', data[0].temperature) 
       formData.append('humidity', data[0].humidity) 
       formData.append('soilmoisture',   data[0].soilmoisture) 
     
      await axios ({
        method:'post',
        url:baseUrl+'savedata.php',
        data:formData,
        config:{headers:{'Content-Type':'multipart/form-data'}}
      }).then(response=>{
        if(response.data[0].status=="ok"){
          ToastAndroid.showWithGravity(
            "Saved",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }else{
          ToastAndroid.showWithGravity(
            "Error!",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
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
            <H2 style = {{color:'white',alignContent:'center'}}>Real-time Data</H2>
          </Body>
        
        </Header>
            {
            this.state.showload? //if showload is true
         <View>
            <ActivityIndicator size="large" color="green" />
         </View>
       
        
          :  //else showload is false

            <Content>
            <Text>Temperature:{data[0].temperature}°C</Text>
            <View style={{ height: 140, flexDirection: 'row' }}>
            
            <Text note> </Text>
                <YAxis
                    data={dataTemperature}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}ºC`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={dataTemperature}
                    svg={{ stroke: 'red' }}
                    contentInset={contentInset}
                >
                    <Grid />
                </LineChart>
            </View>

            <Text>Soil Moisture:{data[0].soilmoisture}%</Text>
            <View style={{ height: 140, flexDirection: 'row' }}>
           
                <YAxis
                    data={dataSoilMoisture}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}ºC`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={dataSoilMoisture}
                    svg={{ stroke: 'green' }}
                    contentInset={contentInset}
                >
                    <Grid />
                </LineChart>
            </View>
            <Text>Humidity:{data[0].humidity}%</Text>
            <View style={{ height: 140, flexDirection: 'row' }}>
                <YAxis
                    data={dataHumidity}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}ºC`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={dataHumidity}
                    svg={{ stroke: 'blue' }}
                    contentInset={contentInset}
                >
                    <Grid />
                </LineChart>

           
            </View>
          
              <Button rounded  
                style = {{padding: '5%', alignSelf: 'center'}}
                onPress={this.saveData}>
                  <Icon name='ios-save' /> 
                  <Text style = {{color:'white'}}>Save Data!</Text>
              </Button>
         <Text></Text>
            </Content>
          }
          </Container>
        

        );
      }
    }

    
//CSS
const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent:'center',
    backgroundColor:'white'
  }
});


 export default chart;