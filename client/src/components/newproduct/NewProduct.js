import React, { Component } from "react";
import "./NewProduct.css";
import userimg from "./userimg.svg";
import logo from "../../logo.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addProduct } from "../../actions/productActions";

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

  onChangeAdd = e => {
    this.setState({ [e.target.name]: e.target.value });

    //   this.setState({ product_name: e.target.value });
    // };
    // onChangeProductDescription = e => {
    //   this.setState({ product_description: e.target.value });
    // };
    // onChangeProductType = e => {
    //   this.setState({ product_type: e.target.value });
    // };
    // onChangePurchaseDate = e => {
    //   console.log(e);
    //   this.setState({ purchase_date: e.target.value });
    // };
    // onChangeProductPrice = e => {
    //   this.setState({ product_price: e.target.value });
    // };
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

    //   axios.post("http://127.0.0.1:5000/api/products", NewProduct).then(res => {
    //     if (res.statusText === "OK") {
    //       console.log("NEW PRODUCT", NewProduct);
    //       this.setState({
    //         product_name: "",
    //         product_description: "",
    //         product_type: "",
    //         purchase_date: "",
    //         product_price: ""
    //       });
    //       this.props.history.push("/products");
    //     }
    //   });
    // };
    this.props.addProduct(NewProduct);
    this.props.history.push("/products");
  };

  render() {
    const { products } = this.props.product;
    const { user } = this.props.auth;
    return (
      <div>
        <div className="header-add-product">
          <nav className="nav-add-product">
            <Link to="/products">
              <span>Products</span>
            </Link>
            <Link to="/expenses">
              <span>Expenses</span>
            </Link>

            <span className="user-add-product">
              <img src={userimg} alt="userimg" />{" "}
              {user ? `${user.first_name} ${user.last_name}` : ""}
            </span>
          </nav>
          <h2>Add New Product</h2>
        </div>
        <div className="new-product-container">
          <form
            onSubmit={this.onSubmit}
            className="product-input-new"
            method="post"
          >
            <input
              autoFocus={true}
              className="input-product-name"
              type="text"
              value={products.product_name}
              name="product_name"
              onChange={this.onChangeAdd}
              placeholder="Product Name"
              required={true}
            />
            <br />

            <input
              type="text"
              value={products.product_description}
              name="product_description"
              onChange={this.onChangeAdd}
              placeholder="Product Description"
              required={true}
            />
            <br />
            <input
              type="text"
              value={products.product_type}
              name="product_type"
              onChange={this.onChangeAdd}
              placeholder="Product Type"
              required={true}
            />
            <br />
            <input
              type="date"
              onChange={this.onChangeAdd}
              placeholder="Purschase Date"
              required={true}
              value={products.purchase_date}
              name="purchase_date"
            />
            <br />
            <input
              onChange={this.onChangeAdd}
              value={products.product_price}
              name="product_price"
              type="number"
              placeholder="Product Price"
              required={true}
            />
            <br />

            <button type="submit">Add Product</button>
          </form>
          <div className="logo-n">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addProduct }
)(NewProduct);
