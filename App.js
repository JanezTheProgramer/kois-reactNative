import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { AIzaSyAQcNvfpAyPxOrmTc5C8QG7WBj417PbjC4 } from 'react-native-maps';

class Point {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }
  show() {
    alert(String(this.lat));
  }
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [
        new Point(46.447314, 15.192260),
        new Point(49.447314, 15.192260)
      ]
    }
  }


  render() {
    return (
      <View style={styles.container}>
      <MapView
        id={"kois_map"}
        mapType={"satellite"} 
        style={StyleSheet.absoluteFillObject}
        provider={AIzaSyAQcNvfpAyPxOrmTc5C8QG7WBj417PbjC4} // remove if not using Google Maps
        region={{
          latitude: this.state.points[0].lat,
          longitude: this.state.points[0].long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>
    </View>
    );
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
