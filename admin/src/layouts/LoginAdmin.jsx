import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//asli

//components buatan
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { Icon, InputAdornment } from "@material-ui/core";
import { People } from "@material-ui/icons";
import CardIcon from "components/Card/CardIcon";
import CardFooter from "components/Card/CardFooter";
import CustomInput from "components/CustomInput/CustomInput";
import CustomButtons from "components/CustomButtons/Button";

//tools
import { compose } from "redux";
import { connect } from "react-redux";
import { LOGIN_ADMIN } from "store/Actions/authAction";
import Danger from "components/Typography/Danger";
import Swal from "sweetalert2/dist/sweetalert2";
import { Redirect } from "react-router-dom";
import fb from "firebase";
import BG_COVER from "../assets/img/cover.jpeg";

const styles = {
  root: {
    background: "urL('" + BG_COVER + "')",
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  }
};
class LoginAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      pwdIcon: "visibility_off"
    };
  }
  componentDidMount() {
    fb.auth().onAuthStateChanged(admin => {
      if (admin) {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000
        }).fire({
          type: "success",
          title: "Login Success "
        });
      }
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    // console.log(this.state);
  };
  handleVisibility = () => {
    document.getElementById("password").type = "text";
    this.setState({
      pwdIcon: "visibility"
    });
  };
  handleVisibilityOff = () => {
    document.getElementById("password").type = "password";
    this.setState({
      pwdIcon: "visibility_off"
    });
  };
  handleSubmit = () => {
    this.props.LOGIN_ADMIN(this.state);
  };
  render() {
    const { classes, authError, loading, auth } = this.props;
    if (auth.uid) return <Redirect to="/admin/dashboard" />;
    return (
      <div style={styles.root}>
        <GridContainer
          container
          style={{ padding: "200px  20px 0 20px" }}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">Login Admin</CardIcon>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    id: "email",
                    onChange: this.handleChange,
                    type: "email"
                  }}
                />

                <CustomInput
                  labelText="Password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    type: "password",
                    id: "password",
                    endAdornment: (
                      <InputAdornment
                        style={{ cursor: "pointer" }}
                        position="end"
                        onTouchStart={this.handleVisibility}
                        onTouchEnd={this.handleVisibilityOff}
                        onMouseDown={this.handleVisibility}
                        onMouseUp={this.handleVisibilityOff}
                        onMouseLeave={this.handleVisibilityOff}
                      >
                        <Icon>{this.state.pwdIcon}</Icon>
                      </InputAdornment>
                    )
                  }}
                />
                <CustomButtons
                  disabled={loading}
                  color={loading ? "default" : "success"}
                  onClick={this.handleSubmit}
                >
                  {loading ? <Icon>autorenew</Icon> : "Login"}
                </CustomButtons>
              </CardBody>
              <CardFooter stats>
                {authError ? (
                  <Danger className={classes.textDanger}>{authError}</Danger>
                ) : null}
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginAdmin.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    loading: state.shared.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    LOGIN_ADMIN: data => dispatch(LOGIN_ADMIN(data))
  };
};

export default compose(
  withStyles(dashboardStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginAdmin);
