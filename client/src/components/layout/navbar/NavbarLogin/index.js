import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { gasLogout } from "../../../../store/action/authaction";
import Keranjang from "../Keranjang";
import { compose } from "C:/Users/User/AppData/Local/Microsoft/TypeScript/3.5/node_modules/redux";
import { firestoreConnect } from "react-redux-firebase";
import NotificationOrder from "../Notification/Notification";

class NavbarLogin extends React.Component {
  handleLogout = () => {
    this.props.logout();
  };
  render() {
    const { profile, auth } = this.props;

    return (
      <>
        <NotificationOrder />
        <Keranjang />

        <li className="dropdown nav-item">
          <a
            style={{ cursor: "pointer" }}
            className="dropdown-toggle nav-link"
            data-toggle="dropdown"
          >
            <img
              src={profile.photoURL ? profile.photoURL : null}
              width="30"
              height="30"
              className="rounded-circle"
            />
            {profile.name ? profile.name : profile.email}
          </a>
          <div className="dropdown-menu dropdown-with-icons">
            <Link   to="/manage-akun/profile"className="dropdown-item">
              <i className="material-icons">person</i> Profile
            </Link>
            <Link
              to="/manage-akun/history-order"
              style={{ cursor: "pointer" }}
              className="dropdown-item"
            >
              <i className="material-icons">history</i> History Order
            </Link>
            <Link
              to="/manage-akun/my-grooming"
              style={{ cursor: "pointer" }}
              className="dropdown-item"
            >
              <i className="material-icons">pets</i> My Grooming
            </Link>
            <a
              style={{ cursor: "pointer" }}
              className="dropdown-item"
              onClick={this.handleLogout}
            >
              <i className="material-icons">logout</i> Logout
            </a>
          </div>
        </li>
      </>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(gasLogout())
  };
};
const mapStateToProps = state => {
  const auth = state.firebase.auth;

  return {
    profile: state.firebase.profile,
    auth: auth
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "order" }])
)(NavbarLogin);
