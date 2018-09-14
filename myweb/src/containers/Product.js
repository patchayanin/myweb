import React, { Component } from "react";
import "./Product.css";

export default class Product extends Component {
  render() {
    return (
      <div className="Product">
        <div className="lander">
          <h1>Our Product</h1>
          <p>detail of our product</p>
        </div>
      </div>
    );
  }
}