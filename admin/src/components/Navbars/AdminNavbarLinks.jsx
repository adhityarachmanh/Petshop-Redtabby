import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components

import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import { compose } from "redux";
import { connect } from "react-redux";
import { LOGOUT_ADMIN } from "store/Actions/authAction";

class AdminNavbarLinks extends React.Component {
  state = {
    openNotifcation: false,
    openProfile: false
  };
  handleToggleNotification = () => {
    this.setState(state => ({ openNotifcation: !state.openNotifcation }));
  };
  handleCloseNotification = event => {
    if (this.anchorNotification.contains(event.target)) {
      return;
    }
    this.setState({ openNotifcation: false });
  };
  handleToggleProfile = () => {
    this.setState(state => ({ openProfile: !state.openProfile }));
  };
  handleCloseProfile = event => {
    if (this.anchorProfile.contains(event.target)) {
      return;
    }
    this.setState({ openProfile: false });
  };
  handleLogout = e => {
    this.props.LOGOUT_ADMIN();
    this.handleCloseProfile(e);
  };
  render() {
    const { classes, profile, auth } = this.props;
    const { openNotifcation, openProfile } = this.state;
    return (
      <div>
        <div className={classes.manager}>
          <Button
            buttonRef={node => {
              this.anchorProfile = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            simple={!(window.innerWidth > 959)}
            aria-owns={openNotifcation ? "profile-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggleProfile}
            className={classes.buttonLink}
          >
            <Person className={classes.icons} />
            <Hidden mdDown implementation="css">
              <p className={classes.linkText}> {profile.name}</p>
            </Hidden>
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}> {profile.name}</p>
            </Hidden>
          </Button>
          <Poppers
            open={openProfile}
            anchorEl={this.anchorProfile}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !openProfile }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleCloseProfile}>
                    <MenuList role="menu">
                     
                      <MenuItem
                        onClick={this.handleLogout}
                        className={classes.dropdownItem}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    );
  }
}

AdminNavbarLinks.propTypes = {
  classes: PropTypes.object
};
const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const profile = state.firebase.profile;
  return {
    auth: auth,
    profile: profile
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
  withStyles(headerLinksStyle)
)(AdminNavbarLinks);
