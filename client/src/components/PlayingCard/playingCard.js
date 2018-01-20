import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";

class PlayingCard extends React.Component {
  state = {
    imageStatus: "loading"
  };
  handleOnLoad() {
    this.setState({ imageStatus: "loaded" });
  }
  handleOnError() {
    this.setState({ imageStatus: "failed to load" });
  }
  render() {
    return (
      // handles animations
      <CSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={700}
        transitionEnter={false}
        ransitionLeave={false}
      >
        <div className="playingcard-box" style={this.props.style}>
          {this.state.imageStatus === "loading" ? (
            <p />
          ) : (
            <p>{this.props.deck.name}</p>
          )}
          <img
            className="thumbnail"
            src={this.props.deck.thumbnail.path + ".jpg"}
            onLoad={this.handleOnLoad.bind(this)}
            onError={this.handleOnError.bind(this)}
            alt="Character Picture"
          />
          {/* {this.state.imageStatus} */}
          <span>{this.props.deck.value}</span>
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default PlayingCard;
