import React, { Component } from "react";

const TestButton = props => (
  <button className="btn-danger" onClick={props.onClick}>
    Test The API
  </button>
);

export default TestButton;
