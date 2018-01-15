import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import TestButton from "../../components/TestButton";
import API from "../../utils/API.js";
import ToggleCharacter from "../../components/ToggleCharacterButton";
const axios = require("axios");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      hasData: false,
      isHidden: true
    };
  }
  componentDidUpdate(prevProps, prevState) {
    // checks if the characters have been loaded post render from api
    this.state.characters.length > 1
      ? this.makeTheDecks()
      : console.log("Not here Yet");
  }
  // player
  playerObject = {
    cardNum: 8,
    deck: []
  };
  // bot
  botObject = {
    cardNum: 8,
    deck: []
  };
  makeTheDecks = () => {
    const deckInitial = [];
    let deckFinal;
    this.state.characters.forEach(character => {
      deckInitial.push(character);
    });
    let sectionArr1 = deckInitial.splice(0, 4);
    let sectionArr2 = deckInitial.splice(0, 4);
    let sectionArr3 = deckInitial.splice(0, 4);
    for (let i = 0; i < 4; i++) {
      sectionArr1[i].value = i + 1;
      sectionArr2[i].value = i + 1;
      sectionArr3[i].value = i + 1;
      deckInitial[i].value = i + 1;
    }
    deckFinal = deckInitial.concat(sectionArr1, sectionArr2, sectionArr3);
    // add player and bot decks
    this.playerObject.deck = deckFinal.slice(0, 8);
    this.botObject.deck = deckFinal.slice(8, 16);
    console.log(this.botObject.deck, this.playerObject.deck);
  };
  loadAllCharacters = () => {
    API.getAllCharacters()
      .then(res =>
        this.setState({
          characters: res
        })
      )
      .catch(err => console.log(err));
  };
  toggleCharacter = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  render() {
    return (
      <div>
        <div className="game-wrapper">
          <ToggleCharacter onClick={this.toggleCharacter} />
          <TestButton onClick={this.loadAllCharacters} />
          {/* toggle display of character navbar */}
          <section
            className={
              this.state.isHidden
                ? "flex-playerbot-row disappear"
                : "flex-playerbot-row reappear"
            }
          >
            <div className="playerbot-character-box" />
          </section>
        </div>
      </div>
    );
  }
}
export default Home;
