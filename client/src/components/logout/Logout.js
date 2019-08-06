import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import "./Logout.css";

export class Logout extends Component {
  render() {
    return (
      <div clasName="logout-container">
        <a className="logout" onClick={this.props.logout} href="#">
          Logout
        </a>
      </div>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
