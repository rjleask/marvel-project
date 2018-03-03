import React, { Component } from "react";
import ImgLoader from "../ImageLoader";
import notFound from "./notfound.png";

class PlayingCard extends React.Component {
  state = {
    imageStatus: "loading",
    description: false
  };
  handleEnter = () => {
    this.setState({ description: true });
  };
  handleLeave = () => {
    this.setState({ description: false });
  };
  render() {
    return (
      <div
        key={this.props.deck.id}
        className={this.props.display ? this.props.cat : "playingcard-box"}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
      >
        <p className="character-name">{this.props.deck.name}</p>
        {!this.state.description ? (
          <ImgLoader
            image={
              this.props.deck.thumbnail.path.search("not") != -1
                ? notFound
                : this.props.deck.thumbnail.path +
                  "." +
                  this.props.deck.thumbnail.extension
            }
          />
        ) : (
          <div className="chr-description">
            <a
              href={"http://marvel.wikia.com/wiki/" + this.props.deck.name}
              target="_blank"
            >
              Character Description
            </a>
          </div>
        )}
        <span className="value">{this.props.deck.value}</span>
      </div>
    );
  }
}

export default PlayingCard;
