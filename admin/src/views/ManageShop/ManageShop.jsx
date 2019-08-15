import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import { Add, Remove, Menu } from "@material-ui/icons";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Button from "components/CustomButtons/Button";

import Success from "components/Typography/Success";
import Info from "components/Typography/Info";
import Swal from "sweetalert2";
import CardBody from "components/Card/CardBody";
import { Link } from "react-router-dom";
import { ADD_CATEGORY } from "store/Actions/categoryAction";
import { DELETE_CATEGORY } from "store/Actions/categoryAction";
import { LOGOUT_ADMIN } from "store/Actions/authAction";
import { PIN_CONFIRMATION } from "store/Actions/pinConfirmation";


class ManageShop extends React.Component {
  handleItem = CTGRY_NAME => {
    let FLTR_NAME = CTGRY_NAME.toLowerCase().replace(/ /g, "-");
    const shop = this.props.shop;
    const COUNT_ITEM =
      shop &&
      shop.filter(d => {
        return d.category === FLTR_NAME;
      });
    return COUNT_ITEM && COUNT_ITEM.length;
  };

  handleAddCategory = () => {
    PIN_CONFIRMATION(() =>
      Swal.fire({
        title: "Add New Category",
        html:
          '<label class="swal2-label">Category Name <strong>(1 space)</strong></label>' +
          '<input id="name" class="swal2-input">',
        showConfirmButton: true,
        confirmButtonText: "Add Category",
        showCancelButton: true,
        cancelButtonColor: "red"
      }).then(res => {
        if (res.value) {
          this.props.ADD_CATEGORY({
            name: document.getElementById("name").value
          });
        }
      })
    );
  };
  async handleDeleteCategory(DATA) {
    if (DATA.ITEM_QTY > 0) {
      Swal.fire({
        title: "Oops ..",
        type: "warning",
        text: "This Category Have " + DATA.ITEM_QTY + " Item"
      });
      return;
    }
    PIN_CONFIRMATION(() =>
      Swal.fire({
        title: "Are You Sure",
        text: "Delete " + DATA.CATEGORY.name + " Category",
        showCancelButton: true
      }).then(res => {
        if (res.value) {
          this.props.DELETE_CATEGORY({
            id: DATA.CATEGORY.id,
            name: DATA.CATEGORY.name
          });
        }
      })
    );
  }

  render() {
    const { classes, category, profile } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Button onClick={this.handleAddCategory} size="sm" color="success">
              <Add /> Add Category
            </Button>
          </GridItem>
        </GridContainer>

        <GridContainer>
          {category &&
            category.map((d, key) => {
              return (
                <GridItem key={key} xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="rose" stats icon>
                      <CardIcon color="rose">
                        <Icon>pets</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>{d.name}</p>
                      <h3 className={classes.cardTitle}>
                        {this.handleItem(d.name)} <small>Item</small>
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Info>
                          <Menu />
                        </Info>
                        <Link
                          to={`/admin/manage-item/${d.name
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                        >
                          Manage Item (Table)
                        </Link>
                      </div>

                      <div className={classes.stats}>
                        <Danger>
                          <Remove />
                        </Danger>
                        <Link
                          onClick={() =>
                            this.handleDeleteCategory({
                              ITEM_QTY: this.handleItem(d.name),
                              CATEGORY: d
                            })
                          }
                        >
                          Delete Category
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              );
            })}
        </GridContainer>
      </div>
    );
  }
}

ManageShop.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  const category = state.firestore.ordered.category;
  const shop = state.firestore.ordered.shop;
  return {
    category: category,
    shop: shop,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ADD_CATEGORY: NEW_CATEGORY => dispatch(ADD_CATEGORY(NEW_CATEGORY)),
    DELETE_CATEGORY: CATEGORY => dispatch(DELETE_CATEGORY(CATEGORY))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: "category", orderBy: ["name", "asc"] },
    { collection: "shop" }
  ]),
  withStyles(dashboardStyle)
)(ManageShop);
