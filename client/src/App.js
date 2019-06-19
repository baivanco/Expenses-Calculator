import React, { Component } from "react";
import Login from "./components/login/Login";
import "./App.css";
import Register from "./components/register/Register";
import Products from "./components/products/Products";
import { Route, Switch, Link } from "react-router-dom";
import NewProduct from "./components/newproduct/NewProduct";
import UpdateProduct from './components/updateProduct/UpdateProduct'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <div className="showcase">
            {/* <Login /> */}
            {/* <span className="reg-link">
              *If you don`t have account please Register
            </span> */}
            {/* </div> */}
            {/* 
          <span className="copyright">
            © 2019 All rights reserved. Designed by Ivan Tasevski
          </span> */}
            <p style={{ color: 'red' }}>teest</p>
            <Products />
            {/* <NewProduct /> */}
            {/* <UpdateProduct /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
