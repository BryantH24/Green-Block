import "./shims"
import React , {useState} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle, faCamera } from '@fortawesome/free-solid-svg-icons'
import Camera from "./Camera"
import UserInfo from "./UserInfo"
 export default function App(){
   const [currentPage, setCurrentPage] = useState('UserInfo')
   return (
     <View>
     <View style={styles.container}>
       <FontAwesomeIcon style={styles.text} size={40} icon={ faUserCircle } onPress={()=>setCurrentPage("UserInfo")} />
       <Text  style={styles.text}>Logo</Text>
       <FontAwesomeIcon style={styles.text} size={40} icon={ faCamera } onPress={()=>setCurrentPage("Camera")}/>
     </View>
    {currentPage ==="Camera" ? <Camera/>:<UserInfo/>}
     </View>
   )
 }
 const styles = StyleSheet.create({
   container: {
     paddingTop:25,
     paddingBottom:10,
     flexDirection:'row',
     backgroundColor: 'black',
     justifyContent: 'space-around',
     color:'white',
     },
   text:{
     color:'white',
   }
 });
