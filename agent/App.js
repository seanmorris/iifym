import React         from 'react';

import { StatusBar } from 'expo-status-bar';

import { Platform, Keyboard, Dimensions }  from 'react-native';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import { NativeModules } from 'react-native';

const { StatusBarManager } = NativeModules;

import { SplashScreen  } from 'expo';
import { Notifications } from 'expo';

import * as FileSystem from 'expo-file-system';

import WebTemplate from './WebTemplate';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Asset } from 'expo-asset';

const localUri = require('./assets/app.html');

const origin = 'http://10.0.2.2:3333/';

export default class App extends React.Component
{
  constructor()
  {
    super();
 
    const url = origin;
    const baseUrl = origin;
 
    this.setState({baseUrl, url}, ()=>{});

    this.state = this.state || {
      url,
      baseUrl,
      isSplashReady: false,
      isAppReady:    false,
      scanned:       false,
      willScan:      false
    };

    this.network = false;
    this.offlineSource = null;

    this.wasConencted = false;
    this.currentUser  = false;

    this.requestPermission = BarCodeScanner.requestPermissionsAsync();
  }

  render()
  {
    const sourceState = {
      uri:     this.state.url,
      html:    this.state.html,
      baseUrl: this.state.baseUrl
    };

    return WebTemplate(this, sourceState);
  }

  handleBarCodeScanned(barcode) {
    const packet = {
      target: barcode.target
      , type: barcode.type
      , data: barcode.data
    };

    // console.log();
    
    // this.webView.postMessage(JSON.stringify(packet));
    
    this.setState({
      willScan: false
      , url: `${this.state.baseUrl}product?upc=${barcode.data}`
    });
  }

  componentDidMount()
  {
    // SplashScreen.preventAutoHide()

    const uri = Asset.fromModule(localUri);

    uri.downloadAsync()
    .then(()=>FileSystem.readAsStringAsync(uri.localUri))
    .then(html=>{

      console.log(html)

      this.offlineSource = html;
      // this.setState({html: this.offlineSource, baseUrl: origin}, ()=>{
      //   // this.passNetworkStatus();
      // });

      // this.checkConnection();

      // NetInfo.isConnected.addEventListener('connectionChange', connected => {

      //   this.checkConnection();

      // });
    });
  }

  handleMessage(event) {
    const request = JSON.parse(event.nativeEvent.data);
    console.log(request);

    switch(request.requestType)
    {
      case 'scan':
        this.setState({willScan:true});
        break;

      case 'scan-cancel':
        this.setState({willScan:false});
        break;
    }
  }

  handleLoadStart(...args){
    // console.log(args);
  }
  handleLoadEnd(...args){
    // console.log(args);

    Platform.select({
      android: ()=> {
        const packet = {type: 'barMargin', value: StatusBarManager.HEIGHT};
        console.log(packet);
        this.webView.postMessage(JSON.stringify(packet));
      }
      , ios: ()=> StatusBarManager.getHeight( ({height})=>{
        const packet = {type: 'barMargin', value: height};
        console.log(packet);
        // this.webView.postMessage(JSON.stringify(packet));
      })
    })();
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
