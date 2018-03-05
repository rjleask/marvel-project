import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import TestButton from "../../components/TestButton";
import API from "../../utils/API.js";
import DeckHolderBad from "../../components/DeckHolderBad";
import DeckHolderGood from "../../components/DeckHolderGood";
import MiddleGame from "../../components/MiddleGameArea";
import UserTour from "../../components/UserTour";
import MessageDisplay from "../../components/MessageDisplay";
import mainPicture from "./war.png";

const axios = require("axios");

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleDeckClick = this.handleDeckClick.bind(this);
    this.compareCards = this.compareCards.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.finalCompare = this.finalCompare.bind(this);
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
      doubleWar: false,
      warArrBot: [],
      warArrPlayer: [],
      displayMessage: false,
      warCardCounter: 0,
      warDisplay: false,
      playerScore: 0,
      computerScore: 0,
      message: "none",
      totalWarArr: "",
      count: 0,
      endGame: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // checks if the characters have been loaded post render from api
    if (!this.state.loaded && this.state.characters.length > 1) {
      this.makeTheDecks();
      this.setState({ loaded: true });
    }
  }
  makeTheDecks = () => {
    // if (this.state.playerDeck.length < 1) {
    console.log(this.state.characters);
    const deckInitial = [];
    let deckFinal;
    this.state.characters.forEach(character => {
      deckInitial.push(character);
    });
    let sectionArr1 = deckInitial.splice(0, 6);
    let sectionArr2 = deckInitial.splice(0, 6);
    let sectionArr3 = deckInitial.splice(0, 6);
    for (let i = 0; i < 6; i++) {
      sectionArr1[i].value = i + 1;
      sectionArr2[i].value = i + 1;
      sectionArr3[i].value = i + 1;
      deckInitial[i].value = i + 1;
    }
    deckFinal = deckInitial.concat(sectionArr1, sectionArr2, sectionArr3);
    let shuffledDeck = this.shuffle(deckFinal);
    // add player and bot decks
    this.setState({
      playerDeck: shuffledDeck.slice(0, 12),
      botDeck: shuffledDeck.slice(12, 24)
    });
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
      if (
        this.state.playerDeck.length < 1 ||
        this.state.botDeck.length < 1 ||
        this.state.playerScore >= 20 ||
        this.state.computerScore >= 20
      ) {
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
          warArrPlayer: [],
          doubleWar: false,
          totalWarArr: ""
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
          warArrPlayer: [],
          doubleWar: false,
          totalWarArr: ""
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
  doubleWar = () => {
    this.setState({ doubleWar: true, displayMessage: true, message: "Tie!" });
    this.setTimerMessage("c", "double war");
  };
  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  computerWins = (deck, count, playerVal, computerVal) => {
    // no war condition
    if (!this.state.war) {
      this.state.botDeck.push(playerVal, computerVal);
      let newValue = this.state.botDeck;
      this.setState({
        displayMessage: true,
        computerScore: this.state.computerScore + 2,
        message: "Computer Wins Trick!"
      });
      this.setTimerMessage("b", newValue);
      // double war condition
    } else if (this.state.doubleWar) {
      for (let i = 0; i < this.state.totalWarArr.length; i++) {
        this.state.botDeck.push(this.state.totalWarArr[i]);
      }
      let newValue = this.state.botDeck;
      this.setState({
        displayMessage: true,
        message: "Computer Wins! " + computerVal + ">" + playerVal,
        computerScore: this.state.computerScore + this.state.count
      });
      this.setTimerMessage("b", newValue);
      // war condition
    } else {
      for (let i = 0; i < deck.length; i++) {
        this.state.botDeck.push(deck[i]);
      }
      let newValue = this.state.botDeck;
      this.setState({
        displayMessage: true,
        message: "Computer Wins Trick!",
        computerScore: this.state.computerScore + count
      });
      this.setTimerMessage("b", newValue);
    }
  };
  playerWins = (deck, count, playerVal, computerVal) => {
    if (!this.state.war) {
      this.state.playerDeck.push(computerVal, playerVal);
      let newValue = this.state.playerDeck;
      this.setState({
        displayMessage: true,
        playerScore: this.state.playerScore + 2,
        message: "Player Wins Trick!"
      });
      this.setTimerMessage("a", newValue);
    } else if (this.state.doubleWar) {
      for (let i = 0; i < this.state.totalWarArr.length; i++) {
        this.state.playerDeck.push(this.state.totalWarArr[i]);
      }
      let newValue = this.state.playerDeck;
      this.setState({
        displayMessage: true,
        message: "Player Wins! " + playerVal + ">" + computerVal,
        playerScore: this.state.playerScore + this.state.count
      });
      this.setTimerMessage("a", newValue);
    } else {
      for (let i = 0; i < deck.length; i++) {
        this.state.playerDeck.push(deck[i]);
      }
      let newValue = this.state.playerDeck;
      this.setState({
        displayMessage: true,
        message: "Player Wins Trick!",
        playerScore: this.state.playerScore + count
      });
      this.setTimerMessage("a", newValue);
    }
  };
  finalCompare() {
    let playerVal = this.getRandomInt(1000);
    let computerVal = this.getRandomInt(1000);
    if (playerVal > computerVal) {
      this.playerWins("void", "void", playerVal, computerVal);
    } else {
      this.computerWins("void", "void", playerVal, computerVal);
    }
  }
  compareCards() {
    if (!this.state.war) {
      if (this.state.currentCard.length != 0) {
        let botCard = this.state.currentCardBad[0];
        let playerCard = this.state.currentCard[0];
        // Bot wins condition
        if (botCard.value > playerCard.value) {
          this.computerWins("void", "void", playerCard, botCard);
          // player wins condition
        } else if (playerCard.value > botCard.value) {
          this.playerWins("void", "void", playerCard, botCard);
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
  // if it's a war compare cards and set up arrays for easy placement in proper decks
  warCompareCards = () => {
    let computerWarValue = this.state.warArrBot[0][
      this.state.warArrBot[0].length - 1
    ].value;
    let playerWarValue = this.state.warArrPlayer[0][
      this.state.warArrPlayer[0].length - 1
    ].value;
    let totalArr = this.state.warArrBot[0].concat(this.state.warArrPlayer[0]);
    totalArr.push(this.state.currentCard[0], this.state.currentCardBad[0]);
    let count = totalArr.length;
    this.setState({ totalWarArr: totalArr, count: count });
    if (computerWarValue > playerWarValue) {
      this.computerWins(totalArr, count, "void", "void");
      totalArr = [];
    } else if (computerWarValue === playerWarValue) {
      this.doubleWar(totalArr, count);
    } else {
      this.playerWins(totalArr, count, "void", "void");
      totalArr = [];
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
  handleNewGame() {
    this.setState({
      endGame: false,
      isHidden: true,
      loaded: false,
      playerDeck: [],
      botDeck: [],
      currentCard: [],
      currentCardBad: [],
      playerScore: 0,
      computerScore: 0
    });
    this.loadAllCharacters();
  }
  endGame = () => {
    return (
      <div className="new-game-box">
        <button className="new-game-btn" onClick={this.handleNewGame}>
          New game?
        </button>
      </div>
    );
  };
  endGameDisplay = () => {
    if (this.state.playerDeck.length < 1 || this.state.computerScore >= 20) {
      return "Computer Wins Game!";
    } else {
      return "Player Wins Game!";
    }
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
        <div className="content-wrapper">
          <UserTour />
          {/* if the display message is set to true render the display message */}
          {this.state.displayMessage ? (
            <MessageDisplay message={this.state.message} />
          ) : (
            ""
          )}
          {/* if its a doublewar change the button to the final compare button */}
          {!this.state.doubleWar ? (
            <button className="compare-btn" onClick={this.compareCards}>
              VS
            </button>
          ) : (
            <button className="compare-btn" onClick={this.finalCompare}>
              Decider
            </button>
          )}
          <DeckHolderBad
            deck={this.state.currentCardBad}
            numCards={this.state.botDeck.length}
            computerScore={this.state.computerScore}
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
            playerScore={this.state.playerScore}
          />
        </div>
      );
    } else {
      {
        document.body.style =
          "background-image:url('http://legionofleia.com/wp-content/uploads/Marvel_Logo.jpg');";
        if (this.state.endGame) {
          return (
            <div>
              <MessageDisplay
                message={this.state.message}
                endGame={this.state.endGame}
                endGameMsg={this.endGameDisplay()}
              />
              {this.endGame()}
            </div>
          );
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
