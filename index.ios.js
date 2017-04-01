'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  Dimensions,
  Image,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  WebView,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';

export default class Rekkid extends Component{
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
        return (<RecordView navigator={navigator} data={route.recordData}
                  title="recordView" />);
    }
  };
};

class CameraView extends Component {
  navRecordView(recordData) {
    console.log("This is in cameraView" + recordData);
    this.props.navigator.push({
      id: 'recordView',
      recordData
    });
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
        this.getRecordById(249504);
    });
  };

  getRecordById(releaseId) {
    let curr = 'USD';
    let url = 'https://api.discogs.com/releases/' + releaseId + '?curr_abbr=' + curr;
    console.log('url= ' + url);
    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Rekkid Discogs App',
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log('JSON = ' + responseJson.title);
        let recordData = this.parseRecordData(responseJson);
        this.navRecordView(recordData);
      }).catch((error) => {
        console.error(error);
    });
  };

  parseRecordData(recordJSON) {
      let recordData = {
        artistName: recordJSON.artists[0].name.toUpperCase(),
        recordTitle: recordJSON.title.toUpperCase(),
        label: recordJSON.labels[0].name.toUpperCase(),
        year: recordJSON.released_formatted.toUpperCase(),
        catNumber: recordJSON.labels[0].catno,
        country: recordJSON.country,
        genres: recordJSON.genres.map(function(x) { return x.toUpperCase() }),
        albumArt: {uri: recordJSON.images[0].uri},
        tracklist: recordJSON.tracklist,
      }
      return recordData;
  };

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

class RecordView extends Component {
  render() {
    const { data } = this.props;
    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#1f1f1f',
        }}>
          <RecordTitleView
            artistName={data.artistName}
            recordTitle={data.recordTitle}
            label={data.label}
            catNumber={data.catNumber}
            country={data.country}
            year={data.year}
            genres={data.genres}
          />
          <RecordImageView albumArt={data.albumArt}/>
          <RecordPriceView />
          <ScrollView style = {{flex:1.0}}>
          <RecordTracklistView tracklist={data.tracklist}/>
          </ScrollView>
          <RecordPlayView style ={{flex:0.1}}/>
      </View>
    );
  }
}


class RecordTitleView extends Component {
  render() {
    const {
      recordTitle,
      label,
      catNumber,
      country,
      year,
      genres,
      artistName
    } = this.props;
    console.log("These are " + artistName);
    return (
      <View style={{flex:0.5, paddingTop: 25,backgroundColor: '#1f1f1f'}}>
        <Text style={styles.artistName}>
          {artistName}
        </Text>
        <Text style={styles.albumName}>
          {recordTitle}
        </Text>
        <Text style={styles.albumInfo}>
          {label + ' ' + catNumber + ' ' + country + ', ' + year}
        </Text>
        <Text style={styles.genreInfo}>
          {genres.join(', ')}
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
        source={this.props.albumArt}
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
      <View style={{flex:0.50, backgroundColor: '#1f1f1f'}} >
        {this.props.tracklist.map((track, arrIndex) => {
          return (
            <View key={arrIndex} style={styles.trackInfoWrapper}>
              <Text style = {styles.trackText}>
                {track.position}
              </Text>
              <Text style = {styles.trackText}>
                {track.title.toUpperCase()}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
};

const dummyData = {
  artistName: 'SOICHI TERADA',
  recordTitle: 'FAR EAST RECORDINGS 2',
  label: 'FAR EAST RECORDING',
  year: '1993',
  catNumber: 'FER-06867',
  country: 'JAPAN',
  genres: ['ELECTRONIC', 'HOUSE', 'DOWNTEMPO'],
  albumArt: {uri: 'https://img.discogs.com/U6hp6dszbIbVhiuZiglnZ-mx_44=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1115377-1372077464-8414.jpeg.jpg'},
  tracklist: [
    {duration: "8:13", position: "A1", type_: "track", title: "Good Times"},
    {duration: "6:08", position: "A2", type_: "track", title: "A Warm Summer Night"},
    {duration: "6:46", position: "A3", type_: "track", title: "My Feet Keep Dancing"},
    {duration: "4:42", position: "B1", type_: "track", title: "My Forbidden Lover"},
    {duration: "2:55", position: "B2", type_: "track", title: "Can't Stand To Love You"},
    {duration: "4:05", position: "B3", type_: "track", title: "Will You Cry (When You Hear This Song)"},
    {duration: "4:10", position: "B4", type_: "track", title: "What About Me"}
  ],
};

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
