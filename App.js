import React, { Component } from "react";
import { Button, Image, Text, View, StatusBar, ImageBackground } from "react-native";
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
                    <ImageBackground source={require("./assets/img/background.jpg")} style={{width: '100%', height: '100%'}}>
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
                                <Image style={{ width: 240, height: 240, margin: 20 }} source={require("./assets/img/homeicon.jpg")} />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    width: 280
                                }}
                            >
                                <Button 
                                    onPress={() => this.pressed(isPressed)} 
                                    title="Zemljevid" 
                                    color="#377591"
                                />
                            </View>
                            <View style={{ marginBottom: 20 }}>
                                <Text>
                                    {"© Janez Sedeljšak, Samo P. Pritržnik"}
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                ) : (
                    <KoisMap back={() => this.pressed(isPressed)} />
                )}
            </>
        );
    }
}