import React, { Component } from "react";
// import { Clearfix,MenuItem } from "react-bootstrap";
import { Grid,Row,Thumbnail,Button,Col } from "react-bootstrap";
import { Container} from 'mdbreact';
import "./Product.css";

export default class Product extends Component {
  createTable = () => {
    let table = []
  
    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 3; j++) {
        children.push( 
          <Col xs={6} md={4}>
            <Thumbnail src="/thumbnaildiv.png" alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle="primary">Button</Button>
              </p>
            </Thumbnail>
          </Col>
          )
      }
      //Create the parent and add the children
      table.push(<Row>{children}</Row>)
    }
    return table
  }

  render() {
    return (        
        <Container>
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold my-5">Our best projects</h2>
          <p className="grey-text w-responsive mx-auto mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit est laborum.</p>
          <Grid>
              {this.createTable()}
          </Grid>;
        </section>
      </Container>
    );
  }
}