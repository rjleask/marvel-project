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
    this.compareCards = this.compareCards.bind(this);
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
      currentCardBad: [],
      war: false,
      warArrBot: [],
      warArrPlayer: [],
      displayMessage: false,
      warCardCounter: 0
    };
  }
  componentDidUpdate(prevProps, prevState) {
    // checks if the characters have been loaded post render from api
    this.state.characters.length > 1
      ? this.makeTheDecks()
      : console.log("Not here Yet");
    // this.state.gameStart ? this.startGame() : console.log("game not ready yet");
  }
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
    } else {
      console.log("decks are made", this.state.playerDeck);
    }
  };
  // shuffles input array
  shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };
  // handler for when the deck is clicked for a new card
  handleDeckClick() {
    if (!this.state.war) {
      let currentCard = [this.state.playerDeck.splice(0, 1)[0]];
      let currentCardBad = [this.state.botDeck.splice(0, 1)[0]];
      console.log(
        "player" + this.state.playerDeck.length,
        "bot" + this.state.botDeck.length
      );
      this.setState({
        currentCard: currentCard,
        currentCardBad: currentCardBad
      });
    } else {
      let counter = this.state.warCardCounter++;
      this.setState({ warCardCounter: counter });
    }
  }
  displayMessage = () => {
    let computerWins = (
      <div className="display-message">
        <h2>Computer Wins trick!</h2>
      </div>
    );
    let playerWins = (
      <div className="display-message">
        <h2>Player Wins trick!</h2>
      </div>
    );
    if (!this.state.war) {
      if (
        this.state.currentCardBad[0].value > this.state.currentCard[0].value
      ) {
        return computerWins;
      } else if (
        this.state.currentCard[0].value > this.state.currentCardBad[0].value
      ) {
        return playerWins;
      } else {
        return <h2 className="display-message">It's War!!!</h2>;
      }
    } else {
      if (
        this.state.warArrBot[this.state.warArrBot.length - 1][0] >
        this.state.warArrPlayer[this.state.warArrPlayer.length - 1][0]
      ) {
        return computerWins;
      } else {
        return playerWins;
      }
    }
  };
  setTimerMessage(letter, newValue) {
    setTimeout(() => {
      if (letter === "b") {
        this.setState({
          botDeck: newValue,
          displayMessage: false,
          war: false
        });
      } else {
        this.setState({
          playerDeck: newValue,
          displayMessage: false,
          war: false
        });
      }
    }, 4000);
  }
  assembleWarDeck = (deckArr, warArr) => {
    deckArr.forEach((character, index) => {
      if (index <= 2 && deckArr.length >= 3)
        warArr.push(deckArr.splice(index, 1));
    });
  };
  war = () => {
    this.assembleWarDeck(this.state.botDeck, this.state.warArrBot);
    this.assembleWarDeck(this.state.playerDeck, this.state.warArrPlayer);
    this.setState({ war: true });
    console.log(this.state.warArrPlayer, this.state.warArrBot);
  };
  compareCards() {
    if (!this.state.war) {
      let botCard = this.state.currentCardBad[0];
      let playerCard = this.state.currentCard[0];
      // Bot wins condition
      if (botCard.value > playerCard.value) {
        this.state.botDeck.push(botCard, playerCard);
        let newValue = this.state.botDeck;
        this.setState({ displayMessage: true });
        this.setTimerMessage("b", newValue);
        console.log("Bot wins trick", this.state.botDeck);
        // player wins condition
      } else if (playerCard.value > botCard.value) {
        this.state.playerDeck.push(botCard, playerCard);
        let newValue = this.state.playerDeck;
        this.setState({ displayMessage: true });
        this.setTimerMessage("a", newValue);
        console.log("Player wins trick", this.state.playerDeck);
        // war
      } else {
        this.war();
        console.log("war!");
      }
    } else {
      let warCardBot = this.state.warArrBot;
      let warCardPlayer = this.state.warArrPlayer;
      if (
        warCardBot[warCardBot.length - 1][0].value >
        warCardPlayer[warCardPlayer.length - 1][0].value
      ) {
        for (let i = 0; i < warCardPlayer.length && warCardBot.length; i++) {
          this.state.botDeck.push(warCardPlayer[i][0], warCardBot[i][0]);
        }
        let newValue = this.state.botDeck;
        this.setState({ displayMessage: true });
        this.setTimerMessage("b", newValue);
        console.log("Bot Deck" + this.state.botDeck);
      } else {
        for (let i = 0; i < warCardBot.length && warCardPlayer.length; i++) {
          this.state.playerDeck.push(warCardBot[i][0], warCardPlayer[i][0]);
        }
        let newValue = this.state.playerDeck;
        this.setState({ displayMessage: true });
        this.setTimerMessage("a", newValue);
        console.log("Player Deck" + this.state.playerDeck);
      }
    }
  }
  // api call for the characters
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
  // renders the game
  renderGame = () => {
    // calls api and starts game if its not active
    if (this.state.gameStart) {
      return (
        <div>
          <DeckHolderBad deck={this.state.currentCardBad} />
          <MiddleGame
            cardCount={this.state.warCardCounter}
            deckBot={this.state.warArrBot}
            deckPlayer={this.state.warArrPlayer}
          />
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
        {/* if the display message is set to true render the display message */}
        {this.state.displayMessage ? this.displayMessage() : ""}
        <button className="compare-btn" onClick={this.compareCards}>
          Compare
        </button>
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
