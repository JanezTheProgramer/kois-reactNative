import React, { Component } from "react";
import {
  StyleSheet,
  Picker,
  ScrollView,
  Button,
  Image,
  Text,
  View,
  Dimensions
} from "react-native";
import MapView, {
  AIzaSyAQcNvfpAyPxOrmTc5C8QG7WBj417PbjC4
} from "react-native-maps";
//import { Point } from './../assets/js/point';
import ImageZoom from "react-native-image-pan-zoom";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";

class Point {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownIndex: 0,
      defaultView: true,
      marker_index: null
    };
  }

  json_points = [
    {
      location: new Point(46.422282, 15.158844),
      header: ["Završe"],
      imgs: [require("./../assets/img/neki.jpg")],
      text: [
        "Staro ime za Završe je Šentvid nad Valdekom, kar kaže, da je nastanek v tesni povezavi z gradom Valdek na gozdnem robu. Cerkev sv. Vida iz 14. Stoletja je znana predvsem zaradi rimskih nagrobnikov, ki so vzidani v obzidju in v cerkvi.  "
      ]
    },
    {
      location: new Point(46.448942, 15.2205),
      header: ["Tisnikarjeva hiša"],
      imgs: [require("./../assets/img/neki.jpg")],
      text: [
        "Vesnina verzija: . Človek se je umaknil, ostala je divja in neokrnjena narava.  V osrčju divje in neokrnjene narave se je leta 1928 rodil sodobni slovenski slikar Jože Tisnikar. Trinajst let je v svojem ateljeju slikal krokarje. Naslikal je veliko slik in zabeležil temno plat življenja, ki se je vsi izogibamo. "
      ]
    },
    {
      location: new Point(46.422282, 15.178844),
      header: ["Huda luknja"],
      imgs: [require("./../assets/img/neki.jpg")],
      text: [
        "O prisotnosti prazgodovinskega človeka nam pričajo arheološki ostanki, najdeni v jami Špehovka v Hudi luknji.  Nasproti vhoda v jamo stoji spomenik nadvojvoda Janeza, ki je zaradi povečanega prometa čez slovenske dežele v začetku 19. Stoletja podprl gradnjo ceste skozi sotesko, leta 1899 se je pridružila tudi železnica Dravograd – Velenje, ki je bila ukinjena leta 1969."
      ]
    },
    {
      location: new Point(46.441296, 15.197112),
      header: ["Šentlenart in cerkev sv. Lenarta"],
      imgs: [require("./../assets/img/neki.jpg")],
      text: [
        "Cerkev sv. Lenarta stoji na obrobju Turjaka in na prelomnici, ki pomeni razvodje med Dravo in Savo. Zgrajena je bila v 17. Stoletju, notranjost krasi baročno izdelani glavni oltar in oba stranska oltarja."
      ]
    },
    {
      location: new Point(46.480272, 15.282131),
      header: ["Miklavževa domačija"],
      imgs: [require("./../assets/img/neki.jpg")],
      text: [
        'V neokrnjeni naravi nas pričaka Miklavževa domačija, ki  se ponaša s spomenikom ljudskega stavbarstva iz sredine 19. stoletja. Pri njih raste enkratna dendrološka zanimivost "Miklavževa bodika". '
      ]
    },
    {
      location: new Point(46.447314, 15.19226),
      header: ["Šolski ekovrt"],
      imgs: [require("./../assets/img/neki.jpg")],
      text: [
        `•	Naš ekovrt  zajema 5000 m2.  Postal je čudovita popestritev šolske okolice in zanimiv učni poligon za učence. Nanj smo zelo ponosni.
        •	Leta 2011 smo na pobudo Društva Ajda in s podporo vodstva šole, gospe ravnateljice mag. Natalije Aber Jordan ter gospe pomočnice Vesne Krebl zavihali rokave in za šolo oblikovali prve zeliščne gredice. Ob spoznanju, da kljub temu, da smo podeželska šola učence zanima delo v naravi in so zelo radi zahajali na ogled teh gredic, smo naslednje leto iz travnika oblikovali večjo obdelovalno površino, na kateri smo zasadili prvo zelenjavo. Ves čas so nam strokovno pomagali zunanji partnerji in s tem tudi predlagali razširitev našega vrta. 
        •	Leta 2014 smo ga preuredili v sodelovanju z lokalnimi partnerji – občino Mislinja, Društvom Ajda, Društvom za razvoj podeželja Las ter Srednjo šolo za hortikulturo in vizualne dejavnosti Celje.
        •	V sklopu šolskega ekovrta imamo zelenjavni  in zeliščni vrt, sadovnjak, gredice z okrasnim grmičevjem ter medovitimi rastlinami, njivo, čebelnjak, visoki gredi, kompostnik in učilnico na prostem.
        •	Pri delu se vključujejo vsi učenci, od 1.-9. razreda, še posebej pa tisti, ki so se vključili v interesne dejavnosti, katere so povezane z delom in opazovanjem na šolskem vrtu. Zanimanje za delo pa ni samo med učenci, ampak tudi med sodelavci. Obisk je vsako leto večji. 
        •	Delo obsega obdelavo tal, sejanje, saditev, pobiranje pridelkov in pripravo različnih jedi, marmelad, piškotov, čajev, dišečih vrečic, …
        •	Obujamo tudi stare običaje imeli smo projekt Od zrna do kruha 2013, Od zrna do  gvanta 2014,  Bučijada 2015, Rastlina našega vrta-ognjič 2016, Rastlina našega vrta-sladkorna pesa 2017, Krompirjada 2018, Koruzjada 2019.
        •	Kot potrditev za pravilno in uspešno delo, smo v jeseni 2013 prvič pridobili znak Šolski ekovrt,ki ga podeljuje Inštitut za trajnostni razvoj Republike Slovenije. Pridobljen znak velja dve leti zato smo ga leta 2016 in 2018 uspešno obnovili.
        •	V letu 2016-18 smo uspešno sodelovali z založbo Gaia. Nudili so nam strokovno in finančno podporo, kar smo s pridom izkoristili in bili nagrajeni za Naj mladi vrtnarji v letu 2016 in 2017.`
      ]
    }
  ];

  onMarkerClick = index =>
    this.setState({
      marker_index: index,
      defaultView: false
    });

  render() {
    const _state = this.state;
    const _jsonPoints = this.json_points;
    return (
      <View style={styles.container}>
        {_state.defaultView ? (
          <>
            <MapView
              id={"kois_map"}
              mapType={"satellite"}
              style={StyleSheet.absoluteFillObject}
              provider={AIzaSyAQcNvfpAyPxOrmTc5C8QG7WBj417PbjC4} // remove if not using Google Maps
              region={{
                latitude: 46.447314,
                longitude: 15.19226,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
              }}
            >
              {_jsonPoints.map((point, count) => (
                <MapView.Marker
                  key={`${count}_marker`}
                  coordinate={{
                    latitude: point.location.lat,
                    longitude: point.location.long
                  }}
                  onPress={() => this.onMarkerClick(count)}
                />
              ))}
            </MapView>
            <Button
              style={{
                flex: 1,
                justifyContent: "flex-end",
                marginBottom: 36
              }}
              onPress={this.props.back}
              title="&#10006;"
              color="#3273db"
            />
          </>
        ) : (
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
                <Picker
                  selectedValue={_state.dropDownIndex}
                  style={{
                    height: 50,
                    width: Dimensions.get("window").width - 40,
                    marginVertical: 10,
                    marginHorizontal: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ dropDownIndex: Number(itemValue) });
                  }}
                >
                  {_jsonPoints[_state.marker_index].header.map(
                    (item, count) => (
                      <Picker.Item
                        key={`${count}_marker`}
                        label={_jsonPoints[_state.marker_index].header[count]}
                        value={count}
                      />
                    )
                  )}
                </Picker>
              ) : null}
              <Text
                style={{
                  paddingHorizontal: 20,
                  fontWeight: "600",
                  fontSize: 20,
                  color: "#3273db"
                }}
              >
                {
                  _jsonPoints[_state.marker_index].header[
                    _state.dropDownIndex || 0
                  ]
                }
              </Text>
              <ImageZoom
                style={{
                  marginVertical: 10
                }}
                cropHeight={Number(Dimensions.get("window").width * 0.8)}
                cropWidth={Dimensions.get("window").width}
                imageWidth={Dimensions.get("window").width}
                imageHeight={200}
              >
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={
                    _jsonPoints[_state.marker_index].imgs[
                      _state.dropDownIndex || 0
                    ]
                  }
                />
              </ImageZoom>
              <Text
                style={{
                  paddingHorizontal: 20,
                  fontWeight: "600",
                  fontSize: 20,
                  color: "#3273db"
                }}
              >
                opis:
              </Text>
              <Text
                style={{
                  paddingHorizontal: 20,
                  fontWeight: "600",
                  fontSize: 20
                }}
              >
                {
                  _jsonPoints[_state.marker_index].text[
                    _state.dropDownIndex || 0
                  ]
                }
              </Text>
              <Button
                style={{
                  marginVertical: 60,
                  padding: 15,
                  borderRadius: 20,
                  height: 50,
                  width: Dimensions.get("window").width - 200,
                  marginHorizontal: 20
                }}
                onPress={() =>
                  this.setState({
                    defaultView: true,
                    dropDownIndex: 0
                  })
                }
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
  },
  contentContainer: {
    paddingVertical: 20
  }
});
