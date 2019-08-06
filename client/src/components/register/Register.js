import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../logo.svg";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      register_date: "",
      telephone: "",
      country: "",
      password: "",
      msg: null
    };
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error != prevProps.error) {
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChangeUser = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    //Create user object

    const NewUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      birth_date: this.state.birth_date,
      telephone: this.state.telephone,
      country: this.state.country,
      password: this.state.password
    };

    //Attempot to register
    this.props.register(NewUser);
    this.props.history.push("/products");
  };

  render() {
    return (
      <div>
        <div className="register-container">
          {this.state.msg ? alert(`${this.state.msg}`) : null}
          <form
            onSubmit={this.onSubmit}
            className="register-input"
            method="post"
          >
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              required="enabled"
              autoFocus={true}
              onChange={this.onChangeUser}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              required="enabled"
              onChange={this.onChangeUser}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required="enabled"
              onChange={this.onChangeUser}
            />

            <input
              type="date"
              name="birth_date"
              placeholder="Date of Birth"
              required="enabled"
              onChange={this.onChangeUser}
            />

            <input
              type="text"
              name="telephone"
              placeholder="Telephone"
              required="enabled"
              onChange={this.onChangeUser}
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              required="enabled"
              onChange={this.onChangeUser}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required="enabled"
              minLength="6"
              onChange={this.onChangeUser}
            />
            <button type="submit">Register</button>
          </form>
          <div className="logo-r">
            <img src={logo} alt="logo" />
          </div>
          <p className="log-link">
            If you already have an account <Link to="/"> Login</Link>
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
  { register, clearErrors }
)(Register);
