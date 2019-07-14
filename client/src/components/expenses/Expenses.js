import React, { Component } from "react";
import "./Expenses.css";
import { Link } from "react-router-dom";

import logo from "../../logo.svg";

import axios from "axios";

import userimg from "./userimg.svg";

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedFilterId: null,
      yearViewId: null,
      filterByYear: []
    };
  }

  setSelectedFilter = id => {
    this.setState({ selectedFilterId: id });
  };

  yearView = id => {
    this.setState({ yearViewId: id });
  };

  componentDidMount() {
    axios("http://127.0.0.1:5000/api/products")
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(err => console.log(err));
  }

  filterByYear = e => {
    const filteredByYear = [...this.state.products].filter(
      year => year.purchase_date
    );

    console.log(filteredByYear);
  };

  render() {
    var total = 0;
    for (let i in this.state.products) {
      var price = this.state.products[i].product_price;
      total += price;
      console.log(total);
    }

    var selectedStyle;
    this.state.selectedFilterId === 1
      ? (selectedStyle = { background: "#c1272d", outline: "none" })
      : (selectedStyle = {});

    var selectedStyle2;
    this.state.selectedFilterId === 2
      ? (selectedStyle2 = { background: "#c1272d", outline: "none" })
      : (selectedStyle2 = {});

    var hidden;
    this.state.yearViewId === 2
      ? (hidden = { display: "none" })
      : (hidden = { display: "inline-block" });

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
          <button
            style={selectedStyle}
            onClick={() => {
              this.setSelectedFilter(1);
              this.yearView(1);
            }}
          >
            Monthly
          </button>
          <button
            style={selectedStyle2}
            onClick={() => {
              this.setSelectedFilter(2);
              this.yearView(2);
            }}
          >
            Yearly
          </button>

          <label>Choose Year</label>

          <select>
            <option onClick={this.filterByYear} value="2016">
              2016
            </option>
            <option onClick={this.filterByYear} value="2017">
              2017
            </option>
            <option onClick={this.filterByYear} value="2018">
              2018
            </option>
            <option onClick={this.filterByYear} value="2019">
              2019
            </option>
          </select>

          <div style={hidden}>
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
        </div>

        <table className="expenses-table">
          <thead>
            <tr className="prod-table-headers">
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Product Description</th>
              <th style={{ textAlign: "right" }}>Purchase Date</th>
              <th style={{ textAlign: "right" }}>Product Price</th>
            </tr>
          </thead>
          <div className="table-line-border" />
          <tbody>
            {this.state.products.map(product => (
              <tr key={product._id}>
                <td
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  {product.product_name}
                </td>
                <td>{product.product_type}</td>
                <td>{product.product_description}</td>
                <td style={{ textAlign: "right" }}>
                  {new Date(product.purchase_date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "right", fontWeight: "bold" }}>
                  {product.product_price} MKD
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Expenses;
