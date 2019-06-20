import React, { Component } from "react";
import "./Expenses.css";
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
        <span className="total-view">total spent : 2500 $</span>

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
                    alt="edit-icon"
                  />
                  <img
                    src={del}
                    style={{ width: 30 }}
                    className="option-links"
                    alt="delete-icon"
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
export default Expenses;
