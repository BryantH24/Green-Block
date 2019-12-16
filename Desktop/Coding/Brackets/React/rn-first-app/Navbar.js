import React , {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle, faCamera } from '@fortawesome/free-solid-svg-icons'
import { StyleSheet, Text, View } from 'react-native';
export default function Navbar() {
  const [currentPage, setCurrentPage] = useState('UserInfo')

  return (
    <View>
    <View style={styles.container}>
      <FontAwesomeIcon style={styles.text} size={40} icon={ faUserCircle } onPress={()=>setCurrentPage("UserInfo")} />
      <Text  style={styles.text}>Logo</Text>
      <FontAwesomeIcon style={styles.text} size={40} icon={ faCamera } onPress={()=>setCurrentPage("Camera")}/>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:25,
    flexDirection:'row',
    backgroundColor: 'black',
    justifyContent: 'space-around',
    color:'white',
    },
  text:{
    color:'white',
  }
});
