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
    Linking,
    Alert,
    TouchableHighlight,
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
import api from './../api/index';

export default class App extends Component {
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
                let cl = position.coords;
                Linking.openURL(
                    `https://www.google.com/maps/dir/${cl.latitude},${cl.longitude}/${dir.lat},${dir.long}/data=!3m1!4b1!4m2!4m1!3e2`
                );
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
            console.log(response);
            this.setState({ pointDetails: response.data });
        }
    }

    render() {
        const { backToHome, backToMap } = this.props;
        const { dropDownIndex, imageFullScreen, imageCountLabel, pointDetails } = this.state;
        if (!pointDetails) return <Text>Nalagam...</Text>
        return (
            <ScrollView 
                horizontal={false}     
                onD={() => {
                    this.setState({dropDownIndex: 0 });
                    backToMap();
                }}
            >
                <GestureRecognizer onSwipeRight={backToHome}>
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
                        </>
                    )}
                    <View
                        style={{
                            borderBottomColor: "#377591",
                            borderBottomWidth: 1,
                            marginHorizontal: 20,
                            marginBottom: 10
                        }}
                    />
                    <View style={{ paddingHorizontal: 20, marginVertical: 20 }} >
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
        );
    }
}
