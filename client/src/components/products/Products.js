import React, { Component } from "react";
import "./Products.css";
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

import userimg from "./userimg.svg";
import NewProduct from "../newproduct/NewProduct";
import Expenses from "../expenses/Expenses";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], modal: false };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  componentDidMount() {
    axios("http://127.0.0.1:5000/api/products")
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(err => console.log(err));
  }

  deleteProduct = id => {
    const delProd = this.state.products.filter(product => product._id !== id);
    this.setState({
      products: delProd
    });

    axios
      .delete("http://127.0.0.1:5000/api/products/" + id, delProd)
      .then(res => console.log(res.data));
  };

  filterProdName = () => {
    var filterNames = [...this.state.products].sort((a, b) =>
      a.product_name.toLowerCase() > b.product_name.toLowerCase() ? 1 : -1
    );
    this.setState({ products: filterNames });
    axios
      .get("http://127.0.0.1:5000/api/products/", filterNames)
      .then(res => console.log(res.data));
  };
  filterProdPrice = () => {
    var filterNames = [...this.state.products].sort((a, b) =>
      a.product_price > b.product_price ? 1 : -1
    );
    this.setState({ products: filterNames });
    axios
      .get("http://127.0.0.1:5000/api/products/", filterNames)
      .then(res => console.log(res.data));
  };

  render() {
    return (
      <div className="container-products-list">
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
            {this.state.products.map(product => (
              <div className="filter" key={product._id}>
                Filter By:
                <UncontrolledDropdown>
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
                    <DropdownItem>Date</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            ))}
          </div>
          <span className="user-products">
            <img src={userimg} alt="userimg" /> Pero Perovski
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
              <th>Purchase Date</th>
              <th>Product Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <div className="table-line-border" />
          <tbody>
            {this.state.products.map(product => (
              <tr key={product._id}>
                <td>{product.product_name}</td>
                <td>{product.product_type}</td>
                <td>{product.product_description}</td>
                <td>{product.purchase_date}</td>
                <td>{product.product_price}</td>
                <td>
                  <Link to={"/update_product/" + product._id}>
                    <img
                      src={edit}
                      style={{ width: 25, marginRight: 5 }}
                      className="option-links edit"
                    />
                  </Link>
                  <img
                    onClick={this.toggle}
                    src={del}
                    style={{ width: 25 }}
                    className="option-links del"
                  />
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
                      You are about to delete this product. Are you sure you
                      wish to continue ?
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        style={{ backgroundColor: "#C1272D" }}
                        onClick={() => {
                          this.deleteProduct(product._id);
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
