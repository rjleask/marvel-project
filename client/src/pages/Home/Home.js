import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import TestButton from "../../components/TestButton";
import API from "../../utils/API.js";
const axios = require("axios");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: []
    };
  }
  loadAllCharacters = () => {
    API.getAllCharacters()
      .then(res =>
        this.setState({
          characters: res
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <TestButton onClick={this.loadAllCharacters} />
        {this.state.characters.length > 10 ? (
          <div>
            {this.state.characters.map(character => (
              <div>{character.name}</div>
            ))}
          </div>
        ) : (
          <h5>No characters</h5>
        )}
      </div>
    );
  }
}
export default Home;
