import React, {Component, useState} from 'react';
import {Button, View } from 'react-native';
import {Form, Item, Label, Input, List, ListItem, Text, Thumbnail, Left, Body, Right} from 'native-base';
import Axios from 'axios';
import { Switch } from 'react-native-paper';



const screen1 = () =>{

const [name,setName]=useState('')
const [pass,setPass]=useState('')
const [email,setEmail]=useState('')
const [users,setUsers]=useState([])

const handleSubmit = async (e) => {
  e.preventDefault();
  let formData =new FormData();
  formData.append('option','addQuery')
  formData.append('name',name)
  formData.append('pass',pass)
  formData.append('email',email)
console.log('name ',formData);
await Axios ({
  method:'post',
  url:'http://localhost/apiMovil/login.php',
  data:formData,
  config:{headers:{'Content-Type':'multipart/form-data'}}
}).then(response=>{
  setUsers(response.data.AllUsers)
  users.map(user=>{
    console.log('Name login',user.name);
  })
}).catch(error=>{
  console.log('Error Login', error)
  return false;
})
}

const handleValueChange = async (id,remember_token) =>{
  let formData =new FormData();
  formData.append('option','changeValue')
  formData.append('id',id)
  formData.append('remember_token',remember_token)

  await Axios ({
    method:'post',
    url:'http://localhost/apiMovil/login.php',
    data:formData,
    config:{headers:{'Content-Type':'multipart/form-data'}}
  }).then(response=>{
    console.log('Error Login',response)
    return true;

  }).catch(error=>{
    console.log('Error Login', error)
    return false;
  })
} 

      return(
    

      <View>
        <Form>
        <Item floatingLabel>
          <Label>User name</Label>
          <Input name="name"
                 onChangeText={value=>setName(value)}
                 value={name}
                 type="text"
                 />
        </Item>
        <Item floatingLabel>
        <Label>Password</Label>
        <Input name="pass"
               onChangeText={value=>setPass(value)}
               value={pass}
               type="text"
               />
      </Item>

      <Item floatingLabel>
        <Label>Email</Label>
        <Input name="email"
               onChangeText={value=>setEmail(value)}
               value={email}
               type="text"
               />
      </Item>

      <Button
      title="Add User"
      onPress={handleSubmit}
      />

        </Form>
      
        <List>       
            {users.map((user,key)=>{
            return(
              <ListItem key={key+'li'}>
                <Left>
                <Thumbnail source={require('../assets/usericon.png')} />
                </Left>
                <Body>
                <Text key={key}>{user.name}</Text>
                <Text key={key+'note'}>{user.email}</Text>
                </Body>
                <Right>
                <Switch key={key+'switch'}
                onValueChange={handleValueChange(user.id,user.remember_token)}
                value={user.remember_token=='true'?true:false} />
                </Right>
              </ListItem>

            )
          })}
        </List>
      </View>
     
      );
    
    
    }
   

  
  
 export default screen1;

