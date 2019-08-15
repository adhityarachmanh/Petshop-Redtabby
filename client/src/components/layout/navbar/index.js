import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import NavbarLogin from "./NavbarLogin";
import NavbarLogout from "./NavbarLogout";
import { DATA_LEFT_FEATURE } from "../data";
import LOGO from "../../../assets/img/Black_Paw.svg";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Navbar extends Component {
  state = {
    color: "navbar-dark bg-dark",
    status: ""
  };

  componentDidMount() {
    window.addEventListener("scroll", this.gantiWarna);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.gantiWarna);
  }

  gantiWarna = () => {
    if (
      document.documentElement.scrollTop > 80 ||
      document.body.scrollTop > 80
    ) {
      this.setState({
        color: "bg-rose fixed-top"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-dark bg-dark"
      });
    }
  };
  filter = data => {
    return data.toLowerCase().replace(/ /g, "-");
  };
  render() {
    const { auth, category } = this.props;

    const NavbarLinks = auth.uid ? (
      <NavbarLogin auth={auth} />
    ) : (
      <NavbarLogout />
    );
    const { color, status } = this.state;
    return (
      <nav
        style={{ display: status }}
        class={`navbar ${color} navbar-expand-lg mb-auto`}
        id="sectionsNav"
      >
        <div className="container">
          <div className="navbar-translate">
            <Link className="navbar-brand" to="/">
              {color.indexOf("navbar-dark bg-dark") > -1 ? null : (
                <img
                  src={LOGO}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt=""
                />
              )}
              Red Tabby
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon" />
              <span className="navbar-toggler-icon" />
              <span className="navbar-toggler-icon" />
            </button>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              {DATA_LEFT_FEATURE.map((d, i) => {
                return (
                  <li key={i} className="dropdown nav-item">
                    <a
                      style={{ cursor: "pointer" }}
                      className="dropdown-toggle nav-link"
                      data-toggle="dropdown"
                    >
                      <i className="material-icons">{d.icon}</i> {d.nama}
                    </a>
                    <div className="dropdown-menu dropdown-with-icons">
                      {d.dropdown.map((d1, i1) => {
                        return (
                          <NavLink
                            key={i1}
                            activeStyle={{
                              background: "#e91e63",
                              color: "#FFF"
                            }}
                            to={`/${this.filter(d1.nama)}`}
                            className="dropdown-item"
                          >
                            <i className="material-icons">{d1.icon}</i>{" "}
                            {d1.nama}
                          </NavLink>
                        );
                      })}
                    </div>
                  </li>
                );
              })}

              <li className="dropdown nav-item">
                <a
                  style={{ cursor: "pointer" }}
                  className="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                >
                  <i className="material-icons">pets</i> Category
                </a>
                <div className="dropdown-menu dropdown-with-icons">
                  {category &&
                    category.map((d1, i1) => {
                      return (
                        <NavLink
                          key={i1}
                          activeStyle={{
                            background: "#e91e63",
                            color: "#FFF"
                          }}
                          to={`/shop/cat/${this.filter(d1.name)}`}
                          className="dropdown-item"
                        >
                          <i className="material-icons">pets</i> {d1.name}
                        </NavLink>
                      );
                    })}
                </div>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">{NavbarLinks}</ul>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => {
  const category = state.firestore.ordered.category;
  return {
    auth: state.firebase.auth,
    category: category
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "category" }])
)(Navbar);
