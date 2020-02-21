import axios from 'axios';

const _API_ = 'https://kois.herokuapp.com/api/mobile/';

export default class {
    static async getMarkerLocations() {
        return new Promise(async (resolve, reject) => {
            await axios.get(`${_API_}/locations`).then(resolve).catch(reject);
        });
    }

    static async getPointData(id) {
        return new Promise(async (resolve, reject) => {
            await axios.get(`${_API_}/location/${id}`).then(resolve).catch(reject);
        });
    }
}