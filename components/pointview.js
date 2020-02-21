import React, { Component } from "react";
import {
    StyleSheet,
    Picker,
    ScrollView,
    Button,
    Image,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Linking,
    Alert,
    TouchableHighlight,
    StatusBar
} from "react-native";
import MapView from "react-native-maps";
//import { Point } from './../assets/js/point';
import ImageZoom from "react-native-image-pan-zoom";
import GestureRecognizer, {
    swipeDirections
} from "react-native-swipe-gestures";
import * as Font from "expo-font";
import Constants from "expo-constants";
import ImageView from "react-native-image-view";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownIndex: 0,
            defaultView: true,
            marker_index: null,
            fontLoaded: false,
            imageFullScreen: false,
            imageCountLabel: 0
        };
    }

    async componentDidMount() {
        StatusBar.setHidden(true);
        Font.loadAsync({
            montserrat: require("./../assets/fonts/Montserrat-Regular.ttf")
        });

        this.setState({ fontLoaded: true });
    }

    generateDirections(dir) {
        navigator.geolocation.getCurrentPosition(
            position => {
                let cl = position.coords;
                Linking.openURL(
                    `https://www.google.com/maps/dir/${cl.latitude},${cl.longitude}/${dir.lat},${dir.long}/data=!3m1!4b1!4m2!4m1!3e2`
                );
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    renderFooter(length) {
        return (
            <View style={{
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                paddingHorizontal: 10,
                paddingVertical: 5,
            }}>
                <Text style={{
                    fontSize: 16,
                    color: '#FFF',
                    textAlign: 'center'
                }}>Slika: {this.state.imageCountLabel + 1}/{length}</Text>
            </View>
        );
    }

    render() {
        return (
            <ScrollView
                horizontal={false}
                onD={() =>
                    this.setState({
                        defaultView: true,
                        dropDownIndex: 0
                    })
                }
                contentContainerStyle={styles.contentContainer}
            >
                <GestureRecognizer
                    //onSwipeLeft={() => this.setState({ defaultView: true })}
                    onSwipeRight={() => this.setState({ defaultView: true })}
                >
                    {_jsonPoints[_state.marker_index].header.length > 1 ? (
                        <>
                            <Picker
                                selectedValue={_state.dropDownIndex}
                                style={{
                                    height: 55,
                                    elevation: 2,
                                    color: "white",
                                    backgroundColor: "#444"
                                }}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ dropDownIndex: Number(itemValue) });
                                }}
                            >
                                {_jsonPoints[_state.marker_index].header.map((item, count) => (
                                    <Picker.Item
                                        key={`${count}_marker`}
                                        label={_jsonPoints[_state.marker_index].header[count]}
                                        value={count}
                                    />
                                ))}
                            </Picker>
                            <View
                                style={{
                                    borderBottomColor: "#377591",
                                    borderBottomWidth: 3
                                }}
                            />
                        </>
                    ) : null}
                    <ImageZoom
                        onClick={() => this.setState({ imageFullScreen: true })}
                        cropHeight={Number(Dimensions.get("window").width * 0.8)}
                        cropWidth={Dimensions.get("window").width}
                        imageWidth={Dimensions.get("window").width}
                        imageHeight={200}
                        style={{ backgroundColor: "#eee" }}
                    >
                        <Image
                            style={{ width: "100%", height: "100%" }}
                            source={
                                _jsonPoints[_state.marker_index].imgs[
                                _state.dropDownIndex || 0
                                ][0]
                            }
                        />
                    </ImageZoom>
                    <ImageView
                        images={_jsonPoints[_state.marker_index].imgs[
                            _state.dropDownIndex
                        ].map(item => ({
                            source: item,
                            width: 800,
                            height: 600
                        }))}
                        imageIndex={this.state.imageCountLabel}
                        isVisible={this.state.imageFullScreen}
                        onClose={() => this.setState({ imageFullScreen: false })}
                        onImageChange={eventIndex =>
                            this.setState({ imageCountLabel: eventIndex })
                        }
                        renderFooter={() =>
                            this.renderFooters(
                                _jsonPoints[_state.marker_index].imgs[_state.dropDownIndex]
                                    .length
                            )
                        }
                    />
                    <View
                        style={{
                            borderBottomColor: "#377591",
                            borderBottomWidth: 1,
                            marginBottom: 10
                        }}
                    />
                    <View
                        style={{
                            paddingHorizontal: 20,
                            marginBottom: 10,
                            flex: 1,
                            flexDirection: "row-reverse",
                            alignItems: "center"
                        }}
                    >
                        <TouchableHighlight
                            onPress={() =>
                                this.generateDirections(
                                    _jsonPoints[_state.marker_index].location
                                )
                            }
                        >
                            <Image
                                source={require("../assets/img/directions.png")}
                                style={{ width: 50, height: 50 }}
                            />
                        </TouchableHighlight>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <TouchableHighlight
                                onPress={() => this.setState({ imageFullScreen: true })}
                            >
                                <Image
                                    source={require("../assets/img/zoom.png")}
                                    style={{ width: 50, height: 50 }}
                                />
                            </TouchableHighlight>
                        </View>
                    </View>

                    <Text
                        style={{
                            fontFamily: this.state.fontLoaded && "montserrat",
                            paddingHorizontal: 20,
                            fontWeight: "600",
                            fontSize: 22,
                            color: "#377591"
                        }}
                    >
                        {_jsonPoints[_state.marker_index].header[_state.dropDownIndex || 0]}
                        {": "}
                    </Text>
                    <View
                        style={{
                            borderBottomColor: "#377591",
                            borderBottomWidth: 1,
                            marginHorizontal: 20,
                            marginBottom: 10
                        }}
                    />
                    <View style={{ marginHorizontal: 20 }}>
                        <Text
                            style={{
                                fontWeight: "600",
                                fontSize: 15,
                                marginBottom: 20,
                                textAlign: "justify",
                                fontFamily: this.state.fontLoaded && "montserrat"
                            }}
                        >
                            {_jsonPoints[_state.marker_index].text[_state.dropDownIndex || 0]}
                        </Text>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            marginVertical: 20
                        }}
                    >
                        <Button
                            style={{ height: 50 }}
                            onPress={() =>
                                this.setState({
                                    defaultView: _state.dropDownIndex == 0 ? true : false,
                                    dropDownIndex: 0
                                })
                            }
                            title="nazaj"
                            color="#377591"
                        />
                    </View>
                </GestureRecognizer>
            </ScrollView>
        );
    }
}
