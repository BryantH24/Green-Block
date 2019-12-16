import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle, faCamera } from '@fortawesome/free-solid-svg-icons'
import { StyleSheet, Text, View } from 'react-native';

const UserInfo = () => {
  return (
    <View style={{backgroundColor:"white", paddingLeft:3}}>
      <View style={styles.container}>
      <FontAwesomeIcon  size={90} icon={ faUserCircle } />
        <View style={styles.nameAndEarningContainer}>
          <Text style={styles.settingOptions}>John Doe</Text>
          <Text style={styles.settingOptions}>Total Earnings: $0.43</Text>
        </View>
      </View>
      <Text style={styles.settingFontStyle}>Setting</Text>
      <Text style={styles.settingOptions}>Transactions</Text>
      <Text style={styles.settingOptions}>Send</Text>
      <Text style={styles.settingOptions}>Withdrawal</Text>
      <Text style={styles.settingOptions}>Change Account Information</Text>
      <Text style={styles.settingOptions}>Log Out</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  iconSize :{
    color:"white",
  },
  nameAndEarningContainer :{
    position: "relative",
    top: 10,
  },
  container : {
    flexDirection:'row',
    marginTop:5,
  },
   settingFontStyle : {
    fontSize: 50
  },
   settingOptions : {
    fontSize: 20,
    padding: 7,
  },
  nameAndEarningText:{
    fontSize: 30,
    lineHeight: 1.75,
  }
});

export default UserInfo;
