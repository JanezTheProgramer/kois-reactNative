import React, { Component } from "react";
import { StyleSheet, Button, Image, Text, View, TouchableOpacity, TouchableHighlight } from "react-native";
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
                style={{ width: 300, height: 120 }}
                source={require("./assets/img/Outlook-u0ql2vjd.png")}
              />
            </View>
            <View style={{ flex: 3, flexDirection: "column" }}>
              <Image
                style={{ width: 300, height: 300 }}
                source={require("./assets/img/logo-kois.png")}
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
          <Map
            back={() =>
              this.setState({
                isPressed: true
              })
            }
          />
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
