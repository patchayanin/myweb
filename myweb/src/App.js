import React, { Component, Fragment } from "react";
import Routes from "./Routes";
import { Link,withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Button} from "react-bootstrap";
import { FormInline} from 'mdbreact';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      input:"",
      search: ""
    };
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
    console.log(this.state.isAuthenticated)
  }

  // isAuthenticate(){
  //   return this.state.isAuthenticated
  // }

  handleLogout = event => {
    this.userHasAuthenticated(false);
    this.props.history.push("/");
  }

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
    console.log(this.state.input)
  }

  handleSearch = event => {
    // this.setState({
    //   search: this.state.input
    // });
    // console.log(this.state.search)
    this.props.history.push("/product/search");
  }
  
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      isSearching : this.state.input
    };
    return (
      <div className="App container">
        <Navbar bsStyle="inverse" fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/product">Product</Link> 
              {/* {this.state.isAuthenticated
                ? <Link to="/product">Product</Link> */}
                {/* : <Link to="/login">Product</Link> */}
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullRight>
            {this.state.isAuthenticated
              ? <Fragment>
                  <LinkContainer to="/search">
                    <NavItem>Search</NavItem>
                  </LinkContainer>
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
                </Fragment>
              // <NavItem onClick={this.handleLogout}>Logout</NavItem>
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
          {/* <Footer className = "footer">
                <Container fluid className="text-center text-md-left">
                    <Row>
                    <Col sm="6">
                        <h5 className="title">Final Sale</h5>
                        {/* <p>find your specific cloth right there</p> */}
                        {/* <p>line:final Sale</p>
                        <p>Facebook:final sale</p> */}
                    {/* </Col>
                    <Col sm="6">
                        <h5 className="title">Links</h5>
                        <ul>
                        <li className="list-unstyled"><a href="#!">Link 1</a></li>
                        {/* <li className="list-unstyled"><a href="#!">Link 2</a></li> */}
                        {/* </ul>
                    </Col>
                    </Row>
                </Container4> */}
            {/* </Footer> */} 
      <Routes  childProps={childProps}/>   
      </div>
    );
  }
}

export default withRouter(App);