import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    let reqBody = {
      username: this.state.email,
      password: this.state.password
    };
    fetch("http://localhost:3000/Login", {
      method: 'post',
      headers: {'Content-Type': 'application/JSON'},
      body: JSON.stringify(reqBody)
    })
      .then((res) => {
        console.log(res);
        if (res.ok){
          console.log(res.json());
          // {res.json() === null
          //   ? alert("Log in success!")
          //   : alert("Wrong Username or Password")
          // }
        } 
        else {
          console.log('Something went wrong with your fetch');
          throw new Error ('Something went wrong with your fetch');
        }
      }).then((json) => {
        console.log(json);
      })
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            onClick = {this.handleSubmit}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}