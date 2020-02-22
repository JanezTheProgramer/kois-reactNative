import React, { Component } from "react";
import { Picker, ScrollView, Button, Image, Text, View, Dimensions, ImageBackground, Linking, Alert, TouchableHighlight } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import GestureRecognizer from "react-native-swipe-gestures";
import * as Font from "expo-font";
import ImageView from "react-native-image-view";
import api from './../api/index';
import Spinner from 'react-native-loading-spinner-overlay';

export default class PointView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownIndex: 0,
            fontLoaded: false,
            imageFullScreen: false,
            imageCountLabel: 0,
            pointDetails: null
        };
    }

    async componentDidMount() {
        this.getPointDetails();
        Font.loadAsync({
            montserrat: require("./../assets/fonts/Montserrat-Regular.ttf")
        });
        this.setState({ fontLoaded: true });
    }

    generateDirections(dir) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const cl = position.coords;
                Linking.openURL(`https://www.google.com/maps/dir/${cl.latitude},${cl.longitude}/${dir.lat},${dir.lon}/data=!3m1!4b1!4m2!4m1!3e2`);
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    renderImageFooter(length) {
        const { imageCountLabel } = this.state;
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
                <Text style={{ fontSize: 16, color: '#FFF', textAlign: 'center'}}>
                    Slika: {imageCountLabel + 1}/{length}
                </Text>
            </View>
        );
    }

    async getPointDetails() {
        const { idMarker } = this.props;
        const response = await api.getPointData(idMarker);
        if (response.status == 200) {
            this.setState({ pointDetails: response.data });
        }
    }

    changeTab(index, tabs) {
        if (tabs == 1) return;
        this.setState({ dropDownIndex: (index !== (tabs - 1)) ? ++index : 0 })
    }

    render() {
        const { backToMap } = this.props;
        const { dropDownIndex, imageFullScreen, imageCountLabel, pointDetails, fontLoaded } = this.state;

        if (!pointDetails) {
            return (
                <Spinner
                    visible={true}
                    textContent={'Nalagam...'}
                    textStyle={{ color: '#444' }}
                />
            );
        } else {
            const pointTab = pointDetails ? pointDetails.tabs[dropDownIndex] : null;

            const config = {
                velocityThreshold: 1.1,
                directionalOffsetThreshold: 10,
                gestureIsClickThreshold: 10
            };

            return (
                <ImageBackground source={require("./../assets/img/background.jpg")} style={{width: '100%', height: '100%'}}>
                    <ScrollView horizontal={false} >
                        <GestureRecognizer 
                            config={config}
                            onSwipeRight={() => backToMap()}
                            onSwipeLeft={() => this.changeTab(dropDownIndex, pointDetails.tabs.length)}
                        >
                            {pointDetails.tabs.length > 1 && (
                                <>
                                    <Picker
                                        selectedValue={dropDownIndex}
                                        style={{ height: 55, elevation: 2, }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            this.setState({ dropDownIndex: Number(itemValue) });
                                        }}
                                    >
                                        {pointDetails.tabs.map((item, count) => (
                                            <Picker.Item key={count} label={item.title} value={count} />
                                        ))}
                                    </Picker>
                                    <View style={{ borderBottomColor: "#377591", borderBottomWidth: 1 }} />
                                </>
                            )}
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
                                source={{ uri: pointTab.images[0] }}
                                />
                            </ImageZoom>
                            <ImageView
                                images={pointTab.images.map(item => ({
                                    source: { uri: item},
                                    width: 800,
                                    height: 600 
                                }))}
                                imageIndex={imageCountLabel}
                                isVisible={imageFullScreen}
                                onClose={() => this.setState({ imageFullScreen: false })}
                                onImageChange={eventIndex => this.setState({ imageCountLabel: eventIndex})}
                                renderFooter={() => this.renderImageFooter(pointTab.images.length)}
                            />
                            <View style={{ borderBottomColor: "#377591", borderBottomWidth: 1 }} />
                            <View
                                style={{
                                    margin: 15,
                                    marginHorizontal: 10,
                                    flex: 1,
                                    flexDirection: "row-reverse",
                                    alignItems: "center"
                                }}
                            >
                                <TouchableHighlight onPress={() => this.generateDirections(pointDetails.location)}>
                                    <Image source={require("../assets/img/directions.png")} style={{ width: 50, height: 50 }} />
                                </TouchableHighlight>
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                                    <TouchableHighlight onPress={() => this.setState({ imageFullScreen: true })} >
                                        <Image source={require("../assets/img/zoom.png")} style={{ width: 50, height: 50 }} />
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <Text
                                style={{
                                    fontFamily: fontLoaded && "montserrat",
                                    paddingHorizontal: 10,
                                    fontWeight: "600",
                                    fontSize: 22,
                                    color: "#377591"
                                }}
                            >
                                {`${pointTab.title}: `}
                            </Text>
                            <View style={{ borderBottomColor: "#377591", borderBottomWidth: 1, marginHorizontal: 10 }} />
                            <View>
                                <Text
                                    style={{
                                        fontWeight: "600",
                                        paddingHorizontal: 15,
                                        fontSize: 15,
                                        textAlign: "justify",
                                        fontFamily: fontLoaded && "montserrat"
                                    }}
                                >
                                    {pointTab.description}
                                </Text>
                            </View>
                            <View style={{ paddingHorizontal: 10, marginVertical: 20 }} >
                                <Button
                                    style={{ height: 50 }}
                                    onPress={() => {
                                        this.setState({ dropDownIndex: 0 })
                                        if (dropDownIndex == 0) backToMap();
                                    }}
                                    title="nazaj"
                                    color="#377591"
                                />
                            </View>
                        </GestureRecognizer>
                    </ScrollView>
                </ImageBackground>
            );
        }                  
    }
}
