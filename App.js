import React, { Component } from "react";
import { Button, Image, Text, View, StatusBar } from "react-native";
import KoisMap from "./components/map";
import Constants from 'expo-constants';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { isPressed: true };
    }

    componentDidMount = async () => StatusBar.setHidden(true);

    pressed(prev) {
        this.setState({ isPressed: !prev });
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
                            <Image style={{ width: 300, height: 120 }} source={require("./assets/img/scv.png")} />
                        </View>
                        <View style={{ flex: 3, flexDirection: "column" }}>
                            <Image style={{ width: 280, height: 280 }} source={require("./assets/img/icon.png")} />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "column",
                                justifyContent: "space-between",
                                width: 300
                            }}
                        >
                            <Button onPress={() => this.pressed(isPressed)} title="Zemljevid" color="#3273db" />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text>
                                {" © Janez Sedeljšak, Samo P. Pritržnik "}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <KoisMap back={() => this.pressed(isPressed)} />
                )}
            </>
        );
    }
}