import React, { Component } from "react";
import PlayingCard from "../PlayingCard";

const MiddleGame = props => (
  <section className="game-middle-row">
    <div className="middle-card-boxes one">
      <PlayingCard deck={props.deckBot[2][0]} />
    </div>
    <div className="middle-card-boxes two">
      <PlayingCard deck={props.deckBot[1][0]} />
    </div>
    <div className="middle-card-boxes three">
      <PlayingCard deck={props.deckBot[0][0]} />
    </div>
    <div className="middle-card-boxes four">
      <PlayingCard deck={props.deckPlayer[0][0]} />
    </div>
    <div className="middle-card-boxes five">
      <PlayingCard deck={props.deckPlayer[1][0]} />
    </div>
    <div className="middle-card-boxes six">
      <PlayingCard deck={props.deckPlayer[2][0]} />
    </div>
  </section>
);

export default MiddleGame;
