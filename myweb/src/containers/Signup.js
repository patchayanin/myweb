import React, { Component } from "react";
import DatePicker from "react-datepicker";
// import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css'
import {
  // HelpBlock,
  Button, FormGroup, FormControl, ControlLabel, HelpBlock
} from "react-bootstrap";
// import LoaderButton from "../components/LoaderButton";
import "./Signup.css";
import {Link} from "react-router-dom"

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fail: false,
      email: "",
      password: "",
      confirmPassword: "",
      newUser: null,
      startDate: ""
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleBDChange = date => {
    this.setState({
      startDate: date
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let reqBody = {
      username: this.state.email,
      password: this.state.password,
      birthdate: this.state.startDate
    };
    fetch("http://localhost:3000/Signup",{
      method: 'post',
      headers: {'Content-Type': 'application/JSON'},
      body: JSON.stringify(reqBody)
    })
      .then(response => response.json())
      .then((response) => {
        if(response.msg === 'success'){
            this.props.history.push('/login')
        }      
        else{
          this.setState({ fail: true})
        }
        })
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            placeholder="Please enter your email"
            onChange={this.handleChange}
          />
          {this.state.fail &&
            <span className="help-block">*This Email is already use.</span>
          }
        </FormGroup>
        <FormGroup controlId="birthday" bsSize="large">
          <ControlLabel>Birthday</ControlLabel>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleBDChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            placeholder="Please enter your password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
            placeholder="Please confirm your password"
          />
        </FormGroup>
        <Button
            block
            bsSize="large"
            bsStyle="primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            Submit
        </Button>
        <HelpBlock>Already have an account?</HelpBlock><Link to="/login" bsStyle="default">Login</Link>
        {/* <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        /> */}
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderForm()
          }
      </div>
    );
  }
}