import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import TestButton from "../../components/TestButton";
import API from "../../utils/API.js";
import DeckHolderBad from "../../components/DeckHolderBad";
import DeckHolderGood from "../../components/DeckHolderGood";
import MiddleGame from "../../components/MiddleGameArea";
import { setTimeout } from "timers";
import MessageDisplay from "../../components/MessageDisplay";
import mainPicture from "./war.png";

const axios = require("axios");

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleDeckClick = this.handleDeckClick.bind(this);
    this.compareCards = this.compareCards.bind(this);
    this.state = {
      characters: [],
      isHidden: true,
      loaded: false,
      gameStart: false,
      playerDeck: [],
      botDeck: [],
      currentCard: [],
      currentCardBad: [],
      war: false,
      warArrBot: [],
      warArrPlayer: [],
      displayMessage: false,
      warCardCounter: 0,
      warDisplay: false,
      message: "none",
      endGame: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // checks if the characters have been loaded post render from api
    if (!this.state.loaded && this.state.characters.length > 1) {
      this.makeTheDecks();
      this.setState({ loaded: true });
    }
    // this.state.characters.length > 1
    //   ? this.makeTheDecks()
    //   : console.log("Not here Yet");
    // // this.state.gameStart ? this.startGame() : console.log("game not ready yet");
  }
  makeTheDecks = () => {
    // if (this.state.playerDeck.length < 1) {
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
    // } else {
    //   console.log("decks are made", this.state.playerDeck);
    // }
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
    if (!this.state.war && this.state.currentCard.length === 0) {
      let currentCard = [this.state.playerDeck.splice(0, 1)[0]];
      let currentCardBad = [this.state.botDeck.splice(0, 1)[0]];
      if (this.state.playerDeck.length < 1 || this.state.botDeck.length < 1) {
        this.setState({ endGame: true });
      }
      console.log(
        "player" + this.state.playerDeck.length,
        "bot" + this.state.botDeck.length
      );
      this.setState({
        currentCard: currentCard,
        currentCardBad: currentCardBad
      });
    } else {
      // this.setState({ warCardCounter: this.state.warCardCounter + 1 });
    }
  }
  setTimerMessage(letter, newValue) {
    setTimeout(() => {
      if (letter === "b") {
        this.setState({
          botDeck: newValue,
          displayMessage: false,
          war: false,
          warDisplay: false,
          currentCard: [],
          currentCardBad: [],
          warArrBot: [],
          warArrPlayer: []
        });
      } else if (letter === "a") {
        this.setState({
          playerDeck: newValue,
          displayMessage: false,
          war: false,
          warDisplay: false,
          currentCard: [],
          currentCardBad: [],
          warArrBot: [],
          warArrPlayer: []
        });
      } else {
        this.setState({ displayMessage: false });
      }
    }, 2000);
  }
  // make the war arrays by splicing them from the decks
  assembleWarDeck = (deckArr, warArr) => {
    console.log(deckArr, warArr);
    warArr.push(deckArr.splice(0, 3));
    console.log(warArr[0], deckArr);
  };
  war = () => {
    this.assembleWarDeck(this.state.botDeck, this.state.warArrBot);
    this.assembleWarDeck(this.state.playerDeck, this.state.warArrPlayer);
    this.setState({
      displayMessage: true,
      message: "Warrrrr!!!",
      war: true,
      warDisplay: true
    });
    this.setTimerMessage("c", "war");
    console.log(this.state.warArrPlayer, this.state.warArrBot);
  };
  compareCards() {
    if (!this.state.war) {
      if (this.state.currentCard.length != 0) {
        let botCard = this.state.currentCardBad[0];
        let playerCard = this.state.currentCard[0];
        // Bot wins condition
        if (botCard.value > playerCard.value) {
          this.state.botDeck.push(botCard, playerCard);
          let newValue = this.state.botDeck;
          this.setState({
            displayMessage: true,
            message: "Computer Wins Trick!"
          });
          this.setTimerMessage("b", newValue);
          console.log("Bot wins trick", this.state.botDeck);
          // player wins condition
        } else if (playerCard.value > botCard.value) {
          this.state.playerDeck.push(botCard, playerCard);
          let newValue = this.state.playerDeck;
          this.setState({
            displayMessage: true,
            message: "Player Wins Trick!"
          });
          this.setTimerMessage("a", newValue);
          console.log("Player wins trick", this.state.playerDeck);
          // war
        } else {
          this.war();
          console.log("war!");
        }
      }
    } else {
      this.warCompareCards();
    }
  }
  warCompareCards = () => {
    var totalArr = this.state.warArrBot[0].concat(this.state.warArrPlayer[0]);
    console.log(
      "bot value " +
        this.state.warArrBot[0][this.state.warArrBot.length - 1].value,
      this.state.warArrPlayer[0][this.state.warArrPlayer.length - 1].value,
      totalArr
    );
    if (
      this.state.warArrBot[0][this.state.warArrBot[0].length - 1].value >
      this.state.warArrPlayer[0][this.state.warArrPlayer[0].length - 1].value
    ) {
      for (let i = 0; i < totalArr.length; i++) {
        this.state.botDeck.push(totalArr[i]);
      }
      totalArr = [];
      let newValue = this.state.botDeck;
      this.setState({ displayMessage: true, message: "Computer Wins Trick!" });
      this.setTimerMessage("b", newValue);
      console.log("Bot Deck" + this.state.botDeck);
    } else {
      for (let i = 0; i < totalArr.length; i++) {
        this.state.playerDeck.push(totalArr[i]);
      }
      let newValue = this.state.playerDeck;
      totalArr = [];
      this.setState({ displayMessage: true, message: "Player Wins Trick!" });
      this.setTimerMessage("a", newValue);
      console.log("Player Deck" + this.state.playerDeck);
    }
  };
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
  endGame = () => {
    if (this.state.playerDeck.length < 1) {
      this.setState({ displayMessage: true, message: "Computer Wins Game!" });
    } else if (this.state.botDeck.length < 1) {
      this.setState({ displayMessage: true, message: "Player Wins Game!" });
    }
    return (
      <div className="new-game">
        <button>new game?</button>
      </div>
    );
  };
  // renders the game
  renderGame = () => {
    // calls api and starts game if its not active
    if (this.state.gameStart && !this.state.endGame) {
      {
        document.body.style =
          "background-image:linear-gradient(to bottom, rgba(231, 8, 8,1), rgba(7, 7, 7,1), rgba(5, 9, 236,1));";
      }
      return (
        <div>
          {/* if the display message is set to true render the display message */}
          {this.state.displayMessage ? (
            <MessageDisplay
              message={this.state.message}
              war={this.state.war}
              endGame={this.state.endGame}
            />
          ) : (
            ""
          )}
          <button className="compare-btn" onClick={this.compareCards}>
            VS
          </button>
          <DeckHolderBad
            deck={this.state.currentCardBad}
            numCards={this.state.botDeck.length}
          />
          <MiddleGame
            deckBot={this.state.warArrBot[0]}
            deckPlayer={this.state.warArrPlayer[0]}
            war={this.state.war}
            display={this.state.warDisplay}
          />
          <DeckHolderGood
            action={this.handleDeckClick}
            deck={this.state.currentCard}
            numCards={this.state.playerDeck.length}
          />
        </div>
      );
    } else {
      {
        document.body.style =
          "background-image:url('http://legionofleia.com/wp-content/uploads/Marvel_Logo.jpg');";
        if (this.state.endGame) {
          return <div className="end-game">{this.endGame()}</div>;
        } else {
          return (
            <div className="page-intro">
              <div className="nav-top title">The Card Game</div>
              <div className="title-img-box">
                <img className="title-img" src={mainPicture} />
              </div>
              <div className="nav-bot title">
                <TestButton onClick={this.loadAllCharacters} />
              </div>
            </div>
          );
        }
      }
    }
  };

  render() {
    return <div className="game-wrapper">{this.renderGame()}</div>;
  }
}
export default Home;
