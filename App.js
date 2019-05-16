import React, { Component } from "react";
import { StyleSheet, ScrollView, Button, Image, Text, View } from "react-native";
import MapView, {
  AIzaSyAQcNvfpAyPxOrmTc5C8QG7WBj417PbjC4
} from "react-native-maps";
import Point from './assets/js/point';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        defaultView: true,
        school_pos: new Point(46.447314, 15.19226),
        points: [new Point(46.447314, 15.19226), new Point(46.448314, 15.19226)]
    };
  }

  onMarkerClick = () => this.setState({ defaultView: false })

  render() {
    return (
      <View style={styles.container}>
      {this.state.defaultView ? (
            <MapView
                id={"kois_map"}
                mapType={"satellite"}
                style={StyleSheet.absoluteFillObject}
                provider={AIzaSyAQcNvfpAyPxOrmTc5C8QG7WBj417PbjC4} // remove if not using Google Maps
                region={{
                    latitude: this.state.school_pos.lat,
                    longitude: this.state.school_pos.long,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}
            >
            {this.state.points.map((point, count) => 
                <MapView.Marker
                    key={`${count}_marker`}
                    coordinate={{
                    latitude: point.lat,
                    longitude: point.long
                    }}
                    onPress={this.onMarkerClick}
                />
            )}
            </MapView>
        ) : (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Button
                    onPress={() => this.setState({ defaultView: true })}
                    title="&#10006;"
                    color="#841584"
                />
                <Image
                    style={{width: '100%'}}
                    source={require('./assets/img/mislinja.jpg')}
                />
                <Text>{"Mislinja je središče širše okolice redko poseljenega Mislinjskega grabna pod južnimi pobočji Pohorja, na prelazu, kjer se stikata Pohorje in Karavanke. Nastanek prvotnega naselja je povezan z delovamjem fužin, jedro sedanjega naselja pa stoji na vrhu mislinjskega klanca 600 mnm imenovanega Šentlenart vrh ob glavni cesti Velenje - Slovenj Gradec. Mislinja zajema ob reki navzgor še zaselka Straže in Vovkarje in je najjužnejše naselje, ki je uvrščeno v koroško regijo."}</Text>
            </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }, contentContainer: {
    paddingVertical: 20
  }
});
