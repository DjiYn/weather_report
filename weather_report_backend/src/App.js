import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: "", locationID: "" };
  }

  render() {
    return (
      <div className="App" >
        <Router>
          <Navbar></Navbar>
          <Main></Main>
        </Router>
      </div>
    )
  }
}

export default App;
