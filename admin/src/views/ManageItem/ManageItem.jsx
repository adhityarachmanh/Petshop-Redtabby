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
import TableItemShop from "./sections/TableItemShop";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import CustomInput from "components/CustomInput/CustomInput";
import Info from "components/Typography/Info";
import Button from "components/CustomButtons/Button";
import { handleNoSlug } from "store/Actions/formatShare";
import { ArrowBack } from "@material-ui/icons";

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

class ManageItem extends React.Component {
  state = {
    SEARCH: false,
    NEW_SHOP: null
  };

  handleSearch = e => {
    const kosong = e.target.value === "";
    const { shop } = this.props;
    const newShop =
      shop &&
      shop.filter(d => {
        return d.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
      });
    this.setState({
      [e.target.id]: kosong ? false : true,
      NEW_SHOP: newShop
    });
  };
  render() {
    const { classes, match, history, shop } = this.props;
    const { SEARCH, NEW_SHOP } = this.state;
    return (
      <>
        <GridContainer>
          <GridItem xs={12} md={12} sm={12}>
            <Button
              color="info"
              round
              justIcon
              onClick={() => history.push("/admin/manage-shop")}
            >
              <ArrowBack />
            </Button>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="rose">
                  <h4 className={classes.whiteColor}>
                    Table Item{" "}
                    <small>( {handleNoSlug(match.params.category)} )</small>
                  </h4>
                </CardIcon>
              </CardHeader>
              <CardBody>
                <GridItem md={4}>
                  <Button
                    onClick={() =>
                      history.push("/admin/add-item/" + match.params.category)
                    }
                    color="success"
                    size="sm"
                  >
                    Add New Item
                  </Button>
                  <CustomInput
                    labelText={
                      "Search Item Category " +
                      handleNoSlug(match.params.category)
                    }
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
                {shop ? (
                  <TableItemShop
                    tableHeaderColor="rose"
                    tableHead={[
                      "No.",
                      "Name",
                      "Image",
                      "Description",
                      "Price",
                      "Updated_At",
                      "Tools"
                    ]}
                    match={match}
                    history={history}
                    tableData={!SEARCH ? shop : NEW_SHOP}
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
ManageItem.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const shop = state.firestore.ordered.shop;
  const FILTER_SHOP_WITH_PROPS =
    shop &&
    shop.filter(d => {
      return d.category === ownProps.match.params.category;
    });

  return {
    shop: FILTER_SHOP_WITH_PROPS
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "shop", orderBy: ["name", "asc"] }]),
  withStyles(styles)
)(ManageItem);
