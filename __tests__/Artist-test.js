import 'react-native';
import React from 'react';
import Artist from '../app/components/Artist';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const data= {name: 'Juanpa', listeners: '5', streamable: '1', image: []}

it('renders artist correctly', () => {
  renderer.create(<Artist data={data} />)
})

it('can open link', () => {
  const artist = new Artist(data);
  artist.openLink('https://www.google.com.co/');
})