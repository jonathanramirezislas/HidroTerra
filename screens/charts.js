import React, {Component} from 'react';
import axios from 'axios';
import {ActivityIndicator,View,StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base'
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'


//Data for charts
const dataTemperature = []
const dataSoilMoisture = []
const dataHumidity = []
const contentInset = { top: 20, bottom: 20 }

class charts extends React.Component{
  
    state = {
        data: []
      }
        constructor (){
         super ()
         this.state={
          data:[],
          showload:true
         }
         
        }

        
        
    componentDidMount() {

      setTimeout(()=>{
        this.setState({
          showload:false
        })

      },
      3000)

      this._interval = setInterval(() => {
        
        axios.get('http://proyectosita.com/terrarium/sensorsdata.php')
        .then(res => {
  
          const data = res.data;
          this.setState({ data });
        //console.log("current data",data[0]);

          dataTemperature.push(data[0].temperature);
          dataHumidity.push(data[0].humidity);
          dataSoilMoisture.push(data[0].soilmoisture);
        })

      }, 3000);// Execute this each 3 seconds  
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
        const {data} = this.state;
        return (


            <Container>
        
            {
             

               
            this.state.showload? //if showload is true
         <View>
            <ActivityIndicator size="large" color="green" />
         </View>
       
        
          :  //else showload is false
         <View>
         
  
              <View style={{ height: 150, flexDirection: 'row' }}>
              <Text note>Temperature</Text>
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
  
            
              <View style={{ height: 150, flexDirection: 'row' }}>
              <Text note>Soil Moisture</Text>
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
            
              <View style={{ height: 150, flexDirection: 'row' }}>
              <Text note>Humidity</Text>
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
      
        
              </View>
          
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


 export default charts;