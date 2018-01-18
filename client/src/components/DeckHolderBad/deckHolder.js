import React, { Component } from "react";
import PlayingCard from "../PlayingCard";

const DeckHolderBad = props => (
  <section className="deck-holder-row bad-guys">
    <div className="deck-holder-box bad-guys">
      {props.deck.length > 7 ? (
        <PlayingCard
          deck={props.deck[Math.floor(Math.random() * props.deck.length)]}
        />
      ) : (
        "no dice"
      )}
    </div>
  </section>
);

export default DeckHolderBad;
