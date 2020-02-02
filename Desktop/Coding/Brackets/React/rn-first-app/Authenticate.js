import React, {useState, useEffect} from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import * as Google from 'expo-google-app-auth';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCubes } from '@fortawesome/free-solid-svg-icons'
import Expo from "expo"

const Authenticate=(props)=>{
  const [name,setName]= useState("")
  const [photoUrl, setPhotoUrl]= useState("")

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: "90183731463-a4emt6gceti1qc085fnvl0p69apstjn6.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        setName(result.user.name)
        console.log("name", result.user.name)
        setPhotoUrl(result.user.photoUrl)
        props.successLogin()
        props.getUserInfo(result.user.name,result.user.photoUrl)
      }
      else {
        console.log("cancelled")
      }
    }
     catch (e) {
      console.log("error", e)
    }
  }
  async function postAPI(){
      try{
      const url = "http://greenblockserverbackend-env-2.am6btzwrqt.us-east-2.elasticbeanstalk.com/login"
      let response = await fetch(url,{
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          oauthtoken: "sampleOauth8"
        })
        });
        let data = await response.json();
        console.log(data);
        console.log()
      }
      catch(e){
        console.log(e)
      }
    }
    useEffect(() => {
      postAPI()
    }, []);
    return (
      <View style={styles.container}>
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>Green Block</Text>
        <FontAwesomeIcon style={styles.iconStyle} size={240} icon={ faCubes } />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => this.signIn()}><Text style={{color:'white', fontSize:20}}>Sign in with Google</Text></TouchableOpacity>
      </View>
      </View>
    )
  }

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"hsla(124, 55%, 65%, 1)",
    height:"100%",
    paddingBottom:"20%"
  },
  buttonContainer:{
    width:"100%",
    alignItems:"center",
    position:'relative',
    top:"40%"
  },
  button: {
    backgroundColor:"hsla(124, 55%, 55%, 1)",
    padding:20,
    color:'white',
    borderRadius:15,
    elevation:1,
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
    height: 0,
    width: 0
}
  },
  appNameContainer: {
    alignItems:'center',
    position:'relative',
    top:"10%",
  },
  appName:{
    color:'hsla(123, 41%, 45%, 1)',
    fontSize:45,
  },
  iconStyle:{
    color:'hsla(123, 41%, 45%, 1)',
    position:'relative',
    top:"20%",
  }
})
export default Authenticate
