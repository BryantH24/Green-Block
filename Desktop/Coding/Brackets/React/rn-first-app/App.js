import React , {useState} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle, faCamera, faCubes } from '@fortawesome/free-solid-svg-icons'
import Camera from "./Camera"
import UserInfo from "./UserInfo"
import Authenticate from "./Authenticate"
 export default function App(){
   const [currentPage, setCurrentPage] = useState('UserInfo')
   const [login, setLogin] = useState(false)
   const [name, setName]=useState('')
   const [pic, setPic]=useState('')
   const successLogin=()=>{
     setLogin(!login)
   }
   const getUserInfo=(name,pic)=>{
     setName(name),
     setPic(pic)
   }
   return (
     <View>
     {login=== false ? <Authenticate successLogin={successLogin} getUserInfo={getUserInfo}/>:
   currentPage ==="Camera" ? <Camera/>:<UserInfo name={name} pic={pic} successLogin={successLogin}/>}
   {login===true ?
      <View style={styles.container}>
       <FontAwesomeIcon style={styles.text} size={45} icon={ faUserCircle } onPress={()=>setCurrentPage("UserInfo")} />
       <FontAwesomeIcon style={{color:"hsla(124, 55%, 45%, 1)"}} size={45} icon={ faCubes } />
       <FontAwesomeIcon style={styles.text} size={45} icon={ faCamera } onPress={()=>setCurrentPage("Camera")}/>
     </View>:null}
     </View>
   )
 }
 const styles = StyleSheet.create({
   container: {
     flexDirection:'row',
     backgroundColor: 'hsla(124, 55%, 65%, 1)',
     justifyContent: 'space-around',
     color:'white',
     height:'12%',
     position:'absolute',
     bottom:0,
     width:"100%",
     paddingTop:12
     },
   text:{
     color:'white',
   }
 });
