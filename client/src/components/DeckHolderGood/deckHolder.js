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
        >
          <div className="next-card">Next Card</div>
        </div>
        <div className="deck-holder-box good-guys middle-good">
          {/* {console.log(this.props.deck)} */}
          {this.renderPlayingCards()}
        </div>
        <div
          className="deck-holder-box good-guys score-box"
          // style={{ visibility: "hidden" }}
        >
          <p>Cards: {this.props.numCards}</p>
          <p className="score">Player Score: {this.props.playerScore}</p>
        </div>
      </section>
    );
  }
}

export default DeckHolderGood;
