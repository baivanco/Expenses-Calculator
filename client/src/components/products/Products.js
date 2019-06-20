import React, { Component } from "react";
import "./Products.css";
import logo from "../../logo.svg";
import edit from "./edit-icon.svg";
import del from "./del-icon.svg";
import axios from "axios";
import Product from "../product/Product";
import userimg from "./userimg.svg";

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
      <div className="container-products-list">
        <nav className="nav-bar-products">
          <img src={logo} alt="logo-img" style={{ width: "70px" }} />
          <div className="nav-bar-links">
            <span>Products</span>
            <span style={{ margin: 10 }}>|</span>
            <span href="#">Expenses</span>
          </div>
          <span className="user-products">
            <img src={userimg} alt="userimg" /> Pero Perovski
          </span>
        </nav>
        <button className="new-product-btn">new product</button>

        <table className="products-table">
          <thead>
            <tr className="prod-table-headers">
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Product Description</th>
              <th>Purchase Date</th>
              <th>Product Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <div className="table-line-border" />
          <tbody>
            {this.state.products.map(product => (
              <tr>
                <td>{product.product_name}</td>
                <td>{product.product_type}</td>
                <td>{product.product_description}</td>
                <td>{product.purchase_date}</td>
                <td>{product.product_price}</td>
                <td>
                  <img
                    src={edit}
                    style={{ width: 30, marginRight: 5 }}
                    className="option-links"
                  />
                  <img
                    src={del}
                    style={{ width: 30 }}
                    className="option-links"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Products;
