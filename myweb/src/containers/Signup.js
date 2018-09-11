import React, { Component } from "react";
import DatePicker from "react-datepicker";
// import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css'
import {
  // HelpBlock,
  Button, FormGroup, FormControl, ControlLabel
} from "react-bootstrap";
// import LoaderButton from "../components/LoaderButton";
import "./Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
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

  // validateConfirmationForm() {
  //   return this.state.confirmationCode.length > 0;
  // }

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

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    // try {
    //   fetch('/Signup', { 
    //     method: 'POST',
    //     body: JSON.stringify({
    //       'iduser': 3,
    //       'username': this.state.email,
    //       'password': this.state.password
    //     })
    //   })
    //   .then(function(response) {
    //     return response.json()
    //   }).then(function(body) {
    //     console.log(body);
    //   });
    //   // this.setState({
    //   //   newUser
    //   // });
    // } catch (e) {
    //   alert(e.message);
    // }
    let reqBody = {
      username: this.state.email,
      password: this.state.password,
      birthdate: this.state.startDate
    };
    fetch("http://localhost:3000/Signup", {
      method: 'post',
      headers: {'Content-Type': 'application/JSON'},
      body: JSON.stringify(reqBody)
    })
      .then((res) => {
        console.log(res);
        if (res.ok){
          console.log(res.json());
          return res.json();
        } else {
          console.log('Something went wrong with your fetch');
          throw new Error ('Something went wrong with your fetch');
        }
      }).then((json) => {
        console.log(json);
      })
  
    this.setState({ isLoading: false });
  }

  // handleConfirmationSubmit = async event => {
  //   event.preventDefault();

  //   this.setState({ isLoading: true });
  // }

  // renderConfirmationForm() {
  //   return (
  //     <form onSubmit={this.handleConfirmationSubmit}>
  //       <FormGroup controlId="confirmationCode" bsSize="large">
  //         <ControlLabel>Confirmation Code</ControlLabel>
  //         <FormControl
  //           autoFocus
  //           type="tel"
  //           value={this.state.confirmationCode}
  //           onChange={this.handleChange}
  //         />
  //         <HelpBlock>Please check your email for the code.</HelpBlock>
  //       </FormGroup>
  //       <Button
  //           block
  //           bsSize="large"
  //           disabled={!this.validateForm()}
  //           type="submit"
  //         >
  //           Submit
  //       </Button>
  //       {/* <LoaderButton
  //         block
  //         bsSize="large"
  //         disabled={!this.validateConfirmationForm()}
  //         type="submit"
  //         isLoading={this.state.isLoading}
  //         text="Verify"
  //         loadingText="Verifying…"
  //       /> */}
  //     </form>
  //   );
  // }

  renderForm() {
    return (
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
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
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
            Submit
        </Button>
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