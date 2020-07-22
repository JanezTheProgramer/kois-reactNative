import React, { Component } from "react";
import { Button, Image, Text, View, StatusBar, ImageBackground, StyleSheet, TextInput, AsyncStorage } from "react-native";
import KoisMap from "./components/map";
import Constants from 'expo-constants';
import Modal from 'react-native-modal';
import api from './api/index';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHome: true,
            isModalVisible: false,
            modalText: "",
            beforeSave: ""
        };
    }

    componentDidMount = async () => {
        StatusBar.setHidden(true);
        const uri = await AsyncStorage.getItem('apiURI');
        this.setState({
            modalText: uri ? uri : api.DEFAULT_URI
        });
        console.log(api.DEFAULT_URI, "hello")
    }

    async setNewApiRoute(reset = false) {
        if (reset) {
            await AsyncStorage.removeItem('apiURI');
            this.setState({ modalText: api.DEFAULT_URI });
        } else
            await AsyncStorage.setItem('apiURI', this.state.modalText);
    }

    pressed = isHome => this.setState({ isHome });

    drawModal = () => (
        <Modal isVisible={this.state.isHome && this.state.isModalVisible}>
            <View style={styles.container}>
                <View style={{
                    margin: 20,
                    padding: 10,
                    backgroundColor: "#fff",
                    width: "100%"
                }}>
                    <Text>Povezava do spletnega vmesnika:</Text>
                    <TextInput
                        style={{
                            borderBottomColor: '#444',
                            borderBottomWidth: 1,
                            padding: 3,
                            color: "#444"
                        }}
                        value={this.state.modalText}
                        onChangeText={modalText => this.setState({ modalText })}
                    />
                    <View style={{ flexDirection: "row-reverse", marginTop: 20 }}>
                        <View style={styles.buttonStyle}>
                            <Button
                                title="Shrani"
                                color="#377591"
                                onPress={() => {
                                    this.setState({ isModalVisible: false });
                                    this.setNewApiRoute();
                                }}
                            />
                        </View>
                        <View style={{ margin: 10 }} />
                        <View style={styles.buttonStyle}>
                            <Button
                                title="Prekliči"
                                color="#e55"
                                onPress={() => this.setState({
                                    isModalVisible: false,
                                    modalText: this.state.beforeSave
                                })}
                            />
                        </View>
                        <View style={{ margin: 10 }} />
                        <View style={styles.buttonStyle}>
                            <Button
                                title="Ponastavi"
                                color="#4a4a4a"
                                onPress={() => {
                                    this.setState({ isModalVisible: false });
                                    this.setNewApiRoute(true); // reset
                                }}
                            />
                        </View>
                    </View>
                </View>

            </View>
        </Modal>
    )

    render() {
        const { isHome } = this.state;
        return (
            <>
                {this.drawModal()}
                {isHome ? (
                    <ImageBackground source={require("./assets/img/background.jpg")} style={{ width: '100%', height: '100%' }}>
                        <View
                            style={styles.container}
                        >
                            <View style={{ flex: 2, flexDirection: "column" }}>
                                <Image style={{ width: 300, height: 90 }} source={require("./assets/img/top-logo.png")} />
                            </View>
                            <View style={{ flex: 4, flexDirection: "column" }}>
                                <Image style={{ width: 250, height: 250, margin: 10 }} source={require("./assets/img/homeicon.jpg")} />
                            </View>
                            <View style={{ flex: 2, width: 280 }}>
                                <Button
                                    onPress={() => this.pressed(false)}
                                    title="Zemljevid"
                                    color="#377591"
                                />
                                <View style={{ marginBottom: 20 }} />
                                <Button
                                    onPress={() => this.setState({
                                        isModalVisible: true,
                                        beforeSave: this.state.modalText
                                    })}
                                    title="Nastavitve"
                                    color="#4a4a4a"
                                />
                            </View>
                            <View style={{ marginBottom: 20 }}>
                                <Text>
                                    {"© Janez Sedeljšak, Samo P. Pritržnik"}
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                ) : <KoisMap back={() => this.pressed(true)} />}
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        alignItems: "center"
    }
});