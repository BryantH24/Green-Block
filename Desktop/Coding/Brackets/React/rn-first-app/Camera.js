import * as React from 'react';
import { Text, View, StyleSheet, Button, Vibration } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
    this.postAPI();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
   postAPI= async ()=>{
      try{
        const url3 = "http://greenblockserverbackend-env-2.am6btzwrqt.us-east-2.elasticbeanstalk.com/createItem"
        const url4 = "http://greenblockserverbackend-env-2.am6btzwrqt.us-east-2.elasticbeanstalk.com/validateItem"
        let response = await fetch(url4,{
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            oauthtoken: "bryantoken",
            qrhash: "hash27"
          })
          });
          let data = await response.json();
          console.log(data);
      }
      catch(e){
        console.log(e)
      }
    }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View>
        <BarCodeScanner
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={{width:"100%", height:"100%"}}
        />
        <View style={styles.qrCodeContainer}>
          <View style={styles.qrCodePlacement}></View>
          <View style={styles.transparentBox1}></View>
        </View>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    Vibration.vibrate()
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.setState({ scanned: true });
    setTimeout( () => {
  this.setState({scanned:false});
}, 2000);
  };
}


const styles = StyleSheet.create({
  qrCodeContainer:{
    width:"50%",
    height:"30%",
    position:'absolute',
    alignSelf:'center',
    top:"30%",
  },

  qrCodePlacement:{
    position:'absolute',
    width:"100%",
    height:'100%',
    borderColor:'hsla(124, 55%, 65%, 1)',
    borderWidth:3,
    backgroundColor:'transparent',
    borderStyle:'dotted',
    borderRadius:20,
  }
})
