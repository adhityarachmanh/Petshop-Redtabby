import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import routes from "routes.js";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/White_Paw.png";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import { compose } from "redux";
import { connect } from "react-redux";
import { AddAlert } from "@material-ui/icons";
import { firestoreConnect } from "react-redux-firebase";
import { LOGOUT_ADMIN } from "store/Actions/authAction";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

class Dashboard extends React.Component {
  state = {
    image: image,
    color: "blue",
    hasImage: true,
    fixedClasses: "dropdown show",
    mobileOpen: false
  };
  mainPanel = React.createRef();
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return window.location.pathname !== "/admin/maps";
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1 && this.props.auth.uid) {
      ps = new PerfectScrollbar(this.mainPanel.current);
    }
    window.addEventListener("resize", this.resizeFunction);
    if (parseInt(localStorage.getItem("kesalahan")) === 0) {
      this.props.LOGOUT_ADMIN();
    }
  }
  componentDidUpdate(e) {
    if (
      e.history.location.pathname !== e.location.pathname &&
      this.props.auth.uid
    ) {
      this.mainPanel.current.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1 && this.props.auth.uid) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const { classes, alert, admin, auth, ...rest } = this.props;
    const notif =
      alert && alert.status ? (
        <Snackbar
          message={alert.text}
          place="tr"
          icon={AddAlert}
          open={alert.status}
          color={alert.color}
        />
      ) : null;
    if (!auth.uid) return <Redirect to="/login-admin" />;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"Red Tabby"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}

          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>
                {notif}
                {switchRoutes}
              </div>
            </div>
          ) : (
            <div className={classes.map}>
              {notif}
              {switchRoutes}
            </div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  const auth = state.firebase.auth;

  return {
    alert: state.shared.alert,

    auth: auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    LOGOUT_ADMIN: () => dispatch(LOGOUT_ADMIN())
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(dashboardStyle)
)(Dashboard);
