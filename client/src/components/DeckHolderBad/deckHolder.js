import React, { Component } from "react";
import PlayingCard from "../PlayingCard";

class DeckHolderBad extends React.Component {
  renderPlayingCards = () => {
    if (this.props.deck.length > 0) {
      return (
        <PlayingCard deck={this.props.deck[0]} styles={this.props.styles} />
      );
    }
  };
  render() {
    return (
      <section className="deck-holder-row bad-guys">
        <div
          className="deck-holder-box bad-guys"
          style={{ visibility: "hidden" }}
        />
        <div className="deck-holder-box bad-guys">
          {this.renderPlayingCards()}
        </div>
        <div
          className="deck-holder-box bad-guys deck"
          onClick={this.props.action}
        />
      </section>
    );
  }
}

export default DeckHolderBad;
