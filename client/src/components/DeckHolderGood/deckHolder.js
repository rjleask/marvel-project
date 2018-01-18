import React, { Component } from "react";

const DeckHolderGood = props => (
  <section className="deck-holder-row good-guys">
    <div className="deck-holder-box good-guys">
      {props.deck.length > 7 ? props.deck[0].name : "no dice"}
    </div>
  </section>
);

export default DeckHolderGood;
