import React, { Component } from "react";
import { StyleSheet, Button, Image, Text, View, TouchableOpacity, TouchableHighlight, StatusBar } from "react-native";
import Map from "./components/map";
import Constants from 'expo-constants';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: true
    };
  }

  async componentDidMount() {
    StatusBar.setHidden(true);
  }

  pressed() {
    const { isPressed } = this.state;
    this.setState({ isPressed: !isPressed });
  }

  render() {
    const { isPressed } = this.state;
    return (
      <>
        {isPressed ? (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              paddingTop: Constants.statusBarHeight,
              alignItems: "center"
            }}
          >
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Image
                style={{ width: 300, height: 120 }}
                source={require("./assets/img/scv.png")}
              />
            </View>
            <View style={{ flex: 3, flexDirection: "column" }}>
              <Image
                style={{ width: 250, height: 250 }}
                source={require("./assets/img/icon.png")}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                width: 250
              }}
            >
              <Button
                onPress={this.pressed}
                title="Zemljevid"
                color="#3273db"
              />
            </View>
            <View>
              <Text style={{ marginBottom: "0%" }}>
                {" "}
                © Janez Sedeljšak, Samo P. Pritržnik{" "}
              </Text>
            </View>
          </View>
        ) : (
          <Map back={this.pressed} />
        )}
      </>
    );
  }
}