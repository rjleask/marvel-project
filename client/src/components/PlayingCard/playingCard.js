import React, { Component } from "react";
// import { CSSTransitionGroup } from "react-transition-group";
// import ProgressiveImage from "react-progressive-image";
import ImgLoader from "../ImageLoader";

class PlayingCard extends React.Component {
  state = {
    imageStatus: "loading"
  };
  render() {
    return (
      <div className="playingcard-box">
        <p>{this.props.deck.name}</p>
        <ImgLoader image={this.props.deck.thumbnail.path + ".jpg"} />
        <span>{this.props.deck.value}</span>
      </div>
    );
  }
}

export default PlayingCard;
