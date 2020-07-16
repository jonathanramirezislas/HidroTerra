import React, { Component,useState } from 'react';
import { View,Image ,StyleSheet,Text,ToastAndroid} from 'react-native';
import { Container, Header, Content, Card, CardItem,H2,Item,Button, Left, Body, Right,Icon,Input } from 'native-base';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';


class pets extends Component{
 
  constructor (){ 
    super ()
    this.state={ 
        search:'',
      data:[]
      
    };

   }


   updateSearch = search => {
    this.setState({ search });
  };

 
   componentDidMount() {
    const {data} = this.state;
    axios.get('http://proyectosita.com/terrarium/allpets.php')
    .then(response => {
  
      const data = response.data;
      console.log(data);
      this.setState({ data });  
      
      
      console.log(data);

      this.setState({
        showload:false
      });
    })
  }
  

// log in to validate user 
   handleSearch =(Text) => {
  
    let formData =new FormData();
    formData.append('pet', Text)

console.log(Text)

   axios ({
    method:'post',
    url:'http://proyectosita.com/terrarium/searchpet.php',
    data:formData,
    config:{headers:{'Content-Type':'multipart/form-data'}}
  }).then(response=>{

  console.log(response.data);
    if(response.data.length== 0){
   
    
     ToastAndroid.showWithGravity(
       "No Results!",
       ToastAndroid.SHORT,
       ToastAndroid.CENTER
     )
     
     
     }else{
   
       
      const data = response.data;
      //console.log(data);
     this.setState({ data });  
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
    const {data} = this.state;
    const { search } = this.state;

    const listItems = data.map((pet) =>
    <Card>
          <CardItem>
          <Image source={{uri: 'http://proyectosita.com/terrarium/sources/pets/'+pet.image }} style={{height: 200, width:'100%', flex: 1}}/>
          </CardItem>
            <CardItem>
              <Left>
                <Body>
                <Text style = {{color:'red',alignContent:'center',margin:5,fontSize:18,fontFamily:'sans-serif'}}>{"''"}{pet.name}{"''"}</Text>
                  <Text note>{pet.characteristics}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
    );

   

   

    return (
    
        <Container>
             
             <Header searchBar rounded  noShadow style = {{backgroundColor:'green'}}>
          <Item>
            <Icon name="ios-search" />
            <Input 
                      onChangeText={this.handleSearch.bind(this)}
                    placeholder="Search" />
            
          </Item>
          <Button transparent
          >
            <Text>Search</Text>
          </Button>
          <H2 style = {{color:'white',alignContent:'center',margin:10,fontSize:18}}>Components</H2>
        </Header>

        
        <Content>
        {data.map((pet,i)=>{

                  <Text key={'key-'+ i}>{pet.name}</Text>
           
})}
<View>
{listItems }
    </View>
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


export default pets;

