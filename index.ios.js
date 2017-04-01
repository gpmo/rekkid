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

// fetch('https://api.discogs.com/releases/249504', {
//   method: 'GET',
//   headers: {
//     'Authorization': 'Discogs key=bWKHfQaBHYvrwvSpYjzm, secret=yoyZnCsHFDmBWWRcWNXNZGwJsJHTMUMm',
//   }
// })
// .then((response) => response.json())
// .then((responseJson) => {
//   console.log(responseJson);
// })
// .catch((error) => {
//   console.error(error);
// });
function parseRecordData(recordJSON){
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

function getRecordByID(release_id) {
  let curr = 'USD';
  let url = 'https://api.discogs.com/releases/' + release_id + '?curr_abbr=' + curr;
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
      let recordData = parseRecordData(responseJson);
      this.setState({ recordData: recordData });
    })
    .catch((error) => {
      console.error(error);
    });
  // return responseObject;
}

export default class Rekkid extends Component {
  render() {
    return (
      <RecordView/>
    );
  }
}

function getOauth() {
  let consumer_key = 'bWKHfQaBHYvrwvSpYjzm';
  let consumer_secret = 'yoyZnCsHFDmBWWRcWNXNZGwJsJHTMUMm';

  let request_token_url = 'https://api.discogs.com/oauth/request_token';
  let authorize_url = 'https://www.discogs.com/oauth/authorize';
  let access_token_url = 'https://api.discogs.com/oauth/access_token';

  let user_agent = 'Rekkid Discogs App';

}

class RecordView extends Component {
  constructor() {
    super();
    this.state = {recordData: dummyData}; // default text

    //Release JSON fetch
    let release_id = 249504;
    let curr = 'USD';
    let url = 'https://api.discogs.com/releases/' + release_id + '?curr_abbr=' + curr;
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
        let recordData = parseRecordData(responseJson);
        this.setState({ recordData: recordData });
      })
      .catch((error) => {
        console.error(error);
      });

  }
  render() {
    const { recordData } = this.state;
    return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#1f1f1f',
        }}>
          <RecordTitleView
            artistName={recordData.artistName}
            recordTitle={recordData.recordTitle}
            label={recordData.label}
            catNumber={recordData.catNumber}
            country={recordData.country}
            year={recordData.year}
            genres={recordData.genres}
          />
          <RecordImageView albumArt={recordData.albumArt}/>
          <RecordPriceView />
          <ScrollView style = {{flex:1.0}}>
          <RecordTracklistView tracklist={recordData.tracklist}/>
          </ScrollView>
          <RecordPlayView style ={{flex:0.1}}/>
      </View>
    );
  }
};

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
