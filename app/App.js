import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Text,
} from 'react-native';
import Artist from './components/Artist';

const API_KEY = '829751643419a7128b7ada50de590067';

class App extends Component {
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      data: {topartists: {artist: []}},
    }
  }

  async getData() {
    await fetch('https://ws.audioscrobbler.com/2.0/', {
      method: 'post',
      body: 'method=geo.gettopartists&country=colombia&api_key='+API_KEY+'&format=json',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
    })
    .then((response) => {
      return response.text();
    })
    .then((json) => {
      this.setState({data: JSON.parse(json)})
      //console.warn(this.state.data);
      return json;
    }).catch((error) => {
      alert('error: ' + error);
    });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Artistas mas escuchados en Colombia</Text>
              </View>
              <View style={styles.container}>
                {
                  this.state.data.topartists.artist.map(
                    (artist, index) => {
                      return (
                      <View key={index} style={styles.artistContainer}>
                        <Artist data={artist} />
                      </View>
                      );
                    }
                  )
                }
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#AAA',
  },
  body: {
    backgroundColor: '#FFF',
  },
  container: {
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'nowrap',
    backgroundColor: '#DDD'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  artistContainer: {
    marginTop: 32,
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: '#AAA',
    width: '50%',
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
});

export default App;
