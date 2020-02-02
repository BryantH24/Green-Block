import React , {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretSquareLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function History(props){
  return (
    <View>
      <Text style={styles.breadcrumStyle} onPress={()=>props.changeHistory()}><FontAwesomeIcon style={styles.breadcrumStyle} icon={ faCaretSquareLeft } /><Text >User Info</Text></Text>
      {props.historyData.map((index)=>
        <View style={styles.itemContainer} key={index.items+index.createTime}>
        <Text>
          <Text style={styles.dateContainer}>{index.createTime.substring(0,index.createTime.length-5)}</Text>
          {index.states === true ?<FontAwesomeIcon style={styles.breadcrumStyle} icon={ faCheckCircle } />:<Text style={styles.stateFalseContainer}>Pending...</Text>}
        </Text>
          <Text style={styles.idContainer}>ID: {index.items.substring(0,index.items.length/2)}</Text>
          <Text style={styles.idContainer}>{index.items.substring(index.items.length/2)}</Text>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  itemContainer:{
    padding:5
  },
  breadcrumStyle:{
    color:"hsla(124, 55%, 45%, 1)",
    alignItems:'center',
    fontSize:15
  },
  dateContainer:{
    padding:7,
    color:'hsla(123, 41%, 45%, 1)',
  },
  idContainer:{
    fontStyle:'italic',
    color:'grey'
  },
  stateFalseContainer:{
    color:"hsla(55, 100%, 41%, 1)"
  }

})
