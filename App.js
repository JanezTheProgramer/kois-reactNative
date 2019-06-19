import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Text,
  View,
  Dimensions,
  Alert
} from "react-native";
import Map from "./components/map";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: true
    };
  }

  pressed() {
    this.setState({
      isPressed: false
    });
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
              alignItems: "center",
              marginVertical: "7%"
            }}
          >
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Image
                style={{ width: 200, height: 98 }}
                source={require("./assets/img/solski_center.png")}
              />
            </View>
            <View style={{ flex: 3, flexDirection: "column" }}>
              <Image
                style={{ width: 200, height: 72 }}
                source={require("./assets/img/mislinja_logo.png")}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                width: 200
              }}
            >
              <Button
                onPress={() => this.pressed()}
                title="MAP"
                color="#3273db"
              />
            </View>
            <View>
              <Text style={{ marginBottom: "0%" }}>
                {" "}© Janez Sedeljšak, Samo P. Pritržnik{" "}
              </Text>
            </View>
          </View>
        ) : (
          <Map />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    paddingVertical: 20
  }
});
