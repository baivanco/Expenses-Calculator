import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UpdateProduct.css";
import userimg from "./userimg.svg";
import logo from "../../logo.svg";
import axios from "axios";

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/api/products" + this.props.match.params.id)
      .then(response => {
        this.setState({
          product_name: response.data.product_name,
          product_description: response.data.product_description,
          product_type: response.data.product_type,
          product_date: response.data.product_date,
          product_price: response.data.product_price
        });
      });
  }
  onChangeProductName = e => {
    this.setState({ product_name: e.target.value });
  };

  onChangeProductDescription = e => {
    this.setState({ product_description: e.target.value });
  };
  onChangeProductType = e => {
    this.setState({ product_type: e.target.value });
  };
  onChangePurchaseDate = e => {
    this.setState({ purchase_date: e.target.value });
  };
  onChangeProductPrice = e => {
    this.setState({ product_price: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const UpdatedProduct = {
      product_name: this.state.product_name,
      product_description: this.state.product_description,
      product_type: this.state.product_type,
      purchase_date: this.state.purchase_date,
      product_price: this.state.product_price
    };

    axios
      .post(
        "http://127.0.0.1:5000/api/products" + this.props.match.params.id,
        UpdatedProduct
      )
      .then(res => console.log(res.data));
  };

  render() {
    return (
      <div>
        <div>
          <div className="header-update-product">
            <nav className="nav-update-product">
              <Link to="/products">
                <span>Products</span>
              </Link>
              <Link to="/expenses">
                <span>Expenses</span>
              </Link>
              <span className="user-update-product">
                <img src={userimg} alt="userimg" /> Pero Perovski
              </span>
            </nav>
            <h2>Edit Product</h2>
          </div>
          <div className="update-product-container">
            <form
              onSubmit={this.onSubmit}
              className="product-input"
              method="post"
            >
              <input
                className="input-product-name"
                type="text"
                value={this.state.product_name}
                onChange={this.onChangeProductName}
                placeholder="Product Name"
                required={true}
              />
              <br />

              <input
                type="text"
                value={this.state.product_description}
                onChange={this.onChangeProductDescription}
                required={true}
              />
              <br />
              <input
                type="text"
                value={this.state.product_type}
                onChange={this.onChangeProductType}
                placeholder="Product Type"
              />
              <br />
              <input
                type="date"
                onChange={this.onChangeProductDate}
                placeholder="Purschase Date"
                required={true}
              />
              <br />
              <input
                onChange={this.onChangeProductPrice}
                value={this.state.product_price}
                type="number"
                placeholder="Product Price"
                required={true}
              />
              <br />
              <button type="submit">Update</button>
            </form>
            <div className="logo-u">
              <img src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UpdateProduct;
