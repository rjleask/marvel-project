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
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        {this.props.styles === false ? (
          <div className="playingcard-box">
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
              key={this.props.deck.thumbnail.path}
            />
            <span>{this.props.deck.value}</span>
          </div>
        ) : (
          <div className="playingcard-box" style={{ opacity: "0" }}>
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
              key={this.props.deck.thumbnail.path}
            />
            <span>{this.props.deck.value}</span>
          </div>
        )}
      </CSSTransitionGroup>
    );
  }
}

export default PlayingCard;
