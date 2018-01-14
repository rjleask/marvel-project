import md5 from "crypto-js/md5";
import keys from "../keys";
const axios = require("axios");

export default {
  getAllCharacters: function() {
    const pubKey = keys.marvel.public;
    const prvKey = keys.marvel.private;
    let ts = new Date().getTime();
    let hash = md5(ts + prvKey + pubKey);
    const url =
      "https://gateway.marvel.com:443/v1/public/characters?ts=" +
      ts +
      "&apikey=" +
      pubKey +
      "&hash=" +
      hash +
      "&limit=16";

    return axios.get(url).then(res => {
      return res.data.data.results;
    });
  }
};
