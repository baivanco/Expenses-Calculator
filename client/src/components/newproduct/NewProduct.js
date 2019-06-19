import React, { Component } from "react";
import "./NewProduct.module.css";
import axios from "axios";

class NewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_name: "",
      product_description: "",
      product_type: "",
      purchase_date: "",
      product_price: ""
    };
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

    const NewProduct = {
      product_name: this.state.product_name,
      product_description: this.state.product_description,
      product_type: this.state.product_type,
      purchase_date: this.state.purchase_date,
      product_price: this.state.product_price
    };

    axios
      .post("http://127.0.0.1:5000/api/products", NewProduct)
      .then(res => console.log(res.data));

    this.setState({
      product_name: "",
      product_description: "",
      product_type: "",
      purchase_date: "",
      product_price: ""
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="new-product-form">
          <input
            style={{ color: "red" }}
            className="input-product-name"
            type="text"
            value={this.state.product_name}
            onChange={this.onChangeProductName}
            placeholder="Product Name"
            required={true}
          />
          <br />

          <input
            style={{ color: "red" }}
            type="text"
            value={this.state.product_description}
            onChange={this.onChangeProductDescription}
            placeholder="Product Description"
            required={true}
          />
          <input
            style={{ color: "red" }}
            type="text"
            value={this.state.product_type}
            onChange={this.onChangeProductType}
            placeholder="Product Type"
          />
          <input
            style={{ color: "red" }}
            type="date"
            onChange={this.onChangeProductDate}
            placeholder="Purschase Date"
            required={true}
          />
          <input
            style={{ color: "red" }}
            onChange={this.onChangeProductPrice}
            value={this.state.product_price}
            type="number"
            placeholder="Product Price"
            required={true}
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    );
  }
}
export default NewProduct;
