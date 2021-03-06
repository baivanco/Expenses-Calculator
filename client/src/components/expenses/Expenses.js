import React, { Component } from "react";
import "./Expenses.css";
import Logout from "../logout/Logout";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
// import axios from "axios";
import userimg from "./userimg.svg";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedFilterId: null,
      yearViewId: null,
      fy: "2019",
      fm: "11"
    };
  }

  setSelectedFilter = id => {
    this.setState({ selectedFilterId: id });
  };

  yearView = id => {
    this.setState({ yearViewId: id, fm: "all" });
  };

  componentDidMount() {
    this.props.getProducts();
  }

  filterByYear = e => {
    this.setState({ fy: e.target.value });
  };

  filterByMonth = e => {
    this.setState({ fm: e.target.value });
  };

  render() {
    console.log(this.state);
    const { products } = this.props.product;
    const { user } = this.props.auth;
    var options = { year: "numeric", month: "short", day: "2-digit" };
    var total = 0;
    for (let i in products) {
      var price = products[i].product_price;
      total += price;
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
        <Link to="/">
          <Logout />
        </Link>
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
            <img src={userimg} alt="userimg" />{" "}
            <strong>
              {user ? ` ${user.first_name} ${user.last_name}` : ""}
            </strong>
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
          <select onChange={this.filterByYear}>
            <option value="all">All</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
          </select>

          <div style={hidden}>
            <label>Choose Month</label>
            <select onChange={this.filterByMonth}>
              <option value="all">All</option>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">Octomber</option>
              <option value="10">November</option>
              <option value="11">December</option>
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
            {products
              .filter(p => {
                var d = new Date(p.purchase_date);
                var m = new Date(p.purchase_date);
                return (
                  d.getFullYear() == this.state.fy,
                  m.getMonth() == this.state.fm
                );
              })
              .map(product => (
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
                    {new Date(product.purchase_date).toLocaleDateString(
                      "en-GB",
                      options
                    )}
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

const mapStateToProps = state => ({
  product: state.product,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProducts }
)(Expenses);
