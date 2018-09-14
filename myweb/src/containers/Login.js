import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel,Modal } from "react-bootstrap";
import "./Login.css";
import { Link } from "react-router-dom"

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fail: false,
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
    .then(response => response.json())
    .then((response) => {
      if(response.msg === 'success'){
        try{
          this.props.userHasAuthenticated(true);
          this.props.history.push('/')
        }catch(e){
          console.log(e)
        }
      }      
      else{
        this.setState({ fail: true })
      }
    })
  }

  render() {
    return (
      <div className="Login">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img src="../fpo_avatar.png" class="img-responsive" alt="profile"/>
           <form onSubmit={this.handleSubmit} class="form-responsive">  
              <FormGroup controlId="email" bsSize="large" >
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
                {this.state.fail &&
                <span className="help-block">*Email or Password isn't exist.</span>
                }
              </FormGroup>
              </form>
          </Modal.Body>

          <Modal.Footer>
            <Button
                  block
                  bsSize="large"
                  bsStyle="info"
                  disabled={!this.validateForm()}
                  onClick = {this.handleSubmit}
                  type="submit"
                >
                  Login
            </Button>
            <Link to="/signup" bsstyle="default">Don't have an account?</Link>
          </Modal.Footer>
          </Modal.Dialog>
        </div>
    );
  }
}