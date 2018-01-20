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
    this.handleDeckClick = this.handleDeckClick.bind(this);
    this.state = {
      characters: [],
      hasData: false,
      isHidden: true,
      gameStart: false,
      playerDeck: [],
      playerCardNum: 8,
      botDeck: [],
      botCardNum: 8,
      currentCard: [],
      displayCard: false
    };
  }
  componentDidUpdate(prevProps, prevState) {
    // checks if the characters have been loaded post render from api
    this.state.characters.length > 1
      ? this.makeTheDecks()
      : console.log("Not here Yet");
    // this.state.gameStart ? this.startGame() : console.log("game not ready yet");
  }
  compareCardValues = () => {};
  makeTheDecks = () => {
    if (this.state.playerDeck.length < 1) {
      console.log(this.state.characters);
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
      let shuffledDeck = this.shuffle(deckFinal);
      // add player and bot decks
      this.setState({
        playerDeck: shuffledDeck.slice(0, 8),
        botDeck: shuffledDeck.slice(8, 16)
      });
      // this.botObject.deck = deckFinal.slice(8, 16);
      // console.log(this.state.playerDeck, this.state.botDeck);
    } else {
      console.log("decks are made");
    }
  };
  shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };
  handleDeckClick() {
    let currentCard = [this.state.playerDeck.splice(0, 1)[0]];
    console.log(this.state.playerDeck.length);
    this.setState({
      currentCard: currentCard
    });
  }
  loadAllCharacters = () => {
    API.getAllCharacters()
      .then(res => {
        let randomArr = this.shuffle(res);
        this.setState({
          characters: randomArr,
          gameStart: true
        });
      })
      .catch(err => console.log(err));
  };
  renderGame = () => {
    // calls api and starts game if its not active
    if (this.state.gameStart) {
      return (
        <div>
          <DeckHolderBad deck={this.state.botDeck} />
          <MiddleGame />
          <DeckHolderGood
            action={this.handleDeckClick}
            deck={this.state.currentCard}
          />
        </div>
      );
    } else {
      return <TestButton onClick={this.loadAllCharacters} />;
    }
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
        {this.renderGame()}
      </div>
    );
  }
}
export default Home;
