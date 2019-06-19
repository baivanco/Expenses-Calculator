import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";

import Product from "../product/Product";

import "./Products.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    axios("http://127.0.0.1:5000/api/products")
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Product Description</th>
              <th>Purchase Date</th>
              <th>Product Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    );
  }
}
export default Products;
