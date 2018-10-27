import React, { Component } from "react";
import { Button} from "react-bootstrap";
import "./Search.css";

export default class Search extends Component {
  handleSubmit = event =>{
    console.log(this.props.isAuthenticated)
  }
  render() {
    return (
      <div className="Search">
          <div className="lander">
          <h1>Final Sale</h1>
          <p>This is Search page!!! you can edit Table in this page</p>
          <Button
                  block
                  bsSize="large"
                  bsStyle="info"
                  onClick = {this.handleSubmit}
                  type="submit"
                >
                  submit
            </Button>
        </div>
      </div>
    );
  }
}