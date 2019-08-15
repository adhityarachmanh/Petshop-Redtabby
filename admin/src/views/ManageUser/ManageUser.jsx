import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CardHeader from "components/Card/CardHeader";
import Card from "components/Card/Card";
import CardIcon from "components/Card/CardIcon";

import CardBody from "components/Card/CardBody";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import CustomInput from "components/CustomInput/CustomInput";
import Info from "components/Typography/Info";
import Button from "components/CustomButtons/Button";
import { handleNoSlug } from "store/Actions/formatShare";
import { ArrowBack } from "@material-ui/icons";
import TableUsers from "./sections/TableUsers";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class ManageUser extends React.Component {
  state = {
    SEARCH: false,
    NEW_USERS: null
  };

  handleSearch = e => {
    const kosong = e.target.value === "";
    const { users } = this.props;
    const newUSers =
      users &&
      users.filter(d => {
        return d.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
      });
    this.setState({
      [e.target.id]: kosong ? false : true,
      NEW_USERS: newUSers
    });
  };
  render() {
    const { classes, match, history, users } = this.props;
    const { SEARCH, NEW_USERS } = this.state;
    return (
      <>
        <GridContainer>
          <GridItem xs={12} md={12} sm={12}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="rose">
                  <h4 className={classes.whiteColor}>Table Users</h4>
                </CardIcon>
              </CardHeader>
              <CardBody>
                <GridItem md={4}>
                  <CustomInput
                    labelText={"Search User With Name "}
                    inputProps={{
                      id: "SEARCH",
                      type: "text",
                      onChange: this.handleSearch
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                {users ? (
                  <TableUsers
                    tableHeaderColor="rose"
                    tableHead={[
                      "No.",
                      "Image",
                      "Name",
                      "Email",
                      "Address",
                      "Phone"
                    ]}
                    tableData={!SEARCH ? users : NEW_USERS}
                  />
                ) : (
                  <GridContainer justify="center">
                    <Info>Loading ...</Info>
                  </GridContainer>
                )}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}
ManageUser.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const users = state.firestore.ordered.users;

  return {
    users: users
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users", orderBy: ["name", "asc"] }]),
  withStyles(styles)
)(ManageUser);
