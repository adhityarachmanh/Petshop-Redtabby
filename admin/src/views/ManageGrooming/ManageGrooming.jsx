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
import { ArrowBack } from "@material-ui/icons";
import Warning from "components/Typography/Warning";
import TableManageGrooming from "./sections/TableManageGrooming";

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

class ManageGrooming extends React.Component {
  state = {
    SEARCH: false,
    NEW_GROOMING: null
  };

  handleSearch = e => {
    const kosong = e.target.value === "";
    const { grooming } = this.props;
    const newGrooming =
      grooming &&
      grooming.filter(d => {
        return d.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
      });
    this.setState({
      [e.target.id]: kosong ? false : true,
      NEW_GROOMING: newGrooming
    });
  };
  render() {
    const { classes, match, history, users, grooming } = this.props;
    const { SEARCH, NEW_GROOMING } = this.state;
    return (
      <>
        <GridContainer>
          <GridItem xs={12} md={12} sm={12}>
            <Card>
              <CardHeader color="rose" stats icon>
                <CardIcon color="rose">
                  <h4 className={classes.whiteColor}>
                    Manage Grooming 
                  </h4>
                </CardIcon>
              </CardHeader>
              <CardBody>
                {grooming ? (
                  grooming.length > 0 ? (
                    <>
                      {" "}
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
                      <TableManageGrooming
                        tableHeaderColor="rose"
                        users={users}
                        tableHead={["No.", "Name", "Phone", "Tanggal", "Tools"]}
                        tableData={!SEARCH ? grooming : NEW_GROOMING}
                      />
                    </>
                  ) : (
                    <GridContainer justify="center">
                      <Warning>Not Availables</Warning>
                    </GridContainer>
                  )
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
ManageGrooming.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const grooming = state.firestore.ordered.grooming;
  const users = state.firestore.data.users;

  return {
    grooming: grooming,
    users: users
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "grooming", orderBy: ["created_at", "desc"] },
    { collection: "users" }
  ]),
  withStyles(styles)
)(ManageGrooming);
