'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  Dimensions,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob'

class Rekkid extends Component{
  render() {
    return (
      <Navigator
        initialRoute={{id: 'cameraView'}}
        renderScene={this.navigatorRenderScene}/>
    );
  };

  navigatorRenderScene(route, navigator) {
    switch (route.id) {
      case 'cameraView':
        return (<CameraView navigator={navigator} title="cameraView"/>);
      case 'recordView':
        return (<RecordView navigator={navigator} data={route.data}
                  title="recordView" />);
    }
  };
};

class RecordView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.capture}>This is props {this.props.data}</Text>
      </View>
    );
  }
}

class CameraView extends Component {
  navRecordView(imageData) {
    this.props.navigator.push({
      id: 'recordView',
      data: JSON.stringify(imageData)
    })
  };

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => {
        // encode image in base64
        RNFetchBlob.fs.readFile(data.path, "base64")
          .then((encodedImage) => {
            this.detectTextInImage(encodedImage);
          });
      }).catch(err => console.error(err));
  };

  detectTextInImage(encodedImage) {
    fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCdAKRx53A14lEPgvv4oFEAbVYc7DVY3g4', {
      method: 'POST',
      body: JSON.stringify({
        "requests": [
          {
            "image": {
              "content": encodedImage
            },
            "features": [
              {
                "type": "TEXT_DETECTION"
              }
            ]
          }
        ]
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        this.navRecordView(responseJson);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
            [CAPTURE]
          </Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('Rekkid', () => Rekkid);
