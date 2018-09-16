import React, { Component, Fragment } from "react";
import Routes from "./Routes";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Container, Row, Footer } from 'mdbreact';
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
          <Footer className = "footer">
                <Container fluid className="text-center text-md-left">
                    <Row>
                    <Col sm="6">
                        <h5 className="title">Footer Content</h5>
                        <p>Here you can use rows and columns here to organize your footer content.</p>
                    </Col>
                    <Col sm="6">
                        <h5 className="title">Links</h5>
                        <ul>
                        <li className="list-unstyled"><a href="#!">Link 1</a></li>
                        <li className="list-unstyled"><a href="#!">Link 2</a></li>
                        </ul>
                    </Col>
                    </Row>
                </Container>
                <div className="footer-copyright text-center py-3">
                    <Container fluid>
                        &copy; {(new Date().getFullYear())} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
                    </Container>
                </div>
            </Footer>
      <Routes  childProps={childProps}/>   
      </div>
    );
  }
}

export default withRouter(App);