import React, { Component } from "react";
import { StyleSheet, Image, Text, View, TouchableHighlight, StatusBar } from "react-native";
import MapView from "react-native-maps";
import api from "./../api/index";
import PointView from './pointview';

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
      markerView: null
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

  markerClick(id) {
    this.setState({ markerView: id });
  }

  render() {
    const { markers, mapLoc, markerView } = this.state;
    const { back } = this.props;
    return (
      <View style={styles.container}>
        {!markerView ? (
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
                  onPress={() => this.markerClick(point._id)}
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
          <PointView idMarker={markerView} backToHome={back} backToMap={() => this.setState({ markerView: null })}/>
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
