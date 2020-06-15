import React, { Component } from 'react';
import { 
  Text,
  Linking,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class Artist extends Component {
  constructor(props) {
    super(props);
    this.artist = props.data;
  }
  
  async openLink(url) {
    await Linking.openURL(url);
  }

  render() {
    return (
      <>
        <TouchableOpacity onPress={() => this.openLink(this.artist.url)}>
          {
            this.artist.image.map(
              (image, index) => {
                if (image.size === 'large') {
                  return (
                    <Image 
                      key={index} 
                      source={{uri: image['#text']}} 
                      style={styles.imageStyle} 
                    />
                  );
                }
            })
          }
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>{this.artist.name}</Text>
        <Text style={styles.sectionDescription}>Listeners: {this.artist.listeners}</Text>
        <Text style={styles.sectionDescription}>Streamable: {this.artist.streamable == '0' ? 'No' : 'Si' }</Text>
      </> 
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 15,
    marginTop: 5,
  },
});

export default Artist;
