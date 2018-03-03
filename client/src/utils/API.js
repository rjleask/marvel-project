import md5 from "crypto-js/md5";
import keys from "../keys";
const axios = require("axios");
let letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "r",
  "s",
  "t"
];

export default {
  getLetter: function() {
    let letter = letters[Math.floor(Math.random() * letters.length)];
    return letter;
  },
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
      "&limit=24&orderBy=modified&nameStartsWith=" +
      this.getLetter();

    return axios.get(url).then(res => {
      return res.data.data.results;
    });
  }
};
