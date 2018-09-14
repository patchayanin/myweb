import React, { Component, Fragment } from "react";
import Routes from "./Routes";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false
    };
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }
  
  // handlehomepage = event => {
  //   { this.state.isAuthenticated
  //     ?  this.props.history.push("/")
  //     :  this.props.history.push("/login");
  //   }
  // }
  
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div className="App container">
        <Navbar bsStyle="inverse" fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              {this.state.isAuthenticated
                ? <Link to="/product">Product</Link>
                : <Link to="/login">Product</Link>
              }
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullRight>
            {this.state.isAuthenticated
              ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
              : <Fragment>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
                </Fragment>
              }
          </Nav>
        </Navbar.Collapse>
        </Navbar>
        <Routes  childProps={childProps}/>
      </div>
    );
  }
}

export default withRouter(App);