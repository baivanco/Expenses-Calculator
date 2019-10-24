import React, { Component } from "react";
import "./Products.css";
import Logout from "../logout/Logout";
import logo from "../../logo.svg";
import edit from "./edit-icon.svg";
import del from "./del-icon.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { connect } from "react-redux";
import { getProducts, deleteProduct } from "../../actions/productActions";

import userimg from "./userimg.svg";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedProductID: ""
    };
  }

  toggle = productId => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      selectedProductID: productId
    }));
  };

  componentDidMount() {
    this.props.getProducts();
  }

  deleteProduct = id => {
    this.props.deleteProduct(id);
  };

  filterProdName = () => {
    var filterNames = this.props.product.products.sort((a, b) =>
      a.product_name.toString().toLowerCase() >
      b.product_name.toString().toLowerCase()
        ? 1
        : -1
    );
    console.log(filterNames);
    this.setState({ products: filterNames });
    axios
      .get("http://127.0.0.1:5000/api/products/", filterNames)
      .then(res => console.log("OK"));
  };

  filterProdPrice = () => {
    var filterPrice = this.props.product.products.sort((a, b) =>
      a.product_price > b.product_price ? 1 : -1
    );
    this.setState({ products: filterPrice });
    axios
      .get("http://127.0.0.1:5000/api/products/", filterPrice)
      .then(res => console.log(res.data));
  };

  filterProdDate = () => {
    var filterDate = this.props.product.products.sort((a, b) =>
      a.purchase_date < b.purchase_date ? 1 : -1
    );
    this.setState({ products: filterDate });
    axios
      .get("http://127.0.0.1:5000/api/products/", filterDate)
      .then(res => console.log(res.data));
  };

  render() {
    const { products } = this.props.product;
    const { user } = this.props.auth;

    var options = { year: "numeric", month: "short", day: "2-digit" };

    return (
      <div className="container-products-list">
        <Link to="/">
          <Logout />
        </Link>
        <nav className="nav-bar-products">
          <img src={logo} alt="logo-img" style={{ width: "70px" }} />
          <div className="nav-bar-links">
            <span>Products</span>
            <span style={{ margin: 10 }}>|</span>
            <Link to="/expenses">
              <span
                style={{
                  color: " #445570",
                  textDecoration: "underline"
                }}
              >
                Expenses
              </span>
            </Link>

            {products.map(product => (
              <div className="filter" key={product._id}>
                <span className="filter-text">Filter By:</span>
                <UncontrolledDropdown className="dropdown-btn">
                  <DropdownToggle caret>Choose</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => this.filterProdName()}>
                      Name
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.filterProdPrice()}>
                      Price
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.filterProdDate()}>
                      Date
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            ))}
          </div>
          <span className="user-products">
            <img src={userimg} alt="userimg" />{" "}
            <strong>
              {user ? `${user.first_name} ${user.last_name}` : ""}
            </strong>
          </span>
        </nav>
        <Link to="/new_product">
          <button className="new-product-btn">new product</button>
        </Link>
        <table className="products-table">
          <thead>
            <tr className="prod-table-headers">
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Product Description</th>
              <th style={{ textAlign: "right" }}>Purchase Date</th>
              <th style={{ textAlign: "right" }}>Product Price</th>
              <th style={{ textAlign: "center" }}>Options</th>
            </tr>
          </thead>
          <div className="table-line-border" />
          <tbody>
            {products.map(product => (
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
                <td
                  style={{
                    textAlign: "right",
                    fontWeight: "bold"
                  }}
                >
                  {product.product_price} MKD
                </td>
                <td style={{ textAlign: "center" }}>
                  <Link to={"/update_product/" + product._id}>
                    <img
                      src={edit}
                      style={{ width: 25, marginRight: 5 }}
                      className="option-links edit"
                      alt="edit-ico"
                    />
                  </Link>
                  <img
                    onClick={() => this.toggle(product._id)}
                    src={del}
                    style={{ width: 25 }}
                    className="option-links del"
                    alt="options-ico"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader
            style={{ backgroundColor: "#44557090", color: "#fff" }}
            toggle={this.toggle}
          >
            Delete Product
          </ModalHeader>
          <ModalBody style={{ fontSize: 22 }}>
            You are about to delete this product. Are you sure you wish to
            continue ?
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ backgroundColor: "#C1272D" }}
              onClick={() => {
                this.deleteProduct(this.state.selectedProductID);
                this.toggle();
              }}
            >
              Delete
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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
  { getProducts, deleteProduct }
)(Products);
