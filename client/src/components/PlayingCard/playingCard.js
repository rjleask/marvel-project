import React, { Component } from "react";
import ImgLoader from "../ImageLoader";
import notFound from "./notfound.png";

class PlayingCard extends React.Component {
  state = {
    imageStatus: "loading"
  };
  render() {
    return (
      <div
        key={this.props.deck.id}
        className={this.props.display ? this.props.cat : "playingcard-box"}
      >
        <p className="character-name">{this.props.deck.name}</p>
        <ImgLoader
          image={
            this.props.deck.thumbnail.path.search("not") != -1
              ? notFound
              : this.props.deck.thumbnail.path +
                "." +
                this.props.deck.thumbnail.extension
          }
        />
        <span className="value">{this.props.deck.value}</span>
      </div>
    );
  }
}

export default PlayingCard;
