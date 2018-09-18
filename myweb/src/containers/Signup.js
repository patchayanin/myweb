import React, { Component } from "react";
import DatePicker from "react-datepicker";
// import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css'
import {
  // HelpBlock,
  Button, FormGroup, FormControl, ControlLabel,Modal
} from "react-bootstrap";
// import LoaderButton from "../components/LoaderButton";
import "./Signup.css";
import {Link} from "react-router-dom"

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      fail: false,
      email: "",
      password: "",
      confirmPassword: "",
      show : true,
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

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let reqBody = {
      username: this.state.email,
      password: this.state.password,
      birthdate: this.state.startDate
    };
    fetch("http://localhost:3001/Signup",{
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
      <Modal show={this.state.show} onHide={this.handleClose}>
       <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
          </form>
        </Modal.Body>
          
        <Modal.Footer>    
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            Submit
          </Button>
          Already have an account? <Link to="/login" bsstyle="default">Login</Link>
            {/* <Button>Close</Button>
            <Button bsStyle="primary">Save changes</Button> */}
        </Modal.Footer>
       </Modal.Dialog>
      </Modal>
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