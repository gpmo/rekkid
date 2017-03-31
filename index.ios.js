/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import YouTube from 'react-native-youtube';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  WebView,
  View
} from 'react-native';


export default class Rekkid extends Component {
  render() {
    return (
      <RecordView/>
    );
  }
}

class RecordView extends Component {
  render() {
    return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          <RecordTitleView/>
          <RecordImageView/>
          <RecordPriceView/>
          <ScrollView style = {{flex:1.0}}>
          <RecordTracklistView/>
          </ScrollView>
          <RecordPlayView style ={{flex:0.1}}/>
      </View>
    );
  }
};

class RecordTitleView extends Component {
  render() {
    return (
      <View style={{flex:0.5, paddingTop: 25,backgroundColor: '#1f1f1f'}}>
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

class RecordImageView extends Component {
  render() {
    return (
      <View style={styles.albumArtWrapper}>
      <Image
        style={styles.albumArt}
        source={{uri: 'https://img.discogs.com/U6hp6dszbIbVhiuZiglnZ-mx_44=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1115377-1372077464-8414.jpeg.jpg'}}
      />
      </View>
    );
  }
};

class RecordPlayView extends Component {
  render() {
    return (
      <View style={styles.buttonWrapper}>
        <Image  style={styles.button}
        source={require('./img/play.png')} />
      </View>
    );
  }
};

class RecordPriceView extends Component {
  render() {
    return (
      <View style={{flex:0.30, paddingTop:15, backgroundColor: '#1f1f1f'}}>
      <View style={styles.priceInfoWrapper}>
        <View style={styles.verticalPriceAlign, {backgroundColor: '#1f1f1f'}}>
          <Text style = {styles.dimText}>
          LOW
          </Text>
          <Text style = {styles.priceText}>
          $10
          </Text>
        </View>
        <View style={styles.verticalPriceAlign, {backgroundColor: '#1f1f1f'}}>
          <Text style = {styles.dimText}>
          MED
          </Text>
          <Text style = {styles.priceText}>
          $22
          </Text>
        </View>
        <View style={styles.verticalPriceAlign, {backgroundColor: '#1f1f1f'}}>
          <Text style = {styles.dimText}>
          HIGH
          </Text>
          <Text style = {styles.priceText}>
          $64
          </Text>
        </View>
      </View>
      </View>
    );
  }
};

class RecordTracklistView extends Component {
  render() {
    return (
      <View style={{flex:0.50, backgroundColor: '#1f1f1f'}}>
        <View style={styles.trackInfoWrapper}>
          <Text style = {styles.trackText}>
            A1
          </Text>
          <Text style = {styles.trackText}>
            I WANNA BE WITH YOU
          </Text>
        </View>
        <View style={styles.trackInfoWrapper}>
          <Text style = {styles.trackText}>
            A2
          </Text>
          <Text style = {styles.trackText}>
            I WANNA BE WITH YOU
          </Text>
        </View>
        <View style={styles.trackInfoWrapper}>
          <Text style = {styles.trackText}>
            A3
          </Text>
          <Text style = {styles.trackText}>
            I WANNA BE WITH YOU
          </Text>
        </View>
        <View style={styles.trackInfoWrapper}>
          <Text style = {styles.trackText}>
            A4
          </Text>
          <Text style = {styles.trackText}>
            I WANNA BE WITH YOU
          </Text>
        </View>
        <View style={styles.trackInfoWrapper}>
          <Text style = {styles.trackText}>
            B1
          </Text>
          <Text style = {styles.trackText}>
            I WANNA BE WITH YOU
          </Text>
        </View>
        <View style={styles.trackInfoWrapper}>
          <Text style = {styles.trackText}>
            B2
          </Text>
          <Text style = {styles.trackText}>
            I WANNA BE WITH YOU
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
  },
  artistName: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Helvetica-Bold',
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
  albumArtWrapper:{
    flex:1.5,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumArt:{
    height:250,
    width:250,
  },
  buttonWrapper:{
    padding: 10,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    width: 50,
    height: 50,
  },
  dimText:{
    fontSize: 15,
    textAlign: 'center',
    color: '#6f6c6c',
    fontFamily: 'Helvetica-Bold',
  },
  priceInfoWrapper:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#1f1f1f',
    marginLeft:60,
    marginRight:60,
  },
  trackInfoWrapper:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#1f1f1f',
    marginLeft:60,
    marginRight:60,
  },
  verticalPriceAlign:{
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor:'#1f1f1f',
  },
  priceText:{
    padding:10,
    fontSize: 15,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
  },
  greyText:{
    color:'#6f6c6c'
  },
  trackText:{
    padding:10,
    fontSize: 15,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
  },
});

AppRegistry.registerComponent('Rekkid', () => Rekkid);
