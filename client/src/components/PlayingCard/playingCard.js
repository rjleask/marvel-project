import React, { Component } from "react";

const PlayingCard = props => (
  <div className="playingcard-box">
    <p>{props.deck.name}</p>
    <img src={props.deck.thumbnail.path + ".jpg"} alt="Character Picture" />
    <span>{props.deck.value}</span>
  </div>
);

export default PlayingCard;
