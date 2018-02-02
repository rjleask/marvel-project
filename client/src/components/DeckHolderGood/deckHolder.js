import React, { Component } from "react";
import PlayingCard from "../PlayingCard";

class DeckHolderGood extends React.Component {
  renderPlayingCards = () => {
    if (this.props.deck.length > 0) {
      // const indexer = this.props.deck.map((item, i) => {});
      return <PlayingCard deck={this.props.deck[0]} />;
    }
  };
  render() {
    return (
      <section className="deck-holder-row good-guys">
        <div
          className="deck-holder-box good-guys deck"
          onClick={this.props.action}
        />
        <div className="deck-holder-box good-guys middle-good">
          {/* {console.log(this.props.deck)} */}
          {this.renderPlayingCards()}
        </div>
        <div
          className="deck-holder-box good-guys"
          style={{ visibility: "hidden" }}
        />
      </section>
    );
  }
}

export default DeckHolderGood;
