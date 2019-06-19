import React, { Component } from "react";
import { StyleSheet, Picker, ScrollView, Button, Image, Text, View, Dimensions } from "react-native";
import MapView, {
    AIzaSyAQcNvfpAyPxOrmTc5C8QG7WBj417PbjC4
} from "react-native-maps";
import Point from './assets/js/point';
import ImageZoom from 'react-native-image-pan-zoom';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownIndex: 0,
            defaultView: true,
            index: null,
            school_pos: new Point(46.447314, 15.19226),
            points: [new Point(46.447314, 15.19226), new Point(46.448314, 15.19226)]
        };
    }
    
    json_points = [{
            header: [
                'Šolski vrt',
                'Kraj Mislinja'
            ], imgs: [
                ,
                './assets/img/second.jpg'
            ], text: [
                'Naš ekovrt  zajema 5000 m2.  Postal je čudovita popestritev šolske okolice in zanimiv učni poligon za učence. Nanj smo zelo ponosni.',
                'Mislinja je središče širše okolice redko poseljenega Mislinjskega grabna pod južnimi pobočji Pohorja, na prelazu, kjer se stikata Pohorje in Karavanke. Nastanek prvotnega naselja je povezan z delovamjem fužin, jedro sedanjega naselja pa stoji na vrhu mislinjskega klanca 600 mnm imenovanega Šentlenart vrh ob glavni cesti Velenje - Slovenj Gradec. Mislinja zajema ob reki navzgor še zaselka Straže in Vovkarje in je najjužnejše naselje, ki je uvrščeno v koroško regijo.'
            ]
        }, {
            header: [
                'Šolski vrt2',
                'Kraj Mislinja2'
            ], imgs: [
                ,
                './assets/img/second.jpg'
            ], text: [
                'Naš ekovrt  zajema 5000 m2.  Postal je čudovita popestritev šolske okolice in zanimiv učni poligon za učence. Nanj smo zelo ponosni.',
                'Mislinja je središče širše okolice redko poseljenega Mislinjskega grabna pod južnimi pobočji Pohorja, na prelazu, kjer se stikata Pohorje in Karavanke. Nastanek prvotnega naselja je povezan z delovamjem fužin, jedro sedanjega naselja pa stoji na vrhu mislinjskega klanca 600 mnm imenovanega Šentlenart vrh ob glavni cesti Velenje - Slovenj Gradec. Mislinja zajema ob reki navzgor še zaselka Straže in Vovkarje in je najjužnejše naselje, ki je uvrščeno v koroško regijo.'
            ]
        }
    ]

    imgs = [
        require('./assets/img/first.jpg'),
        require('./assets/img/second.jpg')
    ]

    onSwipeLeft(gestureState) {
        /*if(this.state.defaultView == false)
            this.setState({defaultView: true});*/
        alert("ok");
    }

    onMarkerClick = index => this.setState({
        index: index,
        defaultView: false
    });

    render() {
        return (
            <View style={styles.container}>
                {this.state.defaultView ? (
                    <MapView
                        id={"kois_map"}
                        mapType={"satellite"}
                        style={StyleSheet.absoluteFillObject}
                        provider={AIzaSyAQcNvfpAyPxOrmTc5C8QG7WBj417PbjC4} // remove if not using Google Maps
                        region={{
                            latitude: this.state.school_pos.lat,
                            longitude: this.state.school_pos.long,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121
                        }}
                    >
                        {this.state.points.map((point, count) =>
                            <MapView.Marker
                                key={`${count}_marker`}
                                coordinate={{
                                    latitude: point.lat,
                                    longitude: point.long
                                }}
                                onPress={() => this.onMarkerClick(count)}
                            />
                        )}
                    </MapView>
                ) : (
                        <ScrollView
                            horizontal={false}
                            onD={() => this.setState({ 
                                defaultView: true,
                                dropDownIndex: 0,    
                            })}
                            contentContainerStyle={styles.contentContainer}
                        >
                            <GestureRecognizer
                                onSwipeLeft={() => this.setState({ defaultView: true })}
                                onSwipeRight={() => this.setState({ defaultView: true })}
                            >
                                <Picker
                                    selectedValue={this.state.dropDownIndex}
                                    style={{
                                        height: 50,
                                        width: Dimensions.get('window').width - 40,
                                        marginVertical: 10,
                                        marginHorizontal: 20,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,

                                        elevation: 5

                                    }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ dropDownIndex: Number(itemValue) });
                                    }
                                        
                                    }>
                                    {this.state.points.map((point, count) =>
                                        <Picker.Item
                                            key={`${count}_marker`}
                                            label={this.json_points[this.state.index].header[count]}
                                            value={{count}}
                                        />
                                    )}
                                </Picker>
                                <Text style={{
                                    paddingHorizontal: 20,
                                    fontWeight: '600',
                                    fontSize: 20,
                                    color: '#3273db'
                                }}>{this.json_points[this.state.index].header[this.state.dropDownIndex || 0]}</Text>
                                <ImageZoom
                                    style={{
                                        marginVertical: 10
                                    }}
                                    cropHeight={Number(Dimensions.get('window').width * .8)}
                                    cropWidth={Dimensions.get('window').width}
                                    imageWidth={Dimensions.get('window').width}
                                    imageHeight={200}>
                                    <Image style={{ width: '100%', height: '100%' }}
                                        source={this.imgs[this.state.index]} />
                                </ImageZoom>
                                <Text style={{
                                    paddingHorizontal: 20,
                                    fontWeight: '600',
                                    fontSize: 20,
                                    color: '#3273db'
                                }}>opis:
                                </Text>
                                <Text style={{
                                    paddingHorizontal: 20,
                                    fontWeight: '600',
                                    fontSize: 20
                                }}>{this.json_points[this.state.index].text[this.state.dropDownIndex || 0]}</Text>
                                <Button
                                    style={{
                                        marginVertical: 60,
                                        padding: 15,
                                        borderRadius:20,
                                        height: 50,
                                        width: Dimensions.get('window').width - 200,
                                        marginHorizontal: 20
                                    }}
                                    onPress={() => this.setState({ 
                                        defaultView: true,
                                        dropDownIndex: 0,    
                                    })}
                                    title="&#10006;"
                                    color="#3273db"
                                />
                            </GestureRecognizer>
                        </ScrollView>
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
    }, contentContainer: {
        paddingVertical: 20
    }
});
