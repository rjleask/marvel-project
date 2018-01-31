import React, { Component } from "react";
import PlayingCard from "../PlayingCard";

const MiddleGame = props => (
  <section>
    {props.deckBot.length > 0 ? (
      <section className="game-middle-row">
        <div className="middle-card-boxes third">
          <PlayingCard
            deck={props.deckBot[props.deckBot.length - 1][0]}
            cat="three"
            display={props.display}
          />
        </div>
        <div className="middle-card-boxes second">
          <PlayingCard
            deck={props.deckBot[1][0]}
            cat="two"
            display={props.display}
          />
        </div>
        <div className="middle-card-boxes first">
          <PlayingCard
            deck={props.deckBot[0][0]}
            cat="one"
            display={props.display}
          />
        </div>
        <div className="middle-card-boxes first">
          <PlayingCard
            deck={props.deckPlayer[0][0]}
            cat="one"
            display={props.display}
          />
        </div>
        <div className="middle-card-boxes second">
          <PlayingCard
            deck={props.deckPlayer[1][0]}
            cat="two"
            display={props.display}
          />
        </div>
        <div className="middle-card-boxes third">
          <PlayingCard
            deck={props.deckPlayer[props.deckBot.length - 1][0]}
            cat="three"
            display={props.display}
          />
        </div>
      </section>
    ) : (
      <section className="game-middle-row">
        <div className="middle-card-boxes" />
        <div className="middle-card-boxes" />
        <div className="middle-card-boxes" />
        <div className="middle-card-boxes" />
        <div className="middle-card-boxes" />
        <div className="middle-card-boxes" />
      </section>
    )}
  </section>
);

export default MiddleGame;
