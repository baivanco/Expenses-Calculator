import React, { Component } from "react";
import "./Expenses.css";
import { Link } from "react-router-dom";
import Products from "../products/Products";
import logo from "../../logo.svg";
import edit from "./edit-icon.svg";
import del from "./del-icon.svg";
import axios from "axios";
import Product from "../product/Product";
import userimg from "./userimg.svg";

class Expenses extends Component {
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
    var total = 0;
    for (let i in this.state.products) {
      var price = this.state.products[i].product_price;
      total += price;
      console.log(total);
    }

    return (
      <div className="container-products-list">
        <nav className="nav-bar-products">
          <img src={logo} alt="logo-img" style={{ width: "70px" }} />
          <div className="nav-bar-links">
            <Link style={{ color: " #445570" }} to="/products">
              <span style={{ textDecoration: "underline" }}>Products</span>
            </Link>
            <span style={{ margin: 10 }}>|</span>
            <span>Expenses</span>
          </div>
          <span className="user-products">
            <img src={userimg} alt="userimg" /> Pero Perovski
          </span>
        </nav>
        <span className="total-view">total spent : {total} MKD</span>

        <div className="exp-filters">
          <button>Monthly</button>

          <button>Yearly</button>

          <label>Choose Year</label>
          <select>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
          </select>

          <label>Choose Month</label>
          <select>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="arpil">Arpil</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="octomber">Octomber</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </select>
        </div>

        <table className="expenses-table">
          <thead>
            <tr className="prod-table-headers">
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Product Description</th>
              <th>Purchase Date</th>
              <th>Product Price</th>
            </tr>
          </thead>
          <div className="table-line-border" />
          <tbody>
            {this.state.products.map(product => (
              <tr key={product._id}>
                <td>{product.product_name}</td>
                <td>{product.product_type}</td>
                <td>{product.product_description}</td>
                <td>{new Date(product.purchase_date).toLocaleDateString()}</td>
                <td>{product.product_price} MKD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Expenses;
