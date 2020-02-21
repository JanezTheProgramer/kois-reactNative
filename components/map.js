import React, { Component } from "react";
import { StyleSheet, Image, Text, View, TouchableHighlight, StatusBar } from "react-native";
import MapView from "react-native-maps";
import api from "./../api/index";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      mapLoc: {
        latitude: 46.447314,
        longitude: 15.19226,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      },
      mapview: true
    };
  }

  async componentDidMount() {
    this.getMarkers();
    this.setState({ fontLoaded: true });
  }

  async getMarkers() {
    const response = await api.getMarkerLocations();
    if (response.status == 200) {
      console.log(response);
      this.setState({ markers: response.data });
    }
  }

  render() {
    const { markers, mapLoc, mapview } = this.state;
    const { back } = this.props;
    return (
      <View style={styles.container}>
        {mapview ? (
          <>
            <MapView
              id={"kois_map"}
              mapType={"satellite"}
              style={StyleSheet.absoluteFillObject}
              region={mapLoc}
            >
              {markers.map((point, count) => (
                <MapView.Marker
                  key={count}
                  coordinate={{
                    latitude: point.location.lat,
                    longitude: point.location.lon
                  }}
                />
              ))}
            </MapView>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableHighlight onPress={back} style={{ position: "absolute", bottom: 35, alignSelf: "center" }} >
                <Image source={require("../assets/img/back.png")} style={{ width: 50, height: 50 }} />
              </TouchableHighlight>
            </View>
          </>
        ) : (
          <Text>test</Text>
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
  }
});
