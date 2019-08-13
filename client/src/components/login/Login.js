import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import "./Login.css";
import logo from "../../logo.svg";
import About from "../about/About";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      msg: null
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    //Attempt to Login
    this.props.login(user);
    if (this.props.isAuthenticated) {
      this.props.history.push("/products");
    }
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  render() {
    return (
      <div>
        <About />

        <div className="login-container">
          {this.state.msg ? alert(`${this.state.msg}`) : null}
          <div className="logo-login">
            <img src={logo} alt="logo" />
          </div>

          <form onSubmit={this.onSubmit} className="login-input" method="post">
            <input
              name="email"
              type="email"
              placeholder="Email"
              autoFocus={true}
              onChange={this.onChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              minLength="6"
              onChange={this.onChange}
            />
            <button type="submit">Login</button>
          </form>
          <p className="reg-link-to">
            If you don`t have an account<Link to="/register"> Register</Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);
