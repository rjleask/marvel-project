import React, { Component } from "react";

const ToggleCharacter = props => (
  <button className="toggle-btn" onClick={props.onClick}>
    Character
  </button>
);

export default ToggleCharacter;
