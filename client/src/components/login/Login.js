import React, { Component } from "react";
import "./Login.css";
import logo from "../../logo.svg";
import About from "../about/About";

class Login extends Component {
  onSubmit = e => e.preventDefault();

  render() {
    return (
      <div>
        <About />
        <div className="login-container">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>

          <form onSubmit={this.onSubmit} className="login-input" method="post">
            <input type="email" placeholder="Email" autoFocus={true} />
            <input
              type="password"
              placeholder="Password"
              required="enabled"
              minLength="6"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
