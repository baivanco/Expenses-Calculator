import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import "./Logout.css";

export class Logout extends Component {
  render() {
    return (
      <div className="logout-container">
        <button className="logout" onClick={this.props.logout}>
          Logout
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
