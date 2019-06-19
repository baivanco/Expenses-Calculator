import React, { Component } from "react";
import "./Products.css";
import logo from "../../logo.svg";
import axios from "axios";
import Product from "../product/Product";



class Products extends Component {
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
        <nav className="nav-bar">
          <a href="#">Products</a> <a href="#">Expenses</a>
        </nav>
        <table className="products-table">
          <thead>
            <tr className="table-headers">
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Product Description</th>
              <th>Purchase Date</th>
              <th>Product Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.products.map(product => (
                <tr>
                  <td>{product.product_name}</td>
                  <td>{product.product_type}</td>
                  <td>{product.product_description}</td>
                  <td>{product.purchase_date}</td>
                  <td>{product.product_price}</td>
                  <td><a href="#" className='option-links'>Edit</a><a href="#" className='option-links'>Delete</a></td>
                </tr>
              ))
            }


          </tbody>
        </table>
      </div>
    );
  }
}
export default Products;
