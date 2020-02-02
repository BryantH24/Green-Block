import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle, faCamera, faCog, faHistory, faShareSquare, faWallet, faExternalLinkAlt, faCaretSquareLeft, Image  } from '@fortawesome/free-solid-svg-icons'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import History from './History'
const UserInfo = (props) => {
  const [history, setHistory]=useState(false)
  const [historyData, setHistoryData]= useState('')
  async function postAPI(){
      try{
      const url1 = "http://greenblockserverbackend-env-2.am6btzwrqt.us-east-2.elasticbeanstalk.com/getBalance"
      const url = "http://greenblockserverbackend-env-2.am6btzwrqt.us-east-2.elasticbeanstalk.com/getHistory"
      let response = await fetch(url,{
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          oauthtoken: "bryantoken"
        })
        });
        let data = await response.json();
        setHistoryData(data)
      }
      catch(e){
        console.log(e)
      }

    }
    const changeHistory=()=>{
      setHistory(!history)
    }
  useEffect(() => {
    postAPI()
  }, []);

    return (
    <View style={{backgroundColor:"hsla(100, 100%, 97%, 1)", height:"100%"}}>
    <View style={styles.container}>
     <FontAwesomeIcon  size={90} style={styles.settingFontStyle} icon={ faUserCircle } />
       <View style={styles.nameAndEarningContainer}>
         <Text style={styles.userInfoFont}>{props.name}</Text>
         <Text style={styles.userInfoFont}>Total Earned: $0.43</Text>
       </View>
       </View>
        {history=== false ?
          <View style={styles.settingContainer}>
          <View style={{flexDirection:'row', alignItems:'center'}}><Text style={styles.settingFontStyle}>Settings</Text></View>
          <TouchableOpacity onPress={()=>changeHistory()}><View style={styles.settingOptions}><FontAwesomeIcon style={styles.iconStyle} size={20} icon={ faHistory } /><Text style={styles.settingOptionsFont} >History</Text></View></TouchableOpacity>
          <TouchableOpacity><View style={styles.settingOptions}><FontAwesomeIcon style={styles.iconStyle} size={20} icon={ faWallet } /><Text style={styles.settingOptionsFont}>Redeem</Text></View></TouchableOpacity>
          <TouchableOpacity onPress={props.successLogin}><View style={styles.settingOptions}><FontAwesomeIcon style={styles.iconStyle} size={20} icon={ faExternalLinkAlt } /><Text style={styles.settingOptionsFont}>Logout</Text></View></TouchableOpacity>
          </View>
        :<History changeHistory={changeHistory} historyData={historyData}/>}
</View>
  );
};
const styles = StyleSheet.create({
  iconStyle :{
    position:'relative',
    color:'hsla(120, 50%, 70%, 1)'
  },
  nameAndEarningContainer :{
    position: "relative",
    top: 10,
  },
  userInfoFont:{
    fontSize: 25,
    color:'hsla(123, 41%, 45%, 1)',
    padding:3
  },
  container : {
    flexDirection:'row',
    marginTop:50,
  },
   settingFontStyle : {
    fontSize: 50,
    marginBottom:5,
    fontWeight:"bold",
      color:'hsla(124, 55%, 24%, 1)',
  },
   settingOptions : {
    borderBottomColor:"hsla(100, 100%, 80%, 1)",
    borderBottomWidth: 1,
    flexDirection:'row',
    alignItems:'center'
  },
  settingOptionsFont:{
    fontSize: 25,
    padding:7,
    color:'hsla(123, 41%, 45%, 1)'
  },
  nameAndEarningText:{
    fontSize: 30,
    lineHeight: 1.75,
  },
  settingContainer:{
    marginTop:50,
    paddingLeft:3,
  }
});
export default UserInfo;
