import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import TestButton from "../../components/TestButton";
import API from "../../utils/API.js";
import ToggleCharacter from "../../components/ToggleCharacterButton";
import DeckHolderBad from "../../components/DeckHolderBad";
import DeckHolderGood from "../../components/DeckHolderGood";
import MiddleGame from "../../components/MiddleGameArea";

const axios = require("axios");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      hasData: false,
      isHidden: true,
      gameStart: false,
      playerDeck: [],
      playerCardNum: 8,
      botDeck: [],
      botCardNum: 8
    };
  }
  componentDidUpdate(prevProps, prevState) {
    // checks if the characters have been loaded post render from api
    this.state.characters.length > 1
      ? this.makeTheDecks()
      : console.log("Not here Yet");
    // this.state.gameStart ? this.startGame() : console.log("game not ready yet");
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
    this.setState({
      playerDeck: deckFinal.slice(0, 8),
      botDeck: deckFinal.slice(8, 16)
    });
    // this.botObject.deck = deckFinal.slice(8, 16);
    console.log(this.botObject.deck, this.playerObject.deck);
  };
  loadAllCharacters = () => {
    API.getAllCharacters()
      .then(res =>
        this.setState({
          characters: res,
          gameStart: true
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
      <div className="game-wrapper">
        <ToggleCharacter onClick={this.toggleCharacter} />
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
        {/* end of navbar */}
        {/* shows game board */}
        {this.state.gameStart ? (
          <div>
            <DeckHolderBad />
            <MiddleGame />
            <DeckHolderGood />
            {/* {this.state.loadDecks ? <div>} */}
          </div>
        ) : (
          <TestButton onClick={this.loadAllCharacters} />
        )}
        {/* end of game board */}
      </div>
    );
  }
}
export default Home;
