import React, { Component } from "react";
import "./Register.css";
import logo from "../../logo.svg";

class Register extends Component {
  render() {
    return (
      <div>
        <div className="register-container">
          <form
            onSubmit={this.onSubmit}
            className="register-input"
            method="post"
          >
            <input
              type="text"
              placeholder="First Name"
              required="enabled"
              autoFocus={true}
            />
            <input type="text" placeholder="Last Name" required="enabled" />

            <input type="email" placeholder="Email" required="enabled" />

            <input type="date" placeholder="Date of Birth" required="enabled" />

            <input type="text" placeholder="Telephone" required="enabled" />

            <input type="text" placeholder="Country" required="enabled" />

            <input
              type="password"
              placeholder="Password"
              required="enabled"
              minLength="6"
            />
            <button type="submit">Register</button>
          </form>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
