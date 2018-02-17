import React, { Component } from "react";
import PlayingCard from "../PlayingCard";
// display playing card boxes depending on how many cards are in the war array
const MiddleGame = props => (
  <section>
    {props.war ? (
      <section className="game-middle-row">
        <div
          className={
            props.deckBot.length === 3
              ? "middle-card-boxes third"
              : "middle-card-boxes"
          }
        >
          {props.deckBot.length === 3 ? (
            <PlayingCard
              deck={props.deckBot[props.deckBot.length - 1]}
              cat="three"
              display={props.display}
            />
          ) : (
            <div className="middle-card-boxes" />
          )}
        </div>
        <div
          className={
            props.deckBot.length === 2
              ? "middle-card-boxes third"
              : "middle-card-boxes second"
          }
        >
          {props.deckBot.length >= 2 ? (
            <PlayingCard
              deck={props.deckBot[1]}
              cat="two"
              display={props.display}
            />
          ) : (
            <div className="middle-card-boxes" />
          )}
        </div>
        <div
          className={
            props.deckBot.length === 1
              ? "middle-card-boxes third"
              : "middle-card-boxes first"
          }
        >
          <PlayingCard
            deck={props.deckBot[0]}
            cat="one"
            display={props.display}
          />
        </div>
        <div
          className={
            props.deckPlayer.length === 1
              ? "middle-card-boxes third middle-good"
              : "middle-card-boxes middle-good first"
          }
        >
          <PlayingCard
            deck={props.deckPlayer[0]}
            cat="one"
            display={props.display}
          />
        </div>
        <div
          className={
            props.deckPlayer.length === 2
              ? "middle-card-boxes third middle-good"
              : "middle-card-boxes second middle-good"
          }
        >
          {props.deckPlayer.length >= 2 ? (
            <PlayingCard
              deck={props.deckPlayer[1]}
              cat="two"
              display={props.display}
            />
          ) : (
            <div className="middle-card-boxes middle-good" />
          )}
        </div>

        <div
          className={
            props.deckPlayer.length === 3
              ? "middle-card-boxes third middle-good"
              : "middle-card-boxes middle-good"
          }
        >
          {props.deckPlayer.length === 3 ? (
            <PlayingCard
              deck={props.deckPlayer[props.deckPlayer.length - 1]}
              cat="three"
              display={props.display}
            />
          ) : (
            <div className="middle-card-boxes middle-good" />
          )}
        </div>
      </section>
    ) : (
      <section className="game-middle-row">
        <div className="middle-card-boxes" />
        <div className="middle-card-boxes" />
        <div className="middle-card-boxes" />
        <div className="middle-card-boxes middle-good" />
        <div className="middle-card-boxes middle-good" />
        <div className="middle-card-boxes middle-good" />
      </section>
    )}
  </section>
);

export default MiddleGame;
