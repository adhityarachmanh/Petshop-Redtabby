import React from "react";
import { Link } from "react-router-dom";

class NavbarLogout extends React.Component {
  render() {
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/login-page">
            Signin
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register-page">
            Signup
          </Link>
        </li>
      </>
    );
  }
}
export default NavbarLogout;
