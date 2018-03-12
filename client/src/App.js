import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
    </div>
  </Router>
);

export default App;
