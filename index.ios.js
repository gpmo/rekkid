/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

export default class Rekkid extends Component {
  render() {
    return (
      <RecordView/>
    );
  }
}

// <View style={{flex:1, backgroundColor: 'powderblue'}} />
// <Text style={styles.welcome}>
//   REKKID IS HERE YO!
// </Text>
// <Text style={styles.instructions}>
//   To get started, edit index.ios.js
// </Text>
// <Text style={styles.instructions}>
//   Press Cmd+R to reload,{'\n'}
//   Cmd+D or shake for dev menu
// </Text>

class RecordView extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}>
        <RecordTitle/>
        <RecordImage/>
        <View style={{flex:1, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
};

class RecordTitle extends Component {
  render() {
    return (
      <View style={{flex:0.5, backgroundColor: 'green'}}>
        <Text style={styles.artistName}>
          SOICHI TERADA
        </Text>
        <Text style={styles.albumName}>
          FAR EAST RECORDINGS 2
        </Text>
        <Text style={styles.albumInfo}>
          FAR EAST RECORDING FER-06867 JAPAN, 1993
        </Text>
        <Text style={styles.genreInfo}>
          ELECTRONIC: HOUSE, DOWNTEMPO
        </Text>
      </View>
    );
  }
};

class RecordImage extends Component {
  render() {
    return (
      <View style={{flex:1.5, backgroundColor: 'yellow'}}>
      <Image
        style={styles.albumArt}
        source={{uri: 'https://img.discogs.com/U6hp6dszbIbVhiuZiglnZ-mx_44=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1115377-1372077464-8414.jpeg.jpg'}}
      />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  artistName: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Helvetica-Bold',
    marginTop: 25,
    color: '#ffffff',
  },
  albumName:{
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  albumInfo:{
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  genreInfo:{
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  albumArt:{
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('Rekkid', () => Rekkid);
