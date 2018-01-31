import React, { Component } from "react";
import ImgLoader from "../ImageLoader";

class PlayingCard extends React.Component {
  state = {
    imageStatus: "loading"
  };
  render() {
    return (
      <div className={this.props.display ? this.props.cat : "playingcard-box"}>
        <p className="character-name">{this.props.deck.name}</p>
        <ImgLoader image={this.props.deck.thumbnail.path + ".jpg"} />
        <span className="value">{this.props.deck.value}</span>
      </div>
    );
  }
}

export default PlayingCard;
