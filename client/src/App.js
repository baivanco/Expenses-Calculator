import React, { Component } from "react";
import Login from "./components/login/Login";
import "./App.css";
import Register from "./components/register/Register";
import Products from "./components/products/Products";
import { Route, Switch } from "react-router-dom";
import NewProduct from "./components/newproduct/NewProduct";
import UpdateProduct from "./components/updateProduct/UpdateProduct";
import Expenses from "./components/expenses/Expenses";
import NoMatch from "./components/noMatch/NoMatch";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/products" component={Products} />
            <Route path="/expenses" component={Expenses} />
            <Route path="/new_product" component={NewProduct} />
            <Route path="/update_product/:id" component={UpdateProduct} />
            <Route component={NoMatch} />
          </Switch>
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

              {/* <Products /> */}
              {/* <NewProduct /> */}
              {/* <UpdateProduct /> */}
              {/* <Expenses /> */}
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
