import React, { Component } from "react";
import { Grid,Row,Thumbnail,Button,Col } from "react-bootstrap";
import { Container} from 'mdbreact';
import "./Product.css";

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
    {this.createTable()}
  }

  loadDatafromdb(){
    let reqBody = {
      search: ""
    };

    return fetch("http://localhost:3001/Product", {
      method: 'post',
      headers: {'Content-Type': 'application/JSON'},
      body: JSON.stringify(reqBody)
    })
    .then(response => response.json())
    .then((response) => {
      return response
    })
  };

  createTable = () => {
    this.loadDatafromdb()
    .then((response) => {
      console.log(this.props.isSearching)
      console.log(JSON.stringify(response))
      var album = JSON.parse(JSON.stringify(response))
      var length = Object.keys(album).length;
      // console.log(length)
      // console.log(parseInt(length, 10))
      // console.log(album[0].albumname)
      
      let table = []
      // Outer loop to create parent
      for (let i = 0; i < 1; i++) {
        let children = []
        //Inner loop to create children
        for (let j = 0; j < parseInt(length, 10); j++) {
          children.push( 
            <Col xs={6} md={4}>
              <Thumbnail src={album[j].image} alt="242x200">
                <h3>{album[j].albumname}</h3>
                <p>{album[j].albumartist}</p>
                {/* <p>{album[j].year}</p> */}
                <p className="pricealbum">
                  {album[j].price}Baht &nbsp; &nbsp;<Button bsStyle="primary">Detail</Button>
                </p>
              </Thumbnail>
            </Col>
            )
        }
        //Create the parent and add the children
        table.push(<Row>{children}</Row>)
      }
      this.setState({ content: table })
    })
  }

  render() {
    return (        
        <Container>
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold my-5">Our best products</h2>
          <p className="grey-text w-responsive mx-auto mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit est laborum.</p>
          <Grid>
              {this.state.content}
          </Grid>
        </section>
      </Container>
    );
  }
}