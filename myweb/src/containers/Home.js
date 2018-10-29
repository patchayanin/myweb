import React, { Component } from "react";
import { Button} from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  handleSubmit = event =>{
    console.log(this.props.isAuthenticated)
  }
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Final Sale</h1>
          <p>place where you can find the most beautiful cloth sale</p>
        </div>
      </div>
    );
  }
}