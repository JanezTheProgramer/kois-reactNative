import axios from 'axios';
import React from 'react';
import { AsyncStorage } from 'react-native';

export default class {

    static DEFAULT_URI = 'https://kois.herokuapp.com/api/mobile/';

    static async _getURI() {
        const uri = await AsyncStorage.getItem('apiURI');
        return !uri ? this.DEFAULT_URI : uri;
    }

    static async getMarkerLocations() {
        return new Promise(async (resolve, reject) => {
            await axios.get(`${this._getURI()}/locations`).then(resolve).catch(reject);
        });
    }

    static async getPointData(id) {
        return new Promise(async (resolve, reject) => {
            await axios.get(`${this._getURI()}/location/${id}`).then(resolve).catch(reject);
        });
    }
}