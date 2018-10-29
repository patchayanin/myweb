import React, { Component } from "react";
import "./Search.css";

  class ProductRow extends React.Component {
    render() {
      const product = this.props.product;
      
      return (
        <tr>
          <td>{product.albumName}</td>
          <td>{product.albumArtist}</td>
          <td>{product.price}</td>
          <td>{product.year}</td>
        </tr>
      );
    }
  }
  
  class ProductTable extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        PRODUCTS: []
      };
      {this.loadDatafromdb()}
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
          console.log(JSON.stringify(response))
          var album = JSON.parse(JSON.stringify(response))
          var length = Object.keys(album).length;
          // console.log(length)
          // console.log(parseInt(length, 10))
          // console.log(album[0].albumname)  
          const tmpPRODUCTS = [];
          for(let i=0;i<length;i++){
              tmpPRODUCTS.push({
                albumName:album[i].albumname, 
                albumArtist: album[i].albumartist,
                price:album[i].price,
                year:album[i].year
              })
          };
          this.setState({PRODUCTS:tmpPRODUCTS})
      })
    };

    

    render() {
      const rows = []; 
      this.state.PRODUCTS.forEach((product) => {
        rows.push(
          <ProductRow
            product={product}
            key={product.albumName}
          />
        );
      });

      return (
        <div>
        <table>
          <thead>
            <tr>
              <th>albumName</th>
              <th>albumArtist</th>
              <th>Price</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        </div>
      );
    }
  }
  
  export default ProductTable;