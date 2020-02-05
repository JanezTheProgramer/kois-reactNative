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
  TouchableHighlight
} from "react-native";
import MapView, {
  AIzaSyAQcNvfpAyPxOrmTc5C8QG7WBj417PbjC4
} from "react-native-maps";
//import { Point } from './../assets/js/point';
import ImageZoom from "react-native-image-pan-zoom";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import * as Font from "expo-font";
import Constants from "expo-constants";
import ImageView from "react-native-image-view";

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
      marker_index: null,
      fontLoaded: false,
      imageFullScreen: false
    };
  }

  async componentDidMount() {
    Font.loadAsync({
      montserrat: require("./../assets/fonts/Montserrat-Regular.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  json_points = [
    {
      location: new Point(46.422282, 15.158844),
      header: ["Završe"],
      imgs: [[require("./../assets/img/zaverse1.jpg")]],
      text: [
        "Staro ime za Završe je Šentvid nad Valdekom, kar kaže, da je nastanek v tesni povezavi z gradom Valdek na gozdnem robu. Cerkev sv. Vida iz 14. Stoletja je znana predvsem zaradi rimskih nagrobnikov, ki so vzidani v obzidju in v cerkvi.  "
      ]
    },
    {
      location: new Point(46.448942, 15.2205),
      header: ["Tisnikarjeva hiša"],
      imgs: [[require("./../assets/img/tisnikarjeva_hisa1.jpg")]],
      text: [
        "Vesnina verzija: . Človek se je umaknil, ostala je divja in neokrnjena narava.  V osrčju divje in neokrnjene narave se je leta 1928 rodil sodobni slovenski slikar Jože Tisnikar. Trinajst let je v svojem ateljeju slikal krokarje. Naslikal je veliko slik in zabeležil temno plat življenja, ki se je vsi izogibamo. "
      ]
    },
    {
      location: new Point(46.422282, 15.178844),
      header: ["Huda luknja"],
      imgs: [[require("./../assets/img/huda_luknja1.jpg")]],
      text: [
        "O prisotnosti prazgodovinskega človeka nam pričajo arheološki ostanki, najdeni v jami Špehovka v Hudi luknji.  Nasproti vhoda v jamo stoji spomenik nadvojvoda Janeza, ki je zaradi povečanega prometa čez slovenske dežele v začetku 19. Stoletja podprl gradnjo ceste skozi sotesko, leta 1899 se je pridružila tudi železnica Dravograd – Velenje, ki je bila ukinjena leta 1969."
      ]
    },
    {
      location: new Point(46.441296, 15.197112),
      header: ["Šentlenart in cerkev sv. Lenarta"],
      imgs: [[require("./../assets/img/sentlenart4.jpg")]],
      text: [
        "Cerkev sv. Lenarta stoji na obrobju Turjaka in na prelomnici, ki pomeni razvodje med Dravo in Savo. Zgrajena je bila v 17. Stoletju, notranjost krasi baročno izdelani glavni oltar in oba stranska oltarja."
      ]
    },
    {
      location: new Point(46.480272, 15.282131),
      header: ["Miklavževa domačija"],
      imgs: [[require("./../assets/img/mikla.jpg")]],
      text: [
        'V neokrnjeni naravi nas pričaka Miklavževa domačija, ki  se ponaša s spomenikom ljudskega stavbarstva iz sredine 19. stoletja. Pri njih raste enkratna dendrološka zanimivost "Miklavževa bodika". '
      ]
    },
    {
      location: new Point(46.447314, 15.19226),
      header: [
        "Šolski ekovrt",
        "Visoka greda",
        "Greda z jagodičevjem",
        "Hotel za žuželke",
        "Kompostnik",
        "Zelenjavni vrt"
      ],
      imgs: [
        [
          require("./../assets/img/Greda_za_zelenjavo.jpg"),
          require("./../assets/img/20130911_131329.jpg")
        ],
        [require("./../assets/img/20130911_131329.jpg")],
        [require("./../assets/img/20161006_130447.jpg")],
        [require("./../assets/img/foto_HOTEL_ZA_zUzELKE.jpg")],
        [require("./../assets/img/IMG_1314.jpg")],
        [require("./../assets/img/20180911_130153.jpg")]
      ],
      text: [
        `•	Naš ekovrt  zajema 5000 m2.  Postal je čudovita popestritev šolske okolice in zanimiv učni poligon za učence. Nanj smo zelo ponosni.
        \n•	Leta 2011 smo na pobudo Društva Ajda in s podporo vodstva šole, gospe ravnateljice mag. Natalije Aber Jordan ter gospe pomočnice Vesne Krebl zavihali rokave in za šolo oblikovali prve zeliščne gredice. Ob spoznanju, da kljub temu, da smo podeželska šola učence zanima delo v naravi in so zelo radi zahajali na ogled teh gredic, smo naslednje leto iz travnika oblikovali večjo obdelovalno površino, na kateri smo zasadili prvo zelenjavo. Ves čas so nam strokovno pomagali zunanji partnerji in s tem tudi predlagali razširitev našega vrta. 
        \n•	Leta 2014 smo ga preuredili v sodelovanju z lokalnimi partnerji – občino Mislinja, Društvom Ajda, Društvom za razvoj podeželja Las ter Srednjo šolo za hortikulturo in vizualne dejavnosti Celje.
        \n•	V sklopu šolskega ekovrta imamo zelenjavni  in zeliščni vrt, sadovnjak, gredice z okrasnim grmičevjem ter medovitimi rastlinami, njivo, čebelnjak, visoki gredi, kompostnik in učilnico na prostem.
        \n•	Pri delu se vključujejo vsi učenci, od 1.-9. razreda, še posebej pa tisti, ki so se vključili v interesne dejavnosti, katere so povezane z delom in opazovanjem na šolskem vrtu. Zanimanje za delo pa ni samo med učenci, ampak tudi med sodelavci. Obisk je vsako leto večji. 
        \n•	Delo obsega obdelavo tal, sejanje, saditev, pobiranje pridelkov in pripravo različnih jedi, marmelad, piškotov, čajev, dišečih vrečic, …
        \n•	Obujamo tudi stare običaje imeli smo projekt Od zrna do kruha 2013, Od zrna do  gvanta 2014,  Bučijada 2015, Rastlina našega vrta-ognjič 2016, Rastlina našega vrta-sladkorna pesa 2017, Krompirjada 2018, Koruzjada 2019.
        \n•	Kot potrditev za pravilno in uspešno delo, smo v jeseni 2013 prvič pridobili znak Šolski ekovrt,ki ga podeljuje Inštitut za trajnostni razvoj Republike Slovenije. Pridobljen znak velja dve leti zato smo ga leta 2016 in 2018 uspešno obnovili.
        \n•	V letu 2016-18 smo uspešno sodelovali z založbo Gaia. Nudili so nam strokovno in finančno podporo, kar smo s pridom izkoristili in bili nagrajeni za Naj mladi vrtnarji v letu 2016 in 2017.`,
        `•	Delo pri visokih gredah je manj naporno, saj se nam ni treba sklanjati. Prst je toplejša, kar omogoča zgodnejši pridelek. Mi smo se odločili, da v visoke grede zasadimo zelišča – meliso, različne vrste met, ameriški slamnik, rožmarin, timijan, majaron, dišečo perlo, materino dušico, kamilice, ognjič, dobro misel, žajbelj, sivko…
        \n•	Iz pridelanih zelišč v jesenskem času učenci izdelujejo čajne vrečice, mila, kreme, olja… `,
        `Na šolskem vrtu imamo posajenega tudi nekaj jagodičevja: malinjake, aronijo, brusnice, ameriške in sibirske borovnice. Vsako leto seveda dodamo kaj novega.
        Jagodičevje dobro uspeva zaradi sončne lege in naše oskrbe – vsako leto jih namreč ustrezno pognojimo s specialnimi naravnimi gnojili za jagodičevje,  iz bližnjega gozda priskrbimo nekaj kisle zemlje in jih nahranimo s humusom iz našega kompostnika. Zagotavljamo jim dovolj, vendar ne preveč vode. Tako nas že zgodaj poleti razveselijo z okusnimi plodovi, iz katerih skuhamo tudi kakšno marmelado, spečemo pecivo ipd. Sodelujemo s Turističnim društvom Mislinja in se v okviru prireditve Pozdrav jeseni vsako leto uspešno predstavimo s svojimi pridelki in izdelki.`,
        `Na šolskem vrtu želimo poskrbeti tudi za preživetje žuželk. Nekatere škodljivce želimo zvabiti stran od našega vrta in jim v zameno ponuditi ustrezne življenjske pogoje v hotelu. Če se v njem naselijo koristne žuželke, pa s tem povečamo njihovo populacijo. Gostje našega hotela so pikapolonice, čebele samotarke, navadne strigalice… 
        Zgradili smo ga leta 2013 in sicer v sodelovanju z učenci in učiteljico Lucijo Strmčnik pri izbirnem predmetu Obdelava gradiv – les ter z Albertom Javornikom iz ekološke kmetije Lešnik.`,
        `Kompost je naš najboljši pomočnik pri skrbi za zdrava, rodovitna tla. Z njim poskrbimo za pravilno odlaganje organskih odpadkov. 
        Pri izgradnji našega lesenega kompostnika nam je bilo poleg šolskega hišnika v veliko pomoč Društvo Ajda Koroška – Skupnost vrtičkarjev Mislinja. S svojimi nasveti in delom vsako leto poskrbijo za pravilno sestavljen kompost po biodinamični metodi.  
        Inšitut za trajnostni razvoj je izdal uporaben priročnik za pravilno kompostiranje, ki ga najdete na naslednji povezavi: http://www.itr.si/wp-content/uploads/2019/02/Kompostiranje-gradivo-kon%C4%8Dna.pdf`,
        `Začetki šolskega vrta segajo v 19. stoletje, ko je bila zgrajena nova osnovna šola v Šentilju pod Turjakom. Prvi članek o šolskem vrtu je bil napisan že l.1893 izpod peresa naravoslovca in pedagoga Janeza Koprivnika. Današnjo podobo koroškega gartlca je dobil leta 2014 pod mentorstvom gospoda Matjaža Ježa v sodelovanju z lokalnimi partnerji. Površina vrta je urejena po vzoru keltskega vrta, razdeljena v štiri pravokotna obodna polja z manjšim okroglim poljem v sredini.                                                                                                                 (povzeto po knjigi Matjaža Ježa in Fanike Jeromel: V vrtu z ljubeznijo)
        Šolski vrt nam pomeni pomembno pridobitev za sam učni proces – s pomočjo njega lahko sobivamo z naravo, pri učencih razvijamo naravoslovne veščine, sposobnost natančnega opazovanja, raziskovanja, eksperimentiranja, spremljanja rasti… 
        Delo opravljajo učenci cele šole, še posebej pa tisti, ki so vključeni v interesni dejavnosti pod mentorstvom učiteljic Sonje Blažun in Gordane Krajnc. Da nam pridelki dobro uspevajo, sledimo nekaterim smernicam:
        \n•	pridelke pridelujemo na povsem ekološki način;
        \n•	kolobarimo; 
        \n•	pri zasaditvi smo pozorni na slabe in dobre sosede;
        \n•	kompostiramo.
        Novičke s šolskega vrta lahko najdete na spletni strani naše šole: https://osmislinja.si/category/solski-vrt/`
      ]
    }
  ];

  onMarkerClick = index =>
    this.setState({
      marker_index: index,
      defaultView: false
    });

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
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableHighlight
                onPress={this.props.back}
                style={{
                  position: "absolute",
                  bottom: 35,
                  alignSelf: "center"
                }}
              >
                <Image
                  source={require("../assets/img/back.png")}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableHighlight>
            </View>
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
                images={_jsonPoints[_state.marker_index].imgs[_state.dropDownIndex].map(item => ({
                    source: item,
                    width: 800,
                    height: 600 
                }))}
                imageIndex={0}
                isVisible={this.state.imageFullScreen}
                onClose={() => this.setState({ imageFullScreen: false })}
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
                {
                  _jsonPoints[_state.marker_index].header[
                    _state.dropDownIndex || 0
                  ]
                }
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
                  {
                    _jsonPoints[_state.marker_index].text[
                      _state.dropDownIndex || 0
                    ]
                  }
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
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight
  }
});
