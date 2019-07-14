import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UpdateProduct.css";
import userimg from "./userimg.svg";
import logo from "../../logo.svg";
import axios from "axios";

class UpdateProduct extends Component {
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
  componentDidMount() {
    // axios
    //   .get("http://127.0.0.1:5000/api/products/" + this.props.match.params.id)
    //   .then(response => {
    //     this.setState({
    //       product_name: response.data.product_name,
    //       product_description: response.data.product_description,
    //       product_type: response.data.product_type,
    //       product_date: response.data.product_date,
    //       product_price: response.data.product_price
    //     });
    //   });
    this.FetchProductById();
  }

  FetchProductById = () => {
    // let options = { day: "numeric", month: "numeric", year: "numeric" };

    axios
      .get("http://127.0.0.1:5000/api/products/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          product_name: res.data.product_name,
          product_description: res.data.product_description,
          product_type: res.data.product_type,
          purchase_date: new Date(res.data.purchase_date)
            .toISOString()
            .slice(0, 10),
          product_price: res.data.product_price
        });
      })
      .catch(err => console.error(err));
  };

  InputChangeHandler = e => {
    console.log("CHANGE => ", e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
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
      .put(
        "http://127.0.0.1:5000/api/products/" + this.props.match.params.id,
        UpdatedProduct
      )
      .then(res => {
        if (res.statusText === "OK") {
          this.props.history.push("/products");
        }
      })
      .catch(err => console.error(err));
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
                onChange={this.InputChangeHandler}
                placeholder="Product Name"
                required={true}
                name="product_name"
              />
              <br />

              <input
                type="text"
                value={this.state.product_description}
                onChange={this.InputChangeHandler}
                required={true}
                name="product_description"
              />
              <br />
              <input
                type="text"
                value={this.state.product_type}
                onChange={this.InputChangeHandler}
                placeholder="Product Type"
                name="product_type"
              />
              <br />
              <input
                type="date"
                onChange={this.InputChangeHandler}
                value={this.state.purchase_date}
                placeholder="Purschase Date"
                name="purchase_date"
                required={true}
              />
              <br />
              <input
                onChange={this.InputChangeHandler}
                value={this.state.product_price}
                type="number"
                placeholder="Product Price"
                name="product_price"
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
