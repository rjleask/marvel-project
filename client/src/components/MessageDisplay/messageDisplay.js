import React, { Component } from "react";

const MessageDisplay = props => (
  <div className="display-message">
    <h2>{props.message}</h2>
  </div>
);

export default MessageDisplay;
